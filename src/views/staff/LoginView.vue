<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form @submit.prevent="submit">
          <h3>Sign In</h3>
          <button @click="login()" class="btn btn-dark btn-lg btn-block login">
            <img src="@/assets/img/icon-google.png" alt="GOOGLE" />
            Sign In With Google
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import { loginApi, getDetailUser } from "@/api/staff/loginApi";
export default {
  data() {
    return {
      fullscreenLoading: false,
    };
  },
  methods: {
    ...mapActions("user", ["loginUser"]),

    async submit() {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => this.login())
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = error.credential;
          console.log(errorCode, errorMessage, email, credential);
        });
    },

    async login() {
      let user = firebase.auth().currentUser;
      if (user) {
        let token = await user.getIdToken();
        let jwtToken;
        await loginApi(token)
          .then((response) => response.text())
          .then((data) => {
            jwtToken = data;
          });

        getDetailUser(jwtToken)
          .then((response) => response.json())
          .then((data) => {
            data.token = jwtToken;
            this.loginUser(data);
            this.$message({
              message: "Login thành công",
              type: "success",
            });
          });
        this.$router.push({ name: "DashboardStaff" });
      }
    },
  },
};
</script>

<style scoped>
.vertical-center {
  background: #ebd4ce;
}

.login {
  background-color: #7c7b7b;
  border: 1px solid #7c7b7b;
}
</style>
