<template>
  <div class="vertical-center">
    <div class="inner-block">
      <div class="vue-tempalte">
        <form
          @submit.prevent="submit"
          v-loading.fullscreen.lock="fullscreenLoading"
        >
          <h3>Đăng kí trung tâm</h3>
          <b-form-group label="Email address:">
            <b-form-input
              v-model="form.email"
              type="email"
              placeholder="Nhập email"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Tên trung tâm:">
            <b-form-input
              v-model="form.name"
              placeholder="Nhập tên trung tâm"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Địa chỉ:">
            <b-input-group>
              <b-form-input
                v-model="form.address"
                placeholder="Chọn địa chỉ"
                required
                readonly
              ></b-form-input>
              <b-input-group-append>
                <b-button @click="dialogVisible = true"
                  ><b-icon icon="map" aria-hidden="true"></b-icon
                ></b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
          <b-form-group label="SĐT:">
            <b-form-input
              v-model="form.phone"
              type="tel"
              placeholder="Nhập sđt"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Mô tả:">
            <b-form-textarea
              v-model="form.description"
              placeholder="Mô tả trung tâm"
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </b-form-group>
          <b-button @click="registerCenter" variant="primary">Submit</b-button>
        </form>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" title="Chọn địa chỉ">
      <RegisterCenterMap v-if="dialogVisible" />
    </el-dialog>

    <el-dialog
      title="Tips"
      :visible.sync="dialogInfo"
      width="30%"
    >
      <span>Đăng ký thành công, hãy chờ chúng tôi phản hồi mail của các bạn nhé</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogInfo = false"
          >OK</el-button
        >
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
          this.dialogInfo = true
        }
        else{
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
}

.login {
  background-color: #7c7b7b;
  border: 1px solid #7c7b7b;
  margin-bottom: 10px;
}
</style>
