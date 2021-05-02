<template>
  <el-table
    :data="
      listForm.filter(
        (data) =>
          !search || data.name.toLowerCase().includes(search.toLowerCase())
      )
    "
    v-loading="loading"
  >
    <el-table-column label="Ảnh cá nhân" width="130">
      <template slot-scope="scope">
        <img :src="scope.row.img" width="70px" height="70px" />
      </template>
    </el-table-column>
    <el-table-column prop="email" label="Email" width="200"></el-table-column>
    <el-table-column prop="name" label="Name"></el-table-column>
    <el-table-column prop="dob" label="Ngày sinh" width="150"></el-table-column>
    <el-table-column prop="phone" label="Phone" width="150"></el-table-column>
    <el-table-column prop="dateStarted" label="Ngày bắt đầu"></el-table-column>
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
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/EventBus";
import { removeVolunteerToCenterAPI } from "@/api/staff/volunteerApi";
export default {
  data() {
    return {
      listForm: [],
      dialogVisible: false,
      loading: false,
      img: require("@/assets/img/avatar.jpg"),
      search: "",
    };
  },

  computed: {
    ...mapGetters("volunteer", ["getListVolunteer"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("volunteer", ["getListVolunteerOfCenter"]),

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
          dateStarted: this.getDate(data.dateStarted)
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
      this.loading = true;
      let data = {
        token: this.getUser.token,
        IsActive: true,
      };
      await this.getListVolunteerOfCenter(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListVolunteer)));
      this.loading = false;
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
            this.getList();
          }
        });
        this.loading = false;
      });
    },
  },

  created() {
    this.getList();
  },

  mounted() {
    EventBus.$on("CloseAddVolunteerDialog", () => {
      this.getList();
    });
  },
};
</script>

<style>
</style>