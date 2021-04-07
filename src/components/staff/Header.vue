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
          <template #button-content>
            <b-icon
              style="font-size: 20px"
              icon="bell-fill"
              variant="light"
            ></b-icon>
            <span class="badge badge-danger">{{ count }}</span>
          </template>
          <b-dropdown-text style="width: 340px; text-align: center">
            Notification <span class="badge2 badge-danger">{{ count }}</span>
          </b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item class="noti" v-for="noti in listNoti" :key="noti.id">
            <b-row @click="goToDetail(noti.id)">
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
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>{{ getUser.lastName + " " + getUser.firstName }}</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="signout">Sign Out</b-dropdown-item>
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
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),

    goToDetail(id) {
      let value = {
        isCheck: true,
      };
      CenterService.updateNoti(this.getUser.centerId, id, value);
      this.$router.push({ name: "ReportRescue" });
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

      _noti.sort((a, b) => (a.date > b.date ? 1 : -1));
      this.listNoti = _noti;
    },

    getDatetime(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      let ss = date.getSeconds();
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
        min +
        ":" +
        (ss > 9 ? "" : "0") +
        ss
      );
    },
  },

  mounted() {
    CenterService.getListNoti(this.getUser.centerId).on(
      "value",
      this.onDataChange
    );
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
