<template>
  <div>
    <el-main>
      <div>
        Dashboard
        <div v-if="user">You are logged in!</div>
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