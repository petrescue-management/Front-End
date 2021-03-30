
<template>
  <div v-if="notify">
    <div id="notification-box" class="notification-box">
      <a href="#" id="notification-close" @click="closed()" title="close">x</a>
      <div class="contain_img">
        <img src="@/assets/img/Logo_withtitle_circle.png" width="70px" height="70px" />
      </div>
      <div class="notification-data">
        <div class="notification-title">
          <p id="title">
            {{ title }}
          </p>
        </div>

        <div class="notification-notice">
          <p id="subject">{{ subject }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import NotiService from "@/services/NotiService";
import { Notification } from "@/enum/notification-enum";
export default {
  name: "NotificationBox",

  data() {
    return {
      title: "Thông báo mới",
      subject: "Nhân viên đã chấp nhận thông báo cứu hộ Pet",
      messaging: firebase.messaging(),
      notify: false,
    };
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    receiveMessage() {
      try {
        this.messaging.onMessage((payload) => {
          console.log("Message received. ", payload);
          let type = payload.data.Type;
          this.setSubject(Notification.get(parseInt(type)).message);
          this.saveNotiToRealtimeDB(payload.data.AdoptionRegistrationId,parseInt(type))
          this.notify = true;
          setTimeout(() => {
            this.notify = false;
          }, 5000);
        });
      } catch (e) {
        console.log(e);
      }
    },

    setSubject(message) {
      this.subject = message;
    },

    saveNotiToRealtimeDB(notiId,type) {
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let datetime = date + " " + time;

      let data = {
        date: datetime,
        isCheck: false,
        type: type,
      };

      NotiService.createNoti(this.getUser.centerId, notiId, data)
        .then(() => {
          console.log("Created new item successfully!");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },

  created() {
    this.receiveMessage();
  },

  validations: function () {
    return {};
  },

};
</script>

<style scoped>
.notification-box {
  display: flex;
  position: absolute;
  right: 5px;
  bottom: 10px;
  width: 30%;
  height: 100px;
  background-color: rgb(255, 255, 255);
  z-index: 999;
  border-radius: 10px;
}
#notification-close {
  position: absolute;
  color: #777;
  font: 15px;
  right: 5px;
  text-decoration: none;
  text-shadow: 0 1px 0 #fff;
  top: 2px;
  z-index: 10;
  cursor: pointer;
}

.notification-data {
  margin: 0 20px;
}
.notification-data p {
  margin: 10px 0;
}
.notification-notice p {
  font-size: 14px;
  font-weight: 400;
}
.notification-title p {
  font-size: 18px;
  font-weight: bold;
  line-height: 18px;
}
.notification-time small {
  font-size: 12px;
}

.notification-wall-number small {
  font-size: 8px;
}

.contain_img {
  margin: auto 15px;
}
</style>