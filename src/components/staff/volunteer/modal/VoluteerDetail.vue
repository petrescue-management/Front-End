<template>
  <div>
    <el-main v-loading="loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="17">
            <el-form-item label="Họ và tên">
              <el-input v-model="form.fullname" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Giới Tính">
              <el-radio-group v-model="form.gender" onclick="return false">
                <el-radio :label="2">Nam</el-radio>
                <el-radio :label="1">Nữ</el-radio>
                <el-radio :label="3">Khác</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="Email">
              <el-input v-model="form.email" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
        <el-col :span="14">
            <el-form-item label="SĐT">
              <el-input v-model="form.phone" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Địa chỉ">
          <el-input v-model="form.address" readonly></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="danger" @click="removeVolunteer()">Remove</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { removeVolunteerToCenterAPI } from "@/api/staff/volunteerApi";
import EventBus from "@/EventBus";
export default {
  props: ["id"],
  name: "VolunteerDetail",
  data() {
    return {
      form: {
        email: null,
        fullname: null,
        doB: null,
        address: null,
        gender: null,
        phone: null,
        imgUrl: null,
      },
      loading: false,
    };
  },

  computed: {
    ...mapGetters("volunteer", ["getVolunteer"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("volunteer", ["getVolunteerOfCenter"]),
    getFormInfo(formInfo) {
      this.form = {
        email: formInfo.email,
        fullname: formInfo.lastName + " " + formInfo.firstName,
        doB: formInfo.doB,
        address: formInfo.address,
        gender: formInfo.gender,
        phone: formInfo.phone,
        imgUrl: formInfo.imgUrl,
      };
    },

    async removeVolunteer() {
      this.loading = true;
      let token = this.getUser.token;
      await removeVolunteerToCenterAPI(this.id, token).then((response) => {
        if (response.status == 200) {
          this.loading = false
          this.$message({
            message: "Remove thành công",
            type: "success",
          });
          EventBus.$emit("CloseVolunteerDialog", false);
        }else{
          this.$message({
            message: "Remove không thàng công",
            type: "danger",
          });
        }
      });
    },
  },

  async created() {
    this.loading = true;
    await this.getVolunteerOfCenter(this.id);
    this.getFormInfo(JSON.parse(JSON.stringify(this.getVolunteer)));
    this.loading = false;
  },
};
</script>

<style scoped>
.el-main {
  height: auto;
  width: 100%;
}

.long-label >>> label {
  line-height: normal;
}

.label-inline >>> .el-form-item__label {
  float: none;
  text-align: left;
  width: 100% !important;
}

.button {
  text-align: center;
}
</style>