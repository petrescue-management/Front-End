<template>
  <div class="vertical-center">
    <div class="row" style="margin: 0">
      <div class="col-md-6">
        <div class="info">
          <img
            src="@/assets/img/Logo_notitle_circle.png"
            width="100px"
            height="100px"
            style="display: block; margin-left: auto; margin-right: auto;margin-bottom: 10px"
          />
          <h3>Pet Rescue - Đăng ký làm Trung tâm</h3>
          <p class="content">
            GitLab.com offers free unlimited (private) repositories and
            unlimited collaborators.
          </p>
          <ul class="list">
            <li>Explore projects on GitLab.com (no login needed)</li>
            <li>More information about GitLab.com</li>
            <li>GitLab Community Forum</li>
            <li>GitLab Homepage</li>
          </ul>
          <p class="content">By signing up for and by signing in to this service you accept our:</p>
          <ul class="list">
            <li>Privacy policy</li>
            <li>GitLab.com Terms.</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="inner-block">
          <div class="vue-tempalte">
            <el-form
              label-position="top"
              label-width="100px"
              size="mini"
              v-loading.fullscreen.lock="fullscreenLoading"
            >
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item class="label-text" label="Email trung tâm:">
                    <el-input
                      v-model="form.email"
                      type="email"
                      placeholder="Nhập email"
                      size="sm"
                      id="input-small"
                      required
                    ></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item class="label-text" label="Tên trung tâm:">
                    <el-input
                      v-model="form.name"
                      placeholder="Nhập tên trung tâm"
                      size="sm"
                      required
                    ></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-form-item class="label-text" label="Địa chỉ:">
                <el-input
                  v-model="form.address"
                  placeholder="Chọn địa chỉ"
                  size="sm"
                  required
                  readonly
                >
                  <el-button
                    slot="append"
                    @click="dialogVisible = true"
                    icon="el-icon-location-outline"
                  ></el-button>
                </el-input>
              </el-form-item>
              <el-form-item class="label-text" label="SĐT:">
                <el-input
                  v-model="form.phone"
                  type="tel"
                  placeholder="Nhập sđt"
                  size="sm"
                  required
                ></el-input>
              </el-form-item>
              <el-form-item class="label-text" label="Mô tả:">
                <b-form-textarea
                  v-model="form.description"
                  placeholder="Mô tả trung tâm"
                  size="sm"
                  rows="3"
                  max-rows="6"
                ></b-form-textarea>
              </el-form-item>
              <b-button @click="registerCenter" variant="primary"
                >Đăng ký</b-button
              >
              <br/>
              <br/>
              <p class="sign-up">
                Đã có tài khoản cho trung tâm ?
                <span class="register" @click="registerPage()"
                  >Đăng nhập ngay</span
                >
              </p>
            </el-form>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="dialogVisible" title="Chọn địa chỉ">
      <RegisterCenterMap v-if="dialogVisible" />
    </el-dialog>
    <el-dialog
      title="Đăng ký thành công"
      :visible.sync="dialogInfo"
      width="30%"
    >
      <span
        >Đăng ký thành công, hãy chờ chúng tôi phản hồi mail của các bạn
        nhé</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInfo = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import RegisterCenterMap from "@/components/google-map/RegisterCenterMap";
import EventBus from "@/EventBus";
import { createCenterForm } from "@/api/staff/centerApi.js";
export default {
  components: {
    RegisterCenterMap,
  },
  data() {
    return {
      fullscreenLoading: false,
      dialogInfo: false,
      dialogVisible: false,
      form: {
        email: "",
        name: "",
        address: "",
        phone: "",
        description: "",
      },
      position: {
        lat: null,
        lng: null,
      },
    };
  },
  methods: {

    registerPage() {
      this.$router.push({ name: "LoginStaff" });
    },

    async registerCenter() {
      this.fullscreenLoading = true;
      let data = {
        centerName: this.form.name,
        centerAddress: this.form.address,
        email: this.form.email,
        phone: this.form.phone,
        lat: this.position.lat,
        lng: this.position.lng,
        description: this.form.description,
      };

      await createCenterForm(data).then((response) => {
        if (response.status == 200) {
          this.fullscreenLoading = false;
          this.dialogInfo = true;
        } else {
          this.fullscreenLoading = false;
        }
      });
    },
  },

  mounted() {
    EventBus.$on("CloseMapDialog", (visible, value) => {
      if (value) {
        this.form.address = value.address;
        this.position = {
          lat: value.lat,
          lng: value.lng,
        };
      }
      this.dialogVisible = visible;
    });
  },
};
</script>

<style scoped>
.vertical-center {
  background: #ebd4ce;
  /* height: auto; */
}

.login {
  background-color: #7c7b7b;
  border: 1px solid #7c7b7b;
  margin-bottom: 10px;
}

.label-text >>> label {
  line-height: normal;
  padding: 0;
}

.info {
  margin-left: 60px;
  margin-right: 40px;
}

.vertical-center h3 {
  text-align: left;
}

.content{
  color: #888;
}

.list{
  color: #1068bf;
  font-size: 20px;
}

.register {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}

.sign-up {
  font-size: 15px;
}

.pac-container{
  z-index: 9999 !important;
}
</style>
