<template>
  <div>
    <el-main>
      <b-card header="Thú cưng nhận nuôi">
        <el-tabs v-model="activeName" type="border-card">
          <el-tab-pane label="Đơn nhận nuôi" name="1">
            <ListPetAdopt v-if="activeName == '1'"/>
          </el-tab-pane>
          <el-tab-pane label="Chờ đến lấy" name="2">
            <WaitingGet v-if="activeName == '2'"/>
          </el-tab-pane>
          <el-tab-pane label="Đang nhận nuôi" name="3">
            <ListAdoption v-if="activeName == '3'"/>
          </el-tab-pane>
        </el-tabs>
      </b-card>
    </el-main>
  </div>
</template>
<script>
import ListPetAdopt from "../form-adopt/ListPetAdopt.vue";
import WaitingGet from '../waitting-get/WaitingGet.vue';
import ListAdoption from "./ListAdoption.vue";
export default {
  components: { ListAdoption, ListPetAdopt, WaitingGet },
  data() {
    return {
      activeName: '1',
    };
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {},

  async created() {},
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}
.contain {
  width: 25%;
  float: left;
  position: relative;
  margin-top: -5px;
  padding: 20px 20px;
}

.overlay {
  background-color: white;
  text-align: left;
  width: 100%;
  padding: 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
</style>