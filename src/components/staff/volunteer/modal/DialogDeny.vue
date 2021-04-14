<template>
  <div>
    <el-form label-position="top">
      <el-checkbox v-model="form.isNameWro" name="type"
        >Tên không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isPhoneWro" name="type"
        >SĐT không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isEmailWro" name="type"
        >Email không hợp lệ</el-checkbox
      ><br />
      <el-checkbox v-model="form.isOtherReason" name="type"
        >Lý do khác</el-checkbox
      >
      <el-form-item v-show="form.isOtherReason" label="Nêu lý do khác: ">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button
        style="text-align: center"
        type="danger"
        @click="denyVolunteerForm()"
        >Từ chối</el-button
      >
      <el-button style="text-align: center" @click="dialogDeny = false"
        >Huỷ</el-button
      >
    </div>
  </div>
</template>

<script>
import { changeStatusVolunteerRegistrationFormAPI } from "@/api/staff/volunteerApi";
import EventBus from "@/EventBus";
export default {
  props: ["id"],
  name: "DenyDialog",
  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      loading: false,
      form: {
        isNameWro: false,
        isPhoneWro: false,
        isEmailWro: false,
        isOtherReason: false,
        desc: "",
      },
    };
  },

  methods: {
    async denyVolunteerForm() {
      this.loading = true;
      let data = {
        volunteerRegistrationFormId: this.id,
        status: 3,
        isEmail: this.form.isEmailWro,
        isPhone: this.form.isPhoneWro,
        isName: this.form.isNameWro,
        anotherReason: this.form.desc,
      };
      let token = this.getUser.token;
      await changeStatusVolunteerRegistrationFormAPI(data, token).then(
        (response) => {
          if (response.status == 200) {
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
          }
          EventBus.$emit("CloseVolunteerDialog", false);
        }
      );
      this.loading = false;
    },
  },
};
</script>

<style>
</style>