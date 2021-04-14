<template>
  <div>
    <el-main>
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách đơn đăng ký tình nguyện viên</h1>
        </div>
      </div>
      <br />
      <div style="padding: 0px 21px 20px">
        <el-button type="info" icon="el-icon-back" @click="back()" plain
          >Trở về</el-button
        >
      </div>
      <div style="padding-left: 20px">
        <b-card header="Danh sách đơn" style="width: 98%" header-tag="header">
          <template>
            <el-table :data="listForm" v-loading="loading">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <p><b>Email:</b> {{ props.row.email }}</p>
                  <p><b>SĐT: </b> {{ props.row.phone }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="dateRegistration"
                label="Ngày đăng ký"
                sortable
              ></el-table-column>
              <el-table-column
                prop="fullName"
                label="Họ tên"
                width="250"
              ></el-table-column>
              <el-table-column
                prop="gender"
                label="Giới Tính"
              ></el-table-column>
              <el-table-column prop="dob" label="Ngày sinh"></el-table-column>
              <el-table-column label="Trạng thái">
                <template slot-scope="scope">
                  <el-tag class="status" :type="scope.row.color" size="small">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="Xét duyệt" width="160">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="success"
                    icon="el-icon-circle-check"
                    style="font-size: 18px"
                    @click="changeStatus(scope.row.id, 2)"
                  ></el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-circle-close"
                    style="font-size: 18px"
                    @click="showDenyDialog(scope.row.id)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
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
    <el-dialog title="Lý do từ chối đơn" :visible.sync="dialogDeny">
      <DialogDeny :id="id" v-if="dialogDeny" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { manGender, volunteerRegistrationFormStatus } from "@/enum/consts";
import { changeStatusVolunteerRegistrationFormAPI } from "@/api/staff/volunteerApi";
import DialogDeny from "./modal/DialogDeny.vue";
import EventBus from '@/EventBus'
export default {
  components: { DialogDeny },
  computed: {
    ...mapGetters("volunteer", ["getListForm"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      listForm: [],
      dialogDeny: false,
      loading: false,
      id: null,
      form: {
        isNameWro: false,
        isPhoneWro: false,
        isEmailWro: false,
        isOtherReason: false,
        desc: null,
      },
    };
  },

  methods: {
    ...mapActions("volunteer", ["getListVolunteerRegistrationForm"]),

    showDenyDialog(id) {
      this.id = id;
      this.dialogDeny = true;
    },

    back() {
      this.$router.push({ name: "Volunteer" });
    },

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let form = {
          dateRegistration: this.getDate(data.insertAt),
          id: data.formId,
          fullName: data.lastName + " " + data.firstName,
          phone: data.phone,
          dob: this.getDate(data.dob),
          gender: manGender.get(data.gender),
          email: data.email,
          status: volunteerRegistrationFormStatus.get(data.status).name,
          color: volunteerRegistrationFormStatus.get(data.status).color,
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
      await this.getListVolunteerRegistrationForm(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListForm)));
      this.loading = false;
    },

    async changeStatus(id, status) {
      let data;
      if (status == 2) {
        data = {
          volunteerRegistrationFormId: id,
          status: status,
        };
      }

      let token = this.getUser.token;
      this.$confirm("Bạn có chắc chắn muốn duyệt đơn đăng ký này?", {
        confirmButtonText: "Duyệt",
        cancelButtonText: "Huỷ",
      })
        .then(async () => {
          this.loading = true;
          await changeStatusVolunteerRegistrationFormAPI(data, token).then(
            (response) => {
              if (response.status == 200) {
                this.$message({
                  message: "Thao tác thành công",
                  type: "success",
                });
                this.getList();
              }
            }
          );
          this.loading = false;
        })
        .catch(() => {});
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
    this.getList();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 80vh;
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