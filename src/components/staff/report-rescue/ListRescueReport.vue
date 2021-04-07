<template>
  <div>
    <el-main>
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách hồ sơ cứu hộ</h1>
        </div>
      </div>
      <br />

      <div style="padding: 0 10px">
        <b-card header="Danh sách tình nguyện viên" header-tag="header">
          <el-table :data="listForm" v-loading="loading">
            <el-table-column label="Ảnh cá nhân" width="130" height="180">
              <template slot-scope="scope">
                <img :src="scope.row.img" width="70px" />
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="Name"
            ></el-table-column>
            <el-table-column
              prop="dob"
              label="Ngày sinh"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="phone"
              label="Phone"
              width="200"
            ></el-table-column>
            <el-table-column fixed="right" label="Operations">
              <template slot-scope="scope">
                <!-- <el-button
                  size="mini"
                  icon="el-icon-edit"
                  @click="handleEdit(scope.$index, scope.row)"
                  ></el-button
                > -->
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.$index, scope.row)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </b-card>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
      <Footer />
    </el-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/EventBus";
import Footer from "../Footer.vue";
export default {
  components: {
    Footer,
  },
  computed: {
    ...mapGetters("volunteer", ["getListVolunteer", "getCountForm"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      listForm: [],
      dialogVisible: false,
      dialogAddVisible: false,
      loading: false,
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

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let form = {
          id: data.userId,
          img: data.imgUrl,
          email: data.email,
          name: data.lastName + " " + data.firstName,
          phone: data.phone,
          dob: this.getDate(data.doB),
          address: data.address,
        };
        this.listForm.push(form);
      });
    },

    getDate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return (
        date.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd
      );
    },

    async getList() {
      let token = this.getUser.token;
      await this.getListVolunteerOfCenter(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListVolunteer)));
      this.loading = false;
    },

    async getCount() {
      let token = this.getUser.token;
      await this.getListVolunteerRegistrationForm(token);
    },
  },

  mounted() {
    EventBus.$on("CloseVolunteerDialog", (visible) => {
      this.dialogVisible = visible;
      this.getList();
    });
  },

  created() {
    this.loading = true;
    this.getCount();
    this.getList();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
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