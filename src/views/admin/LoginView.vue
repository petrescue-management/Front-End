<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form>
          <h3>Sign In</h3>

          <div class="form-group">
            <label>Username</label>
            <input type="email" class="form-control form-control-lg" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control form-control-lg" />
          </div>

          <button @click="login()" class="btn btn-dark btn-lg btn-block">
            Sign In
          </button>

          <!-- <p class="forgot-password text-right mt-2 mb-4">
            <router-link to="/forgot-password">Forgot password ?</router-link>
          </p> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import {getListRegisterCenterFormPagingAPI} from '@/api/admin/registerCenterFormApi'
export default {
  data() {
    return {
      fullscreenLoading: false,
    };
  },
  methods: {
    async login() {
      // this.$router.push({ name: "DashboardAdmin" });
      let data = {};
      await getListRegisterCenterFormPagingAPI(data);
    },
  },
};
</script>

<style scoped>
.vertical-center {
    background: #2554FF;
}
</style>

