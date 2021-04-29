<template>
  <div>
    <el-table
      :data="tracking"
      :default-sort="{ prop: 'insertAt', order: 'asccending' }"
    >
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column
        prop="insertAt"
        label="Ngày cập nhật"
        width="200"
        sortable
      ></el-table-column>
      <el-table-column prop="description" label="Miêu tả"></el-table-column>
      <el-table-column fixed="right" label="Chi tiết" width="160">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="info"
            icon="el-icon-view"
            style="font-size: 16px"
            @click="showDetail(scope.row.adoptionReportTrackingId)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="Chi tiết tình trạng"
      :visible.sync="dialogDetailTracking"
      center
    >
      <AdopterTrackingDetail
        :adoptionReportTrackingId="petTrackingId"
        v-if="dialogDetailTracking"
      />
    </el-dialog>
  </div>
</template>

<script>
import AdopterTrackingDetail from "./AdopterTrackingDetail.vue";
export default {
  components: { AdopterTrackingDetail },
  props: {
    petTracking: Array,
  },

  data() {
    return {
      tracking: [],
      petTrackingId: "",
      dialogDetailTracking: false,
    };
  },

  methods: {
    showDetail(id) {
      this.petTrackingId = id;
      this.dialogDetailTracking = true;
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
        date.getFullYear()
      );
    },

    getTableData(list) {
      this.tracking = [];
      if (list) {
        list.forEach((data) => {
          let table = {
            adoptionReportTrackingId: data.adoptionReportTrackingId,
            imageUrl: data.adoptionReportTrackingImgUrl,
            description: data.description,
            insertAt: this.getDatetime(data.insertedAt),
          };
          this.tracking.push(table);
        });
      }
      console.log(this.tracking);
    },
  },

  created() {
    this.getTableData(this.petTracking);
  },
};
</script>

<style>
</style>