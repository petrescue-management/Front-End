<template>
  <card v-loading="loading">
    <h4 slot="header" class="card-title">Hồ sơ</h4>
    <form>
      <div class="row">
        <div class="col-md-4">
          <b-form-group id="input-group-1" label="Email:" label-for="input-1">
            <b-form-input v-model="getUser.email" type="email"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-4">
          <b-form-group
            id="input-group-1"
            label="Tên người quản lý:"
            label-for="input-1"
          >
            <b-form-input v-model="name"></b-form-input>
          </b-form-group>
        </div>
        <div class="col-md-4">
          <b-form-group id="input-group-1" label="SĐT:" label-for="input-1">
            <b-form-input v-model="getUser.centerPhone" required></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div>
        <b-form-group
          id="input-group-1"
          label="Tên trung tâm:"
          label-for="input-1"
        >
          <b-form-input v-model="getUser.centerName" required></b-form-input>
        </b-form-group>
      </div>

      <div>
        <b-form-group
          id="input-group-1"
          label="Địa chỉ trung tâm:"
          label-for="input-1"
        >
          <b-form-input v-model="getUser.centerAddress" required></b-form-input>
        </b-form-group>
      </div>

      <div class="row">
        <div class="col-md-2">
          <b-form-group
            id="input-group-1"
            label="Trạng thái:"
            label-for="input-1"
          >
            <el-tag class="status" :type="color" size="small">
              {{ status }}
            </el-tag>
          </b-form-group>
        </div>
        <div class="col-md-3">
          <b-form-group
            id="input-group-1"
            label="Ngày tạo:"
            label-for="input-1"
          >
            <b-form-input v-model="createdDay" required></b-form-input>
          </b-form-group>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6"></div>
        <div class="col-md-6"></div>
      </div>

      <div class="row">
        <div class="col-md-12"></div>
      </div>

      <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
        <div class="col-md-4"></div>
      </div>
      <div class="text-center">
        <button
          type="submit"
          v-show="statusNum != 1"
          class="btn btn-success btn-fill"
          @click.prevent="updateProfile(1)"
        >
          Mở cửa
        </button>

        <button
          style="margin-left: 20px"
          type="submit"
          v-show="statusNum != 2"
          class="btn btn-warning btn-fill"
          @click.prevent="updateProfile(2)"
        >
          Quá Tải
        </button>

        <button
          style="margin-left: 20px"
          type="submit"
          v-show="statusNum != 3"
          class="btn btn-danger btn-fill"
          @click.prevent="updateProfile(3)"
        >
          Đóng cửa
        </button>
      </div>
      <div class="clearfix"></div>
    </form>
  </card>
</template>
<script>
import Card from "@/components/Card/Card.vue";
import { getCenterInfoAPI, updateCenter } from "@/api/staff/centerApi";
import { centerStatus } from "@/enum/consts";
export default {
  components: {
    Card,
  },
  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      name: "",
      color: "",
      status: "",
      createdDay: "",
      statusNum: 0,
      loading : false
    };
  },
  methods: {
    async updateProfile(status) {
      this.$confirm("Bạn có chắc chắn muốn thay đổi này?", {
        confirmButtonText: "Ok",
        cancelButtonText: "Đóng",
      }).then(async () => {
        let data = {
          token: this.getUser.token,
          status,
          centerId: this.getUser.centerId,
        };
        await updateCenter(data).then((response) => {
          if (response.status == 200) {
            this.$message({
              message: "Thay đổi thành công",
              type: "success",
            });
            this.getCenterProfile();
          }
        });
      });
    },

    getDatetime(createdDate) {
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
        date.getFullYear() +
        " "
      );
    },
    async getCenterProfile() {
      this.loading = true;
      let data = {
        token: this.getUser.token,
        id: this.getUser.centerId,
      };
      await getCenterInfoAPI(data).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            this.color = centerStatus.get(data.centerStatus).color;
            this.status = centerStatus.get(data.centerStatus).name;
            this.statusNum = data.centerStatus;
            this.createdDay = this.getDatetime(data.insertedAt);
          });
        }
      });
      this.loading = false
    },
  },

  created() {
    this.name = this.getUser.lastName + " " + this.getUser.firstName;
    this.getCenterProfile();
  },
};
</script>
<style>
</style>
