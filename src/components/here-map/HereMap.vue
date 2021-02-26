<template>
  <div id="map">
    <!--In the following div the HERE Map will render-->
    <div
      id="mapContainer"
      style="height: 600px; width: 100%"
      ref="hereMap"
    ></div>
  </div>
</template>

<script>
export default {
  name: "HereMap",
  props: {
    lat: Number,
    lng: Number,
    apikey: String,
  },
  data() {
    return {
      platform: null,
      map: null,
      routingService: null,
    };
  },

  created() {
    this.platform = new window.H.service.Platform({
      apikey: this.apikey,
    });
    this.routingService = this.platform.getRoutingService();
  },
  async mounted() {
    this.initializeHereMap();
  },
  methods: {
    initializeHereMap() {
      // rendering map

      const mapContainer = this.$refs.hereMap;
      const H = window.H;
      // Obtain the default map types from the platform object
      var maptypes = this.platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      this.map = new H.Map(mapContainer, maptypes.vector.normal.map, {
        zoom: 15,
        center: { lat: this.lat, lng: this.lng },
        // center object
      });

      addEventListener("resize", () => this.map.getViewPort().resize());

      // add behavior control
      new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));

      // add UI
      H.ui.UI.createDefault(this.map, maptypes);
      // End rendering the initial map
    },

    dropMarker(position) {
      const H = window.H;
      let marker = new H.map.Marker({
        lat: position.lat,
        lng: position.lng,
      });
      this.map.addObject(marker);
    },

    drawRoute(start, finish) {
      const H = window.H;
      this.routingService.calculateRoute(
        {
          mode: "fastest;car;traffic:enabled",
          waypoint0: `${start.lat},${start.lng}`,
          waypoint1: `${finish.lat},${finish.lng}`,
          representation: "display",
        },
        (data) => {
          if (data.response.route.length > 0) {
            let lineString = new H.geo.LineString();
            data.response.route[0].shape.forEach((point) => {
              let [lat, lng] = point.split(",");
              lineString.pushPoint({ lat: lat, lng: lng });
            });
            let polyline = new H.map.Polyline(lineString, {
              style: {
                lineWidth: 5,
              },
            });
            this.map.addObject(polyline);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>

<style scoped>
#map {
  width: 60vw;
  min-width: 360px;
  text-align: center;
  margin: 5% auto;
  background-color: #ccc;
}
</style>