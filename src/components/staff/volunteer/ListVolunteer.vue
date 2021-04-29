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
          <el-table :data="listForm.filter(
                (data) =>
                  !search ||
                  data.name.toLowerCase().includes(search.toLowerCase())
              )" v-loading="loading">
            <el-table-column label="Ảnh cá nhân" width="130">
              <template slot-scope="scope">
                <img :src="scope.row.img" width="70px"  height="70px" />
              </template>
            </el-table-column>
            <el-table-column
              prop="email"
              label="Email"
              width="200"
            ></el-table-column>
            <el-table-column prop="name" label="Name"></el-table-column>
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
            <el-table-column fixed="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="Gõ tên"
                  :name="scope"
                />
              </template>
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeVolunteer(scope.row.id)"
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
    </el-main>
    <el-dialog  title="Thêm tình nguyện viên" :visible.sync="dialogVisible">
      <AddVolunteer v-if="dialogVisible"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/EventBus";
import { removeVolunteerToCenterAPI } from "@/api/staff/volunteerApi";
import AddVolunteer from './modal/AddVolunteer.vue';
export default {
  components: { AddVolunteer },
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
      img: require("@/assets/img/avatar.jpg"),
      search: "",
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

    addVolunteer(){
      this.dialogVisible = true;
    },

    async removeVolunteer(id) {
      this.$prompt("Lý do vì sao xoá tình nguyện viên", "", {
        confirmButtonText: "Từ chối",
        cancelButtonText: "Cancel",
      }).then(async ({ value }) => {
        this.loading = true;
        let token = this.getUser.token;

        await removeVolunteerToCenterAPI(id, value, token).then((response) => {
          if (response.status == 200) {
            this.$message({
              message: "Thao tác thành công",
              type: "success",
            });
            this.getCount();
            this.getList();
          }
        });
        this.loading = false;
      });
    },

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let form = {
          id: data.userId,
          img: data.imgUrl ? data.imgUrl : this.img,
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
        (dd > 9 ? "" : "0") +
        dd +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        date.getFullYear()
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
    EventBus.$on("CloseRemoveDialog", (visible) => {
      this.dialogDeny = visible;
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