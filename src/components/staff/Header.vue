<template>
  <b-navbar toggleable="lg">
    <b-navbar-brand href="#">
      <img
        src="@/assets/img/Logo_notitle_circle.png"
        width="45px"
        height="45px"
      />
      PET RESCUE
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ centerName }}</em>
          </template>
          <b-dropdown-item @click="show">Hồ sơ</b-dropdown-item>
          <b-dropdown-item @click="signout">Đăng xuất</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <template #button-content>
            <b-icon
              style="font-size: 20px"
              icon="bell-fill"
              variant="light"
            ></b-icon>
            <span class="badge badge-danger">{{ count }}</span>
          </template>
          <b-dropdown-text
            style="width: 340px; text-align: center; margin-top: 10px"
          >
            Thông báo <span class="badge2 badge-danger">{{ count }}</span>
          </b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <div class="list">
            <b-dropdown-item
              class="noti"
              v-for="noti in listNoti"
              :key="noti.id"
            >
              <b-row @click="goToDetail(noti.id, noti.type)">
                <b-col sm="2" style="margin: auto auto auto 0; padding: 0">
                  <img :src="noti.logo" width="65px" height="65px" />
                </b-col>
                <b-col sm="9">
                  <div style="white-space: pre-wrap; padding: 1px">
                    {{ noti.message }}
                    <br />
                    <span class="date">{{ noti.date }}</span>
                  </div>
                </b-col>
                <span :class="!noti.isCheck ? 'unread' : 'read'"></span>
                <b-col> </b-col>
              </b-row>
            </b-dropdown-item>
          </div>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
import { mapActions } from "vuex";
import CenterService from "../../services/CenterService";
import firebase from "firebase";
import { Notification } from "@/enum/consts";
import {
  getCenterInfoAPI
} from "@/api/staff/centerApi";
import EventBus from "@/EventBus";
export default {
  name: "Navbar",
  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },
  data() {
    return {
      listNoti: [],
      count: 0,
      centerName: ""
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),

    show() {
      // this.$notify({
      //       title: "Thông báo mới",
      //       message: "Tình nguyện viên đã hoàn thành đơn cứu hộ",
      //       position: "bottom-right",
      //       iconClass: 'el-icon-bell',
      //       type: 'success',
      //       duration: 0
      //     });
      this.$router.push({
        name: "Profile",
      });
    },

    async getCenterProfile() {
      this.loading = true;
      let data = {
        token: this.getUser.token,
        id: this.getUser.centerId,
      };
      await getCenterInfoAPI(data).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            this.centerName = data.centerName;
          });
        }
      });
      this.loading = false;
    },

    goToDetail(id, type) {
      let value = {
        isCheck: true,
      };
      CenterService.updateNoti(this.getUser.centerId, id, value);
      switch (type) {
        case 1:
          this.$router.push({ name: "AdoptionManage" }).catch(() => { window.location.reload();})
          break;
        case 2:
          this.$router.push({ name: "ListRescueReport" }).catch(() => { window.location.reload();})
          break;
        case 3:
          this.$router.push({ name: "VolunteerRegistration" }).catch(() => { window.location.reload();})
          break;
        default:
          break;
      }
    },

    signout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.logout();
          this.$router.push({
            name: "LoginStaff",
          });
        });
    },

    onDataChange(items) {
      let _noti = [];
      this.count = 0;
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _noti.push({
          id: key,
          message: Notification.get(data.type).message,
          logo: Notification.get(data.type).logo,
          type: data.type,
          date: this.getDatetime(data.date),
          isCheck: data.isCheck,
        });

        if (data.isCheck == false) {
          this.count++;
        }
      });

      _noti.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
      this.listNoti = _noti;
    },

    getDatetime(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      return (
        (dd > 9 ? "" : "0") +
        dd +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        date.getFullYear() +
        " " +
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (min > 9 ? "" : "0") +
        min
      );
    },
  },

  mounted() {
    this.getCenterProfile();
    CenterService.getListNoti(this.getUser.centerId).on(
      "value",
      this.onDataChange
    );
    EventBus.$on("changeProfile",() => {
      this.getCenterProfile();
    });
  },
};
</script>
<style scoped>
.badge {
  padding: 3px 5px 2px;
  position: absolute;
  top: 8px;
  right: 5px;
  display: inline-block;
  min-width: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  vertical-align: baseline;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
}

.badge2 {
  padding: 3px 5px 2px;
  top: 8px;
  right: 5px;
  display: inline-block;
  min-width: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  vertical-align: baseline;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
}
.badge-danger {
  background-color: #9b3d3d;
}

.list {
  max-height: 500px;
  height: auto;
  overflow: hidden;
  overflow-y: auto;
}

.noti {
  padding: 5px;
}
.unread {
  width: 12px;
  background-color: hsl(214deg 100% 59%);
  border-radius: 100%;
  height: 12px;
  margin: auto;
}

.read {
  width: 12px;
  background-color: #ffffff;
  border-radius: 100%;
  height: 12px;
  margin: auto;
}
.date {
  font-size: 13px;
  color: hsl(214deg 100% 59%);
}

.navbar {
  background-color: #f9afaf;
}
</style>
