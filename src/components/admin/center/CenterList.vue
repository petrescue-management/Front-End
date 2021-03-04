<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">List</span>
      </div>
      <div>
        <el-table :data="listCenter">
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
            width="180"
          ></el-table-column>
          <el-table-column label="Trạng thái" width="180">
            <template slot-scope="scope">
              <el-tag class="status" :type="scope.row.color" size="small">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          :page-count="4"
          layout="prev, pager, next"
        ></el-pagination>
      </div>
    </el-main>
    <!-- <el-dialog title="Chi tiết Giao dịch" :visible.sync="dialogVisible">
      <transaction-detail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { centerStatus } from "@/enum/center-status-enum";
export default {
  data() {
    return {
      listCenter: [],
      totalCenter: 0,
    };
  },
  computed: {
    ...mapGetters("centerInfo", ["getListCenter"]),
  },

  methods: {
    ...mapActions("centerInfo", ["getListCenterPaging"]),

    getTableData(list) {
      this.listCenter = [];
      list.forEach((data) => {
        let store = {
          name: data.centerName,
          phone: data.phone,
          address: data.address,
          status: centerStatus.get(data.centerStatus).name,
          color: centerStatus.get(data.centerStatus).color,
        };
        this.listCenter.push(store);
      });
    },

    async getCenter(page) {
      let data = {
        pageIndex: page,
      };
      await this.getListCenterPaging(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListCenter)));
    },
  },

  created() {
    this.getCenter(1);
  },
};
</script>

<style scope>
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