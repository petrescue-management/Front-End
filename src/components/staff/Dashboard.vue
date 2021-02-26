<template>
  <div>
    <el-main>
      <div>
        Dashboard
        <div v-if="user">You are logged in!</div>
        <h1>{{ this.getUserInfo.displayName }}</h1>
        <h1>{{ this.getUserInfo.email }}</h1>
      </div>
    </el-main>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["user"]),

    getUserInfo() {
      return this.user;
    },
  },
};
</script>