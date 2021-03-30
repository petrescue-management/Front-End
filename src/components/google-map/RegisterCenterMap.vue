<template>
  <div>
    <div>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace"
          :options="{
            fields: ['geometry', 'formatted_address', 'address_components'],
          }"
        >
        </gmap-autocomplete>
        <el-button @click="addMarker">Lấy vị trí</el-button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map
      ref="map"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 400px"
    >
      <gmap-marker
        :position="position"
        @click="center = position"
      ></gmap-marker>
    </gmap-map>

    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="getLocation"
          >Confirm</el-button
        >
      </span>
  </div>
</template>

<script>
import EventBus from "@/EventBus";
export default {
  name: "RegisterCenterMap",
  data() {
    return {
      center: { lat: 10.84157038648921, lng: 106.81006578904247 },
      currentPlace: null,
      places: [],
      zoom: 12,
      position: null,
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

    getLocation(){
      let value = {
        address : this.currentPlace.formatted_address,
        lat: this.currentPlace.geometry.location.lat(),
        lng: this.currentPlace.geometry.location.lng(),
      }
      let visible = false;
      EventBus.$emit("CloseMapDialog", visible,value);
    }
  },
};
</script>
<style>
.pac-container {
    z-index: 1051 !important;
}
</style>