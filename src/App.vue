<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-staff"></router-link>
    </div>
    <router-view/>
    <notification-box/>
  </div>
</template>

<script>
import NotificationBox from './components/notification/NotificationBox'
export default {
  components: { NotificationBox },
  name: 'App',
  component :{
    NotificationBox
  },
  created() {
    if (localStorage.getItem("user") == null) {
      this.$router.replace({ name: "LoginStaff" });
    } else {
      if (this.$router.history.current.fullPath == "/")
        this.$router.replace({ name: "DashboardStaff" });
    }
  },
}
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100%;
}

.el-dialog{
  margin-top: 5vh !important;
}
</style>
