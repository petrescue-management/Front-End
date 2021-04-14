<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-staff"></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    if (localStorage.getItem("user") == null) {
      if (this.$router.history.current.fullPath == "/login-staff" || this.$router.history.current.fullPath == "/" )
        this.$router.replace({ name: "LoginStaff" }).catch(()=>{});
      else if (this.$router.history.current.fullPath == "/register-center")
        this.$router.replace({ name: "RegisterCenter" }).catch(()=>{});
    } else {
      if (this.$router.history.current.fullPath == "/")
        this.$router.replace({ name: "DashboardStaff" });
    }
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
  overflow-y: hidden;
}

.el-dialog {
  margin-top: 6vh !important;
  width: 52% !important;
}
</style>
