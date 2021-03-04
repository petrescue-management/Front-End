<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sách đơn đăng kí nhận nuôi chó mèo</span>
      </div>
      <div>
        <el-table :data="listForm">
          <el-table-column label="Ảnh Boss" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.imgPet" width="80px"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="namePet"
            label="Tên Boss"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="nameAdopter"
            label="Tên người nhận nuôi"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="Số điện thoại"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="status"
            label="Trạng thái"
            width="180"
          ></el-table-column>
          <el-table-column label="Chi tiết" width="100">
            <template>
              <el-button
                type="text"
                size="small"
                @click="goToDetail()"
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
      <FormAdoptDetail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import FormAdoptDetail from "./modal/FormAdoptDetail";
import { getListAdoptionFormApi } from "@/api/staff/adoptionFormApi"
export default {
  components: {
    FormAdoptDetail,
  },
  data() {
    return {
      listForm: [
        {
          imgPet: require("@/assets/img/alley.jpg"),
          namePet: "Arvil",
          nameAdopter: "Võ Quang Minh",
          phone: "0784445345",
          status: "chờ duyệt",
        },
      ],
      totalForm: 0,
      dialogVisible: false,
    };
  },

  methods: {
    goToDetail() {
      this.dialogVisible = true;
      // this.id = id;
    },
  },

  created(){
    let params = {
      keyword : null,
      pageIndex: 1
    }
    getListAdoptionFormApi(params);
  }
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