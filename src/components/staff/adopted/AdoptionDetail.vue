<template>
  <div v-loading="loading">
    <el-main>
      <div class="row bg-title pet-detail">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Thông Tin Nhận Nuôi</h1>
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
            </div>
          </b-col>
          <b-col sm="8">
            <el-tabs type="border-card">
              <el-tab-pane label="Thông tin người nhận nuôi">
                <div v-if="pet.user">
                  <Adopter :adopter="pet.user" />
                </div>
              </el-tab-pane>
              <el-tab-pane label="Tình trạng thú cưng từ người nhận nuôi">
                <div v-if="pet.petTracking">
                  <AdopterTracking :petTracking="pet.adoptionTracking" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </b-col>
        </b-row>
      </div>
    </el-main>
    <el-dialog
      title="Chi tiết đơn đăng kí nhận nuôi"
      :visible.sync="dialogVisible"
      center
    >
      <FormAdoptDetail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { adoptionStatus } from "@/enum/consts";
import { mapGetters, mapActions } from "vuex";
import FormAdoptDetail from "../form-adopt/modal/FormAdoptDetail.vue";
import Adopter from "./modal/Adopter.vue";
import { changeStatusAdoptionAPI } from "@/api/staff/adoptedApi";
import AdopterTracking from './modal/AdopterTracking.vue';
export default {
  components: { AdopterTracking, Adopter, FormAdoptDetail },
  data() {
    return {
      pet: {},
      dialogVisible: false,
      id: "",
      loading: false,
    };
  },

  computed: {
    ...mapGetters("adoptedPet", ["getAdopted"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("adoptedPet", ["getAdoptedPetById"]),

    goToDetail() {
      this.dialogVisible = true;
    },

    async changeStatus() {
      this.loading = true;
      let token = this.getUser.token;
      let data = {
        id: this.id,
        status: 2,
      };
      await changeStatusAdoptionAPI(data, token).then((response) => {
        if (response.status == 200) {
          this.$message({
            message: "Thao tác thành công",
            type: "success",
          });
          this.loading = false;
          this.getData();
        }
      });
    },

    async getPetInfo(info) {
      this.pet = {
        user: {
          adoptedAt: info.adoptedAt,
          username: info.username,
          address: info.address,
          email: info.email,
          phone: info.phone,
          job: info.job,
          userId: info.owner.userId,
        },
        petImgUrl: this.getListImg(info.petImgUrl),
        petTracking: info.petTrackings,
        adoptionTracking: info.adoptionReports,
        adoptionStatus: info.adoptionStatus,
        status: adoptionStatus.get(info.adoptionStatus).name,
        color: adoptionStatus.get(info.adoptionStatus).color,
      };
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
      this.id = this.$router.history.current.params.id;
      await this.getAdoptedPetById(this.id);
      this.getPetInfo(this.getAdopted);

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