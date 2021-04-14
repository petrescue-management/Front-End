<template>
  <div>
    <el-main>
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách cứu hộ</h1>
        </div>
      </div>
      <br />

      <div style="padding: 0 10px">
        <b-card header="Các ca cứu hộ thành công" header-tag="header">
          <el-table
            :data="
              listDoc.filter(
                (data) =>
                  !search ||
                  data.pickerName.toLowerCase().includes(search.toLowerCase())
              )
            "
            v-loading="loading"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <p><b>Mô tả:</b> {{ props.row.pickerDescription }}</p>
              </template>
            </el-table-column>
            <el-table-column label="Ngày" prop="date" sortable>
            </el-table-column>
            <el-table-column label="Người cứu hộ" prop="pickerName">
            </el-table-column>
            <el-table-column
              label="Trạng thái"
              :filters="filterStatus"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
              <template slot-scope="scope">
                <el-tag class="status" :type="scope.row.color" size="small">
                  {{ scope.row.status }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="Chi tiết">
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
                  type="info"
                  icon="el-icon-view"
                  @click="goToDetail(scope.row.petDocumentId)"
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import EventBus from "@/EventBus";
import { petDocStatus } from "@/enum/consts";
export default {
  computed: {
    ...mapGetters("rescueReport", ["getListDoc"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      listDoc: [],
      dialogVisible: false,
      dialogAddVisible: false,
      loading: false,
      search: "",
      filterStatus: [],
    };
  },

  methods: {
    ...mapActions("rescueReport", ["getListPetDocument"]),

    goToDetail(id) {
      this.$router.push({ name: "ReportRescue", params: { id } });
    },

    getTableData(list) {
      this.listDoc = [];
      list.forEach((data) => {
        let doc = {
          petDocumentId: data.petDocumentId,
          status: petDocStatus.get(data.petDocumentStatus).name,
          color: petDocStatus.get(data.petDocumentStatus).color,
          date: this.getDatetime(data.pickerForm.pickerDate),
          pickerName: data.pickerForm.pickerName,
          pickerDescription: data.pickerForm.pickerDescription,
        };
        this.listDoc.push(doc);
      });
    },

    getDatetime(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      return (
        (dd > 9 ? "" : "0") +
        dd +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        date.getFullYear() +
        " " +
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (min > 9 ? "" : "0") +
        min
      );
    },

    async getList() {
      let token = this.getUser.token;
      await this.getListPetDocument(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListDoc)));
      this.loading = false;
    },

    getStatus() {
      petDocStatus.forEach((values, keys) => {
        console.log(keys);
        let status = {
          value: values.name,
          text: values.name,
        };
        this.filterStatus.push(status);
      });
    },

    filterTag(value, row) {
      return row.status === value;
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
    this.getStatus();
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