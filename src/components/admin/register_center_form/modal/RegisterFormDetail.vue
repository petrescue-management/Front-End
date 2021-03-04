<template>
  <div>
    <el-main v-loading="loading">
      <div class="rowInline" style="width: 100px">
        <img
          src="@/assets/img/Logo 4_circle.png"
          width="100px"
          height="100px"
        />
      </div>
      <div class="rowInline" style="padding: 20px 20px 0px 20px">
        <span class="header">{{ form.name }}</span>
        <br />
        <span>Create form : 21/08/1999</span>
      </div>
      <div class="table">
        <el-row>
          <el-col :span="12" class="title"> Email </el-col>
          <el-col :span="12" class="title"> Phone </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="content">
            <p>{{ form.email }}</p>
          </el-col>
          <el-col :span="12" class="content">
            <p>{{ form.phone }}</p>
          </el-col>
        </el-row>
      </div>
      <hr />
      <div class="location">
        <i class="el-icon-location icon" />
      </div>
      <div class="location" style="padding: 5px 10px 0px 10px">
        <span>{{ form.address }}</span>
      </div>
      <hr />
      <div class="table">
        <el-row>
          <el-col class="title"> Mô tả </el-col>
        </el-row>
        <el-row>
          <el-col class="content">
            <p>{{ form.description }}</p>
          </el-col>
        </el-row>
      </div>
      <div class="button" v-if="form.status != 2 || form.status != 3">
        <el-button type="success" @click="changeStatus(2)"
          >Accept</el-button
        >
        <el-button type="danger" @click="changeStatus(3)"
          >Reject</el-button
        >
      </div>
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {changeStatusRegisterCenterFormByIdAPI} from "@/api/admin/registerCenterFormApi";
// import { status } from "@/enum/center-register-status-enum";
// import EventBus from "@/EventBus";
export default {
  props: ["id"],
  name: "RegisterFormDetail",
  data() {
    return {
      form: {
        id: null,
        name: null,
        phone: null,
        address: null,
        email: null,
        description: null,
        status: null,
        color: null,
      },
      loading: false,
      storeId: null,
    };
  },
  computed: {
    // ...mapGetters("user", ["user"]),
    ...mapGetters("registerForm", ["getFormDetail"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },
  methods: {
    ...mapActions("registerForm", ["getRegisterFormDetail"]),

    getDetail() {
      this.form = {
        id: this.getFormDetail.id,
        name: this.getFormDetail.name,
        phone: this.getFormDetail.phone,
        address: this.getFormDetail.address,
        email: this.getFormDetail.email,
        description: this.getFormDetail.description,
        status : this.getFormDetail.status
      };
      this.loading = false
    },

    async changeStatus(status) {
      let data = {
        id : this.id,
        status,
        idToken : this.getUser.token
      }
      await changeStatusRegisterCenterFormByIdAPI(data)
    }
  },
  created() {
    this.loading = true;
    let data = {
      id: this.id,
    };
    this.getRegisterFormDetail(data).then(() => {
      this.getDetail();
    });
  },
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: auto;
}
.rowInline {
  float: left;
  text-align: left;
  height: 100px;
}
.location {
  float: left;
  text-align: left;
  font-size: 18px;
}
.icon {
  font-size: 40px;
  color: #808080;
}
.header {
  font-size: 27px;
  color: #5D6F92;
}
.date {
  font-size: 18px;
}
.title {
  font-size: 16px;
  color: #808080;
}
.content {
  font-size: 20px;
  color: #1f1e1e;
}
.table {
  clear: both;
  padding-top: 20px;
  margin-bottom: 0;
}
.row {
  font-size: 17px;
}
hr {
  margin: 5px 0;
  clear: both;
}
.button {
  text-align: center;
}
.status1 {
  text-align: left;
  padding: 30px 0px 0px 120px;
  width: 100px;
}

.status2 {
  text-align: left;
  padding: 30px 0px 0px 90px;
  width: 100px;
}
</style>
