<template>
  <div>
    <div v-loading="loading">
      <label style="width: 100%">
        <gmap-autocomplete
          ref="gmapAutocomplete"
          @place_changed="setPlace"
          :options="{
            fields: ['geometry', 'formatted_address', 'address_components'],
          }"
        >
        </gmap-autocomplete>
        <el-button
          @click="addMarker"
          type="danger"
          icon="el-icon-position"
        ></el-button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map
      ref="map"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 400px"
      @click="mark"
    >
      <gmap-marker
        :position="position"
        :clickable="true"
        :draggable="true"
        @click="center = position"
      ></gmap-marker>
    </gmap-map>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">Huỷ</el-button>
      <el-button type="primary" @click="getLocation">Lấy địa chỉ</el-button>
    </span>
  </div>
</template>

<script>
import EventBus from "@/EventBus";
import { getLocationAPI } from "@/api/staff/petApi";
export default {
  name: "RegisterCenterMap",
  data() {
    return {
      center: { lat: 10.84157038648921, lng: 106.81006578904247 },
      currentPlace: null,
      places: [],
      zoom: 12,
      position: null,
      loading: false,
      address: "",
    };
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    // nhận địa điểm thông qua autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },

    async mark(event) {
      this.loading = true;
      this.position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      await getLocationAPI(this.position.lat, this.position.lng)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.$refs.gmapAutocomplete.$refs.input.value =
            data.results[0].formatted_address;
          this.address = data.results[0].formatted_address;
        });
      this.loading = false;
    },

    addMarker() {
      if (this.currentPlace) {
        this.position = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.center = this.position;
        this.places.push(this.currentPlace);
        // this.currentPlace = null;
        this.zoom = 17;
      }
    },
    geolocate: function () {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },

    getLocation() {
      let value = {
        address: this.address
          ? this.address
          : this.currentPlace.formatted_address,
        lat: this.position.lat,
        lng: this.position.lng,
      };
      let visible = false;
      EventBus.$emit("CloseMapDialog", visible, value);
    },
  },
};
</script>
<style>
.pac-container {
  z-index: 9999 !important;
}
.pac-icon {
  display: none !important;
}

.pac-item {
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
}
.pac-item:hover {
  background-color: #ececec;
}
.pac-item-query {
  font-size: 16px;
}
.pac-target-input {
  width: 70%;
  padding: 8px 20px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>