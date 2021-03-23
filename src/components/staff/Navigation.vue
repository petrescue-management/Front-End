<template>
  <el-aside width="100%">
    <el-menu
      text-color="#545454"
      background-color="#F8F9FA"
      active-text-color="#55A6FD"
      :default-active="activeIndex"
      :route="true"
    >
      <el-menu-item
        index="/main-staff/dashboard-staff"
        :route="{ name: 'DashboardStaff' }"
        @click="goTo('DashboardStaff')"
      >
        <template slot="title">
          <i class="fas fa-home"></i>
          <span class="title">Dashboard</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="/main-staff/pet-list"
        :route="{ name: 'PetList' }"
        @click="goTo('PetList')"
      >
        <template slot="title">
          <i class="fas fa-paw"></i>
          <span class="title">Boss</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="/main-staff/form-adopt"
        :route="{ name: 'PetAdopt' }"
        @click="goTo('PetAdopt')"
      >
        <template slot="title">
          <i class="fas fa-file-alt"></i>
          <span class="title">Đơn nhận nuôi</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="/main-staff/pet-adopt" 
        :route="{ name: 'PetAdopt' }"
        @click="goTo('PetAdopt')"
      >
        <template slot="title">
          <i class="fas fa-house-user"></i>
          <span class="title">Pet nhận nuôi</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="/main-staff/volunteer" 
        :route="{ name: 'Volunteer' }"
        @click="goTo('Volunteer')"
      >
        <template slot="title">
          <i class="fas fa-hands-helping"></i>
          <span class="title">Tình nguyện viên</span>
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
      activeIndex: "/main/dashboard"
    };
  },
  methods: {
    goTo(link) {
      this.$router.push({ name: link });
    }
  }
};
</script>
<style scoped>
.el-aside {
  background-color: #F8F9FA;
  height: 89vh;
  text-align: left;
  font-size: 20px;
}
.el-menu-item{
  font-size: 17px;
}
.title{
  margin-left: 10px;
}
</style>
