<template>
  <div>
    <table width="100%" style="border-spacing: 0px;">
      <tr>
        <th colspan="2">
          <Header />
        </th>
      </tr>
      <tr>
        <th width="15%" style="height: 89vh;">
          <Navigation />
        </th>
        <th>
          <router-view />
        </th>
      </tr>
    </table>
    <notification-box/>
  </div>
</template>
<script>
import NotificationBox from '@/components/notification/NotificationBox'
import Header from "@/components/staff/Header";
import Navigation from "@/components/staff/Navigation";
export default {
  components: {
    Header: Header,
    Navigation: Navigation,
    NotificationBox: NotificationBox
  }
};
</script>
