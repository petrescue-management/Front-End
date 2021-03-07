<template>
  <div>
    <el-main>
      <div style="text-align: left; padding: 20px 0px">
        <span class="title">Danh sách đơn đăng kí nhận nuôi chó mèo</span>
      </div>
      <div>
        <el-table :data="listForm">
          <el-table-column label="Ảnh Boss" width="180" height="180">
            <template slot-scope="scope">
              <img :src="scope.row.petImg" width="80px"/>
            </template>
          </el-table-column>
          <el-table-column
            prop="petName"
            label="Tên Boss"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="username"
            label="Tên người nhận nuôi"
            width="250"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="Số điện thoại"
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
      <FormAdoptDetail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { adoptionFormStatus } from '@/enum/adoption-form-status'
import FormAdoptDetail from "./modal/FormAdoptDetail";
export default {
  components: {
    FormAdoptDetail,
  },

  computed: {
    ...mapGetters("adoptionForm", ["getListAdoptionForm"]),
  },

  data() {
    return {
      listForm: [],
      total: 0,
      dialogVisible: false,
      id: null,
    };
  },

  methods: {
    ...mapActions("adoptionForm", ["getListAdoptionFormPaging"]),

    goToDetail(id) {
      this.dialogVisible = true;
      this.id = id;
    },

    getTableData(list) {
      this.listForm = [];
      list.forEach((data) => {
        let form = {
          id: data.adoptionRegisterId,
          petName: data.pet.petName,
          petImg: data.pet.imgUrl,
          username: data.userName,
          phone: data.phone,
          status : adoptionFormStatus.get(data.adoptionRegisterStatus).name,
          color : adoptionFormStatus.get(data.adoptionRegisterStatus).color
        };
        this.listForm.push(form);
      });

      console.log(this.listForm);
    },

    async getlistForm() {
      let params = {
      keyword : null,
      pageIndex: 1
    }
    await this.getListAdoptionFormPaging(params);
    this.getTableData(JSON.parse(JSON.stringify(this.getListAdoptionForm)));
    }
  },

  created(){
    this.getlistForm();
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