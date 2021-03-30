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
      <div>
        <b-card header="Thêm tình nguyện viên" header-tag="header">
          <el-form :model="form" :rules="rules" ref="form" label-width="120px">
            <el-col :span="10">
              <el-form-item label="Email" prop="email">
                <el-input v-model="form.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10" style="padding-left: 10px">
              <el-button type="primary" @click="addVolunteer('form')"
                >Add</el-button
              >
            </el-col>
          </el-form>
        </b-card>
      </div>
      <br /><br />
      <div>
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
              width="200"
            ></el-table-column>
            <el-table-column
              prop="phone"
              label="Phone"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="address"
              label="Address"
              width="250"
            ></el-table-column>
            <el-table-column label="Chi tiết" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="small"
                  @click="goToDetail(scope.row.id)"
                  >Detail</el-button
                >
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
    <el-dialog
      title="Thông tin tình nguyện viên"
      :visible.sync="dialogVisible"
      center
    >
      <VolunteerDetail :id="id" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import VolunteerDetail from "./modal/VoluteerDetail";
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/EventBus";
import { addVolunteerToCenterAPI } from "@/api/staff/volunteerApi";
export default {
  components: {
    VolunteerDetail,
  },
  computed: {
    ...mapGetters("volunteer", ["getListVolunteer"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      listForm: [],
      dialogVisible: false,
      loading: false,
      id: null,
      form: {
        email: "",
      },
      rules: {
        email: {
          type: "email",
          required: true,
          message: "Please input Email",
          trigger: "blur",
        },
      },
    };
  },

  methods: {
    ...mapActions("volunteer", ["getListVolunteerOfCenter"]),

    goToDetail(id) {
      this.dialogVisible = true;
      this.id = id;
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
          address: data.address,
        };
        this.listForm.push(form);
      });
    },

    addVolunteer(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let token = this.getUser.token;
          addVolunteerToCenterAPI(this.form.email, token).then((response) => {
            if (response.status == 200) {
              this.$message({
                message: "Thêm thành công",
                type: "success",
              });
            }else{
              this.$message({
                message: "Thêm không thành công",
                type: "danger",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    async getList() {
      let token = this.getUser.token;
      await this.getListVolunteerOfCenter(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListVolunteer)));
      this.loading = false
    },
  },

  mounted() {
    EventBus.$on("CloseVolunteerDialog", (visible) => {
      this.dialogVisible = visible;
      this.getList();
    });
  },

  created() {
    this.loading = true
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