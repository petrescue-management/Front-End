<template>
  <div>
    <div>
      <h2>Search and add a pin</h2>
      <label>
        <gmap-autocomplete
          @place_changed="setPlace"
          :options="{
            fields: ['geometry', 'formatted_address', 'address_components'],
          }"
        >
        </gmap-autocomplete>
        <button @click="addMarker">Add</button>
      </label>
      <br />
    </div>
    <br />
    <gmap-map
      ref="map"
      :center="center"
      :zoom="zoom"
      style="width: 100%; height: 500px"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  name: "GoogleMap",
  data() {
    return {
      //mặc định là Montreal
      center: { lat: 10.84157038648921, lng: 106.81006578904247 },
      markers: [],
      places: [],
      currentPlace: null,
      zoom: 12,
    };
  },

  mounted() {
    this.geolocate();
    this.$nextTick(() => {
      this.$refs.map.$gmapApiPromiseLazy().then(this.loadControls);
    });
  },

  methods: {
    // nhận địa điểm thông qua autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
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

    loadControls() {
      var controlDiv = document.createElement("div");
      var firstChild = document.createElement("button");
      firstChild.style.backgroundColor = "#fff";
      firstChild.style.border = "none";
      firstChild.style.outline = "none";
      firstChild.style.width = "40px";
      firstChild.style.height = "40px";
      firstChild.style.borderRadius = "2px";
      firstChild.style.boxShadow = "0 1px 4px rgba(0,0,0,0.3)";
      firstChild.style.cursor = "pointer";
      firstChild.style.marginRight = "10px";
      firstChild.style.padding = "0px";
      firstChild.title = "Your Location";
      controlDiv.appendChild(firstChild);
      var secondChild = document.createElement("div");
      secondChild.style.margin = "5px";
      secondChild.style.width = "28px";
      secondChild.style.height = "28px";
      secondChild.style.backgroundImage =
        "url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)";
      secondChild.style.backgroundSize = "300px 30px";
      secondChild.style.backgroundPosition = "0px 0px";
      secondChild.style.backgroundRepeat = "no-repeat";
      secondChild.id = "you_location_img";
      firstChild.appendChild(secondChild);
      window.google.maps.event.addListener(
        this.$refs.map.$mapObject,
        "center_changed",
        function () {
          secondChild.style["background-position"] = "0 0";
        }
      );
      firstChild.addEventListener("click", function () {
        navigator.geolocation.getCurrentPosition((position) => {
          let center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.markers.push({ position: center });
          this.places.push(center);
          this.zoom = 17;
        });
      });
      controlDiv.index = 1;
      this.$refs.map.$mapObject.controls[
        window.google.maps.ControlPosition.RIGHT_BOTTOM
      ].push(controlDiv);
    },
  },
};
</script>