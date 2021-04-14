<template>
  <div>
    <el-form label-position="top">
      <el-form-item  label="Nêu lý do : ">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button
        style="text-align: center"
        type="danger"
        @click="removeVolunteer()"
        >Xoá</el-button
      >
      <el-button style="text-align: center" @click="dialogDeny = false"
        >Huỷ</el-button
      >
    </div>
  </div>
</template>

<script>
import { removeVolunteerToCenterAPI } from "@/api/staff/volunteerApi";
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
        desc: "",
      },
    };
  },

  methods: {
    async removeVolunteer() {
      this.loading = true;
      let token = this.getUser.token;
      
      await removeVolunteerToCenterAPI(this.id, token).then(
        (response) => {
          if (response.status == 200) {
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
          }
          EventBus.$emit("CloseRemoveDialog", false);
        }
      );
      this.loading = false;
    },
  },
};
</script>

<style>
</style>