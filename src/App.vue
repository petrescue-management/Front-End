<template>
  <div id="app">
    <div id="nav">
      <router-link to="/login-staff"></router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { getDetailUser } from "@/api/staff/loginApi";
import firebase from "firebase";
export default {
  name: "App",
  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },
  methods: {
    async checkExpire() {
      console.log(this.$router.history.current.name);
      if (
        this.$router.history.current.name != "LoginStaff" &&
        this.$router.history.current.name != "RegisterCenter"
      ) {
        await getDetailUser(this.getUser.token).then((response) => {
          if (response.status == 200) return true;
          else if (response.status == 401 || response.status == 403) {
            firebase
              .auth()
              .signOut()
              .then(() => {
                this.$store.dispatch("user/logout");
                this.$router.push({
                  name: "LoginStaff",
                });
              });
          }
        });
      }
    },
  },

  created() {
    this.checkExpire();
    if (localStorage.getItem("user") == null) {
      if (
        this.$router.history.current.fullPath == "/login-staff" ||
        this.$router.history.current.fullPath == "/"
      )
        this.$router.replace({ name: "LoginStaff" }).catch(() => {});
      else if (this.$router.history.current.fullPath == "/register-center")
        this.$router.replace({ name: "RegisterCenter" }).catch(() => {});
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

.el-input-group__append {
  color: #fff !important;
  background-color: #007bff !important;
  border-color: #007bff !important;
}
</style>
