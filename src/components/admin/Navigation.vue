<template>
  <el-aside width="100%" style="background-color: #F8F9FA">
    <el-menu
      text-color="#545454"
      background-color="#F8F9FA"
      active-text-color="#55A6FD"
      :default-active="activeIndex"
      :route="true"
    >
      <el-menu-item
      index="/main-admin/center-list"
        :route="{ name: 'CenterList' }"
        @click="goTo('CenterList')"
      >
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>Center</span>
        </template>
      </el-menu-item>
      <el-menu-item
      index="/main-admin/register-form-list-admin"
        :route="{ name: 'RegisterCenterFormList' }"
        @click="goTo('RegisterCenterFormList')"
      >
        <template slot="title">
          <i class="el-icon-s-custom"></i>
          <span>Center register form</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      activeIndex: "/main-admin/CenterListAdmin"
    };
  },
  methods: {
    goTo(link) {
      this.$router.replace({ name: link });
    }
  }
};
</script>
<style scoped>
.el-aside {
  background-color: aqua;
  height: 89vh;
  text-align: left;
}
</style>
