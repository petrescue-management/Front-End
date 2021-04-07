<template>
  <div v-loading='loading'>
    <b-row class="info">
      <b-col>
        Ngày cập nhật: <span class="value">{{ petTrackingInfo.insertAt }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col
        >Cân nặng:
        <span class="value">{{ petTrackingInfo.weight }} kg</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Tiêm Vacxin :
        <span class="value">{{
          petTrackingInfo.isVaccinated ? "Có" : "Không"
        }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Triệt sản :
        <span class="value">{{
          petTrackingInfo.isSterilized ? "Có" : "Không"
        }}</span>
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
  props: ["petTrackingId"],
  data() {
    return {
      petTrackingInfo: {},
      loading: false,
    };
  },

  computed: {
    ...mapGetters("petInfo", ["getPetTracking"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("petInfo", ["getPetTrackingById"]),

    getDatetime(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      let ss = date.getSeconds();
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
        min +
        ":" +
        (ss > 9 ? "" : "0") +
        ss
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
        isVaccinated: info.isVaccinated,
        isSterilized: info.isSterilized,
        imageUrl: this.getListImg(info.imageUrl),
        description: info.description,
        weight: info.weight,
        insertAt: this.getDatetime(info.insertAt),
        author: info.author,
      };
      console.log(this.petTrackingInfo.imageUrl);
    },

    async getData() {
      this.loading = true;
      let data = {
        petTrackingId: this.petTrackingId,
        token: this.getUser.token,
      };
      await this.getPetTrackingById(data);
      this.getInfo(this.getPetTracking);

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