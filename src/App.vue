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
    // this.$router.replace({ name: "LoginStaff" });
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
