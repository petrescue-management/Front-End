<template>
  <div>
    <el-main>
      <h2>Thông tin giải cứu</h2>
      <b-row class="info">
        <b-col sm="4">
          <img src="@/assets/img/alley.jpg" width="100%" />
          <div class="button">
            <el-button type="success" @click="changeStatusReceipt('approve')"
              >Accept</el-button
            >
            <el-button type="danger" @click="changeStatusReceipt('reject')"
              >Reject</el-button
            >
          </div>
        </b-col>
        <b-col>
          <b-row class="info">
            <b-col sm="5"> <b-icon icon="clock" /> Đăng lúc: </b-col>
            <b-col class="text-info-res">
              <div>22/01/2020 12:00:00</div>
            </b-col>
          </b-row>
          <hr class="tag" />
          <b-row class="info">
            <b-col sm="5">
              <b-icon icon="person" /> Tên người phát hiện:
            </b-col>
            <b-col class="text-info-res">
              <div>Võ Quang Minh</div>
            </b-col>
          </b-row>
          <b-row class="info">
            <b-col sm="5">
              <b-icon icon="phone-vibrate" /> Số điện thoại:
            </b-col>
            <b-col>
              <div class="text-info-res">0784445345</div>
            </b-col>
          </b-row>
          <b-row class="info">
            <b-col sm="5"> <b-icon icon="journal" /> Mô tả: </b-col>
            <b-col class="text-info-res">
              <div>
                Mèo con bị lạc Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Unde perspiciatis quos reprehenderit iusto
                fugit quod ad error? Nam explicabo dolor quia! Fugit
                necessitatibus aut odit rem quos odio fugiat voluptate!
              </div>
            </b-col>
          </b-row>
          <hr class="tag" />
          <b-row class="info">
            <b-col sm="5"> <i class="el-icon-map-location" /> Địa chỉ: </b-col>
            <b-col class="text-info-res">
              <div>Đại học FPT, quận 9</div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <div class="map">
        <HereMap/>
      </div>
    </el-main>
  </div>
</template>

<script>
import HereMap from "@/components/here-map/HereMap";
export default {
  components: {
    HereMap,
  },

  data() {
    return {
      lat: 10.84157038648921,
      lng: 106.81006578904247,
      apikey: "JZHycLyILFf7YeYjJDBvhkxs7tADa1b5U5cWuURXehQ",
    };
  },

  mounted() {
    // let map = this.$refs.map;
    // map.dropMarker({ lat: 10.84157038648921, lng: 106.81006578904247 });
    // map.dropMarker({ lat: 10.801145010307543, lng: 106.7886794543127 });
    // map.drawRoute(
    //   {
    //     lat: 10.84157038648921,
    //     lng: 106.81006578904247,
    //   },
    //   {
    //     lat: 10.801145010307543,
    //     lng: 106.7886794543127,
    //   }
    // );
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
}
.info {
  padding: 5px;
  font-size: 18px;
  width: 100%;
}
.text-info-res {
  color: #838383;
  font-weight: 400;
}

.tag {
  width: 90%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  margin-left: 5px;
}

.button {
  text-align: center;
  padding-top: 20px;
}

.map {
  width: 100%;
  background-color: #838383;
}
</style>