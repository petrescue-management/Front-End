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
        <span class="header">Center 1</span>
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
            <p>petrescuevt@gmail.com</p>
          </el-col>
          <el-col :span="12" class="content">
            <p>0903149876</p>
          </el-col>
        </el-row>
      </div>
      <hr />
      <div class="location">
        <i class="el-icon-location icon" />
      </div>
      <div class="location" style="padding: 5px 10px 0px 10px">
        <span>79/13/2 Xô Viết Nghệ Tĩnh, phường Thắng Tam, Vũng Tàu</span>
      </div>
      <hr />
      <div class="table">
        <el-row>
          <el-col class="title"> Description </el-col>
        </el-row>
        <el-row>
          <el-col class="content">
            <p>Tổ chứ phi lợi nhuận về cứu hộ vật nuôi (chủ yếu là chó mèo)</p>
          </el-col>
        </el-row>
      </div>
      <div class="button">
        <el-button type="success" @click="changeStatusReceipt('approve')"
          >Accept</el-button
        >
        <el-button type="danger" @click="changeStatusReceipt('reject')"
          >Reject</el-button
        >
      </div>
    </el-main>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import { getRegisterCenterFormByIdAPI } from "@/api/admin/registerCenterFormApi";
// import { status } from "../../../enum/ReceiptEnum";
// import { type } from "../../../enum/TypeEnum";
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
      },
      loading: false,
      storeId: null,
    };
  },
  computed: {
    // ...mapGetters("user", ["user"]),
    ...mapGetters("registerForm", ["getFormDetail"]),
  },
  methods: {
    ...mapActions("registerForm", ["getRegisterFormDetail"]),

  },
  async created() {
    this.loading = true;
    let data = {
      id: this.id,
    };
    console.log(data);
    await this.getRegisterFormDetail(data);
    this.loading = false;
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
  color: #008a4f;
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
.button{
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
