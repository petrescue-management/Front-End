<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">NavBar</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right >
          <template #button-content>
            <b-icon
              style="font-size: 20px"
              icon="bell-fill"
              variant="light"
            ></b-icon>
            <span class="badge badge-danger">6</span>
          </template>
          <b-dropdown-text style="width: 340px; text-align: center">
            Notification <span class="badge2 badge-danger">6</span>
          </b-dropdown-text>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item class="noti" v-for="n in 6" :key="n">
            <b-row>
              <b-col sm="3">
                <img src="@/assets/img/Logo 4_circle.png" width="45px" height="45px">
              </b-col>
              <b-col>
                <div style="white-space: pre-wrap;">Bạn nhận được yêu cầu cầu cứu Pet</div>
              </b-col>
            </b-row>
          </b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {
  name: "Navbar",
  computed: {},
  methods: {},
};
</script>
<style scoped>
.badge {
  padding: 3px 5px 2px;
  position: absolute;
  top: 8px;
  right: 5px;
  display: inline-block;
  min-width: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  vertical-align: baseline;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
}

.badge2 {
  padding: 3px 5px 2px;
  top: 8px;
  right: 5px;
  display: inline-block;
  min-width: 10px;
  font-size: 12px;
  font-weight: bold;
  color: #ffffff;
  line-height: 1;
  vertical-align: baseline;
  white-space: nowrap;
  text-align: center;
  border-radius: 10px;
}
.badge-danger {
  background-color: #db5565;
}

.noti {
  padding: 5px;
}
</style>
