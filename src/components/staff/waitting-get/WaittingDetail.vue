<template>
  <div v-loading="loading">
    <el-main>
      <div class="row bg-title pet-detail">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Thú cưng đang chờ đến lấy</h1>
        </div>
      </div>
      <div style="padding: 20px 0 0 20px">
        <el-button type="info" icon="el-icon-back" @click="back()" plain
          >Trở về</el-button
        >
      </div>
      <div class="pet-info">
        <b-row class="info">
          <b-col sm="4" style="display: block">
            <el-carousel height="300px">
              <el-carousel-item v-for="item in pet.petImgUrl" :key="item">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="item"
                  fit="fit"
                  :preview-src-list="pet.petImgUrl"
                >
                </el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="text-align: center; margin-top: 10px">
              <span>Tình trạng : </span>
              <span
                ><el-tag class="status" :type="pet.color">
                  {{ pet.status }}
                </el-tag></span
              >
              <br />
              <el-button
                type="success"
                icon="el-icon-check"
                style="width: 200px; margin-top: 5px"
                v-show="pet.petStatus === 3"
                @click="changeStatus()"
                >Đã đến lấy</el-button
              >
              <br /><br />
              <el-button
                type="danger"
                icon="el-icon-refresh-left"
                style="width: 200px"
                v-show="pet.petStatus === 3"
                @click="noComeGet()"
                >Không đến lấy</el-button
              >
            </div>
          </b-col>
          <b-col sm="8">
            <el-tabs type="border-card">
              <el-tab-pane label="Thông tin người nhận nuôi">
                <div v-if="pet.user">
                  <Adopter :adopter="pet.user" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </b-col>
        </b-row>
      </div>
    </el-main>
  </div>
</template>

<script>
import { petStatus } from "@/enum/consts";
import { mapGetters, mapActions } from "vuex";
import {
  createAdoptionAPI,
  rejectAdoptionFormAPI,
} from "@/api/staff/adoptedApi";
import Adopter from "../adopted/modal/Adopter.vue";
import UserAuthService from "@/services/UserAuthService";
export default {
  components: { Adopter },
  data() {
    return {
      pet: {},
      dialogVisible: false,
      id: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters("adoptionForm", ["getListAdoptionForm", "getPet"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("adoptionForm", ["getListAdoptionFormByPetId"]),

    back() {
      this.$router.push({ name: "AdoptionManage" });
    },

    getDate() {
      let date = new Date();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      return (
        date.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd +
        " " +
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (min > 9 ? "" : "0") +
        min
      );
    },

    noComeGet() {
      this.$prompt("Lý do không đến lấy", "", {
        confirmButtonText: "Từ chối",
        cancelButtonText: "Cancel",
      }).then(async ({ value }) => {
        this.loading = true;
        let token = this.getUser.token;
        let data = {
          id: this.pet.adoptionRegistrationFormId,
          status: 3,
          reason: value,
        };
        await rejectAdoptionFormAPI(data, token).then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              let denyMessage = {
                titlte: "Bạn có thông báo tình trạng đăng ký nhận nuôi",
                body: "Bạn đã quá hạn đến lấy thú cưng",
                date: this.getDate(),
                type: 1,
                description: data.reason,
              };

              UserAuthService.createNoti(
                data.reject.userId,
                data.reject.adoptionFormId,
                denyMessage
              )
                .then(() => {
                  console.log("Created new item successfully!");
                })
                .catch((e) => {
                  console.log(e);
                });
            });
            this.loading = false;
            this.$router.push({ name: "AdoptionManage" });
          }
        });
      });
    },

    changeStatus() {
      this.$confirm("Hãy chắc chắn rằng chủ nhân của bé đã đến lấy ?", {
        confirmButtonText: "Chắc chắn",
        cancelButtonText: "Đóng",
      }).then(async () => {
        this.loading = true;
        let token = this.getUser.token;
        let data = {
          adoptionRegistrationFormId: this.pet.adoptionRegistrationFormId,
        };
        await createAdoptionAPI(data, token).then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              let approve = data.approve;
              let reject = data.rejects;

              let approveMessage = {
                titlte: "Bạn có thông báo tình trạng đăng ký nhận nuôi",
                body: "Bạn đã được chấp thuận nhận nuôi một con thú cưng",
                date: this.getDate(),
                type: 1,
                description: null,
              };

              UserAuthService.createNoti(
                approve.userId,
                approve.adoptionFormId,
                approveMessage
              )
                .then(() => {
                  console.log("Created new item successfully!");
                })
                .catch((e) => {
                  console.log(e);
                });

              let denyMessage = {
                titlte: "Bạn có thông báo tình trạng đăng ký nhận nuôi",
                body:
                  "Xin lỗi, chúng tôi đã tìm ra người phù hợp cho thú cưng bạn đã đăng ký",
                date: this.getDate(),
                type: 1,
                description: null,
              };
              reject.forEach((element) => {
                UserAuthService.createNoti(
                  element.userId,
                  element.adoptionFormId,
                  denyMessage
                )
                  .then(() => {
                    console.log("Created new item successfully!");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              });
            });
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
            this.loading = false;
            let id = this.pet.petId;
            this.$router.push({ name: "PetDetail", params: { id } });
          }
        });
      });
    },

    async getPetInfo(info, pet) {
      this.pet = {
        user: {
          adoptedAt: info[0].updatedAt,
          username: info[0].userName,
          address: info[0].address,
          email: info[0].email,
          phone: info[0].phone,
          job: info[0].job,
        },
        adoptionRegistrationFormId: info[0].adoptionRegistrationId,
        petImgUrl: this.getListImg(pet.imgUrl),
        petStatus: pet.petStatus,
        status: petStatus.get(pet.petStatus).name,
        color: petStatus.get(pet.petStatus).color,
        petId: pet.petId,
      };
      console.log(this.pet);
    },

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
    },

    async getData() {
      this.loading = true;
      let data = {
        token: this.getUser.token,
        petId: this.$router.history.current.params.id,
      };
      await this.getListAdoptionFormByPetId(data);
      this.getPetInfo(this.getListAdoptionForm, this.getPet);

      this.loading = false;
    },
  },

  created() {
    this.getData();
  },
};
</script>

<style scoped>
.el-main {
  padding: 0;
}
.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
.pet-info {
  padding: 10px 50px 50px 50px;
}
.tag {
  border-top: 1px dashed #8c8b8b;
  margin: 5px;
}

.info {
  font-size: 18px;
}

.value {
  font-weight: 300;
}

.button {
  text-align: center;
  padding-top: 20px;
}

.el-image >>> img {
  max-height: 300px;
}
</style>