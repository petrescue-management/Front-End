<template>
  <div>
    <el-main>
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách tình nguyện viên</h1>
        </div>
      </div>
      <br />
      <div style="padding: 0px 10px 20px">
        <el-badge :value="getCountForm" class="item">
          <el-button
            type="primary"
            icon="el-icon-document-checked"
            @click="goToListForm()"
            >Duyệt đơn</el-button
          >
        </el-badge>
        <el-button
          type="primary"
          style="margin-left: 30px"
          icon="el-icon-plus"
          @click="addVolunteer()"
          >Thêm tình nguyện viên</el-button
        >
      </div>

      <div style="padding: 0 10px">
        <b-card header="Danh sách tình nguyện viên" header-tag="header">
          <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="Tình nguyện viên đang làm việc" name="1">
              <ActiveVolunteer  v-if="activeName == '1'"/>
            </el-tab-pane>
            <el-tab-pane label="Tình nguyện viên đã nghỉ" name="2">
              <InactiveVolunteer v-if="activeName == '2'"/>
            </el-tab-pane>
          </el-tabs>
        </b-card>
      </div>
    </el-main>
    <el-dialog title="Thêm tình nguyện viên" :visible.sync="dialogVisible">
      <AddVolunteer v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/EventBus";
import AddVolunteer from "./modal/AddVolunteer.vue";
import ActiveVolunteer from './modal/ActiveVolunteer.vue';
import InactiveVolunteer from './modal/InactiveVolunteer.vue';
export default {
  components: { AddVolunteer, ActiveVolunteer, InactiveVolunteer },
  computed: {
    ...mapGetters("volunteer", ["getCountForm"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      dialogVisible: false,
      dialogAddVisible: false,
      img: require("@/assets/img/avatar.jpg"),
      activeName: '1',
    };
  },

  methods: {
    ...mapActions("volunteer", [
      "getListVolunteerOfCenter",
      "getListVolunteerRegistrationForm",
    ]),

    goToListForm() {
      this.$router.push({ name: "VolunteerRegistration" });
    },

    addVolunteer() {
      this.dialogVisible = true;
    },


    async getCount() {
      let token = this.getUser.token;
      await this.getListVolunteerRegistrationForm(token);
    },
  },

  mounted() {
    EventBus.$on("CloseAddVolunteerDialog", (visible) => {
      this.dialogVisible = visible;
    });
  },

  created() {
    this.getCount();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}
.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
.small {
  max-width: 500px;
}
</style>