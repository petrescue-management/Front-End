<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">List</span>
      </div>
      <div>
        <el-table :data="listForm" v-loading="loading">
          <el-table-column
            prop="name"
            label="Center Name"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="Phone"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="Center Address"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="email"
            label="Email"
            width="180"
          ></el-table-column>
          <el-table-column label="Trạng thái" width="180">
            <template slot-scope="scope">
              <el-tag class="status" :type="scope.row.color" size="small">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
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
      title="DETAILS OF REGISTRATION FORM"
      :visible.sync="dialogVisible"
      center
    >
      <RegisterFormDetail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RegisterFormDetail from "./modal/RegisterFormDetail";
import { centerRegisterStatus } from "@/enum/center-register-status-enum";
export default {
  components: {
    RegisterFormDetail,
  },
  data() {
    return {
      listForm: [],
      totalForm: 0,
      dialogVisible: false,
      loading : false
    };
  },
  computed: {
    ...mapGetters("registerForm", ["getListForm", "getTotalForm"]),
  },

  methods: {
    ...mapActions("registerForm", ["getListRegisterCenterFormPaging"]),

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let store = {
          id: data.centerRegistrationId,
          name: data.centerName,
          phone: data.phone,
          address: data.centerAddress,
          email: data.email,
          status: centerRegisterStatus.get(data.centerRegistrationStatus).name,
          color: centerRegisterStatus.get(data.centerRegistrationStatus).color,
        };
        this.listForm.push(store);
      });
      this.loading = false;
    },

    async getCenter(page) {
      let data = {
        pageIndex: page,
      };
      await this.getListRegisterCenterFormPaging(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListForm)));
    },

    goToDetail(id) {
      this.dialogVisible = true;
      this.id = id;
    },
  },

  created() {
    this.loading = true;
    this.getCenter(1);

  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
}
.title {
  font-size: 25px;
}
.small {
  max-width: 500px;
}
</style>