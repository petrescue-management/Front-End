<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form @submit.prevent="submit" style="text-align: center">
          <img
            src="@/assets/img/Logo_withtitle_circle.png"
            width="120px"
            height="120px"
            style="margin-bottom: 20px"
          />
          <button
            @click="login()"
            class="btn btn-dark btn-lg btn-block login"
            v-loading.fullscreen.lock="fullscreenLoading"
          >
            <img src="@/assets/img/icon-google.png" alt="GOOGLE" />
            Đăng nhập với Google
          </button>
          <p class="sign-up">
            Chưa có tài khoản cho trung tâm ?
            <span class="register" @click="registerPage(1)">Đăng ký ngay</span>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapActions } from "vuex";
import { loginAPI, getDetailUser } from "@/api/staff/loginApi";
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
          this.fullscreenLoading = false;
        });
    },

    async login() {
      let user = firebase.auth().currentUser;
      let deviceToken = await firebase.messaging().getToken();
      if (user) {
        let token = await user.getIdToken();
        let jwtToken;
        this.fullscreenLoading = true;
        let params = {
          token,
          deviceToken,
        };
        await loginAPI(params)
          .then((response) => response.text())
          .then((data) => {
            jwtToken = data;
          });

        await getDetailUser(jwtToken)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.roles);
            if (data.roles.includes("manager")) {
              data.token = jwtToken;
              this.loginUser(data);
              this.$message({
                message: "Login thành công",
                type: "success",
              });
              this.$router.push({ name: "DashboardStaff" });
            } else {
              this.$message({
                message: "Tài khoản này không tồn tại",
                type: "error",
              });
            }
          });
      }
      this.fullscreenLoading = false;
    },

    registerPage(page) {
      if(page === 1)
      this.$router.push({ name: "RegisterCenter" });
      else if (page === 2)
      this.$router.push({ name: "RegisterVolunteer" });
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
  margin-bottom: 10px;
}

.sign-up {
  font-size: 15px;
}

.register:hover {
  color: #0056b3;
  text-decoration: underline;
  cursor: pointer;
}
.register {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}
</style>
