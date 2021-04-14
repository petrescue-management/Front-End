<template>
  <div>
    <el-table :data="tracking"  :default-sort = "{prop: 'insertAt', order: 'asccending'}">
      <el-table-column
      type="index"
      width="50">
    </el-table-column>
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
            @click="showDetail(scope.row.petTrackingId)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog
      title="Chi tiết tình trạng"
      :visible.sync="dialogDetailTracking"
      center
    >
      <PetTrackingDetail :petTrackingId="petTrackingId" v-if="dialogDetailTracking" />
    </el-dialog>
  </div>
</template>

<script>
import EventBus from "@/EventBus";
import PetTrackingDetail from './PetTrackingDetail.vue';
export default {
  components: { PetTrackingDetail },
  props: {
    petTracking: Array,
  },

  data() {
    return {
      tracking: [],
      petTrackingId : '',
      dialogDetailTracking: false,
    };
  },

  methods: {
    showDetail(id){
      this.petTrackingId = id;
      this.dialogDetailTracking = true;
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

    getTableData(list) {
      this.tracking = [];
      if (list) {
        list.forEach((data) => {
          let table = {
            petTrackingId: data.petTrackingId,
            isVaccinated: data.isVaccinated,
            isSterilized: data.isSterilized,
            imageUrl: data.imageUrl,
            description: data.description,
            weight: data.weight,
            insertAt: this.getDatetime(data.insertAt),
          };
          this.tracking.push(table);
        });
      }
      console.log(this.tracking);
    },
  },

  mounted() {
    EventBus.$on("CloseAddTrackingDialog", () => {
      setTimeout(() => {
        console.log(this.petTracking);
        this.getTableData(this.petTracking);
      }, 1000);
      
    });
  },

  created() {
    this.getTableData(this.petTracking);
  },
};
</script>

<style>
</style>