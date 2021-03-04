<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-staff"></router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted() {
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
</style>
