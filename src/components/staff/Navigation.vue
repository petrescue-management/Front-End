<template>
  <el-aside width="100%">
    <el-menu
      text-color="#545454"
      background-color="#F8F9FA"
      active-text-color="rgb(155, 61, 61)"
      :default-active="activeIndex"
      :route="true"
    >
      <el-menu-item
        index="1"
        :route="{ name: 'DashboardStaff' }"
        @click="goTo('DashboardStaff')"
      >
        <template slot="title">
          <i class="fas fa-home"></i>
          <span class="title">Trang chủ</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="2"
        :route="{ name: 'PetList' }"
        @click="goTo('PetList')"
      >
        <template slot="title">
          <i class="fas fa-paw"></i>
          <span class="title">Thú cưng</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="3"
        :route="{ name: 'AdoptionManage' }"
        @click="goTo('AdoptionManage')"
      >
        <template slot="title">
          <i class="fas fa-heart"></i>
          <span class="title">Thú cưng nhận nuôi</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="4"
        :route="{ name: 'ListRescueReport' }"
        @click="goTo('ListRescueReport')"
      >
        <template slot="title">
          <i class="fas fa-hands-helping"></i>
          <span class="title">Danh sách cứu hộ</span>
        </template>
      </el-menu-item>
      <el-menu-item
        index="5"
        :route="{ name: 'Volunteer' }"
        @click="goTo('Volunteer')"
      >
        <template slot="title">
          <i class="fas fa-user"></i>
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
      activeIndex: "1",
    };
  },

  mounted() {
    console.log(this.$router.history.current.name);
    switch (this.$router.history.current.name) {
      case "DashboardStaff":
        this.activeIndex = '1';
        break;
      case "PetList":
      case "PetDetail":
        this.activeIndex = '2';
        break;
      case "PetAdopt":
      case "ListFormAdopt":
      case "Adoption":
      case "ListAdoption":
      case "AdoptionManage":
      case "WaittingDetail":
        this.activeIndex = '3';
        break;
      case "ReportRescue":
      case "ListRescueReport":
        this.activeIndex = '4';
        break;
      case "Volunteer":
      case "VolunteerRegistration":
        this.activeIndex = '5';
        break;
      default:
        break;
    }
    // this.activeIndex = this.$router.history.current.fullPath;
  },

  methods: {
    goTo(link) {
      this.$router.push({ name: link });
    },
  },
};
</script>
<style scoped>
.el-aside {
  background-color: #f8f9fa;
  height: 91vh;
  text-align: left;
  font-size: 20px;
}
.el-menu-item {
  font-size: 16px;
}
.title {
  margin-left: 10px;
}
</style>
