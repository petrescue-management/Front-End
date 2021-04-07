<template >
  <div>
    <h3>Thông tin từ người mang về</h3>
    <b-row class="info">
      <b-col>
        Người mang về: <span class="value">{{ originalData.pickerName }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col
        >Ngày phát hiện:
        <span class="value">{{ originalData.pickerDate }}</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Mô tả : <span class="value">{{ originalData.pickerDescription }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col style="margin: auto">
        <span>Ảnh của người mang về : </span>
      </b-col>
    </b-row>
    <b-row>
      <div
        class="container-img"
        v-for="(image, key) in originalData.pickerImageUrl"
        :key="key"
      >
        <div class="img-center">
          <el-image
            class="preview"
            :src="image"
            :preview-src-list="originalData.pickerImageUrl"
            :z-index="9999"
            fit="fit"
          >
          </el-image>
        </div>
      </div>
    </b-row>
  </div>
</template>
<script>
export default {
  props: {
    pickerForm: Object,
  },

  data() {
    return {
      originalData: null,
      show: false,
    };
  },

  methods: {
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

    getTableData() {
      this.originalData = {
        pickerDate: this.getDate(this.pickerForm.pickerDate),
        pickerName: this.pickerForm.pickerName,
        pickerDescription: this.pickerForm.pickerDescription,
        pickerImageUrl: this.pickerForm.pickerImageUrl.split(";"),
      };
    },
  },

  created() {
    this.getTableData();
  },
};
</script>
<style scoped>
.tag {
  border-top: 1px dashed #8c8b8b;
  margin: 5px;
}

.info {
  font-size: 18px;
}

.value {
  font-weight: 300;
}

.container-img {
  padding: 5px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-left: 20px;
}
.img-center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: relative;
  display: block;
}
.preview >>> img {
  max-height: 100px;
  max-width: 140px;
  display: block;
  vertical-align: middle;
}

.preview {
  max-height: 100px;
  max-width: 140px;
  display: block;
  vertical-align: middle;
}
</style>