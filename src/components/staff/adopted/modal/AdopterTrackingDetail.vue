<template>
  <div v-loading='loading'>
    <b-row class="info">
      <b-col>
        Ngày cập nhật: <span class="value">{{ petTrackingInfo.insertAt }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Mô tả : <span class="value">{{ petTrackingInfo.description }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Người cập nhật : <span class="value">{{ petTrackingInfo.author }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col style="margin: auto">
        <span>Ảnh</span>
      </b-col>
    </b-row>
    <b-row>
      <div
        class="container-img"
        v-for="(image, key) in petTrackingInfo.imageUrl"
        :key="key"
      >
        <div class="img-center">
          <el-image
            class="preview"
            :src="image"
            :preview-src-list="petTrackingInfo.imageUrl"
            :z-index="9999"
          >
          </el-image>
        </div>
      </div>
    </b-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["adoptionReportTrackingId"],
  data() {
    return {
      petTrackingInfo: {},
      loading: false,
    };
  },

  computed: {
    ...mapGetters("adoptedPet", ["getReportTracking"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("adoptedPet", ["getReportTrackingById"]),

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

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
    },

    getInfo(info) {
      this.petTrackingInfo = {
        imageUrl: this.getListImg(info.adoptionReportTrackingImgUrl),
        description: info.description,
        insertAt: this.getDatetime(info.insertedAt),
        author: info.author,
      };
      console.log(this.petTrackingInfo.imageUrl);
    },

    async getData() {
      this.loading = true;
      let data = {
        adoptionReportTrackingId: this.adoptionReportTrackingId,
        token: this.getUser.token,
      };
      await this.getReportTrackingById(data);
      this.getInfo(this.getReportTracking);

      this.loading = false;
    },
  },

  async created() {
    await this.getData();
  },
};
</script>

<style scoped>
.info {
  font-size: 18px;
}
.tag {
  border-top: 1px dashed #8c8b8b;
  margin: 5px;
}
.value {
  font-weight: 300;
}
.container-img {
  padding: 5px;
  border-radius: 15px;
  position: relative;
  display: inline-block;
  margin-left: 25px;
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