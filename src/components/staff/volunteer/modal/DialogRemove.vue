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
   
  },
};
</script>

<style>
</style>