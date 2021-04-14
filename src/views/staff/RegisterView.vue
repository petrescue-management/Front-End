<template>
  <div class="vertical-center">
    <div class="row" style="margin: 0">
      <div class="col-md-6">
        <div class="info">
          <img
            src="@/assets/img/Logo_notitle_circle.png"
            width="100px"
            height="100px"
            style="
              display: block;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 10px;
            "
          />
          <h3>Pet Rescue - Đăng ký làm Trung tâm</h3>
          <!-- <p class="content">
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
          </ul> -->
        </div>
      </div>
      <div class="col-md-6">
        <div class="inner-block">
          <div v-if="this.active == 0">
            <h5 style="font-weight: 600">Bước 1 - Nhập thông tin trung tâm</h5>
            <div class="vue-tempalte">
              <el-form
                label-position="top"
                label-width="100px"
                size="mini"
                :model="form"
                :rules="rules"
                ref="form"
                v-loading="fullscreenLoading"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      class="label-text"
                      prop="email"
                      label="Email trung tâm:"
                    >
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
                    <el-form-item
                      class="label-text"
                      prop="name"
                      label="Tên trung tâm:"
                    >
                      <el-input
                        v-model="form.name"
                        placeholder="Nhập tên trung tâm"
                        size="sm"
                        required
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item
                  class="label-text"
                  prop="address"
                  label="Địa chỉ:"
                >
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
                <el-form-item class="label-text" prop="phone" label="SĐT:">
                  <el-input
                    v-model="form.phone"
                    type="tel"
                    placeholder="Nhập sđt"
                    size="sm"
                    required
                  ></el-input>
                </el-form-item>
                <el-form-item
                  class="label-text"
                  prop="description"
                  label="Mô tả:"
                >
                  <b-form-textarea
                    v-model="form.description"
                    placeholder="Mô tả trung tâm"
                    size="sm"
                    rows="3"
                    max-rows="6"
                  ></b-form-textarea>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if="this.active == 1">
            <h5 style="font-weight: 600">
              Bước 2 - Cung cấp hình ảnh về trung tâm của bạn
            </h5>
            <div class="vue-tempalte">
              <el-form
                label-position="top"
                label-width="100px"
                size="mini"
                v-loading="fullscreenLoading"
              >
                <el-form-item label="Chọn ảnh">
                  <el-button type="primary" @click="chooseImg()"
                    >Chọn ảnh<i class="el-icon-upload el-icon-right"></i
                  ></el-button>
                  <input
                    type="file"
                    ref="getFile"
                    accept="image/*"
                    style="display: none"
                    @change="uploadImage"
                    multiple
                  />
                </el-form-item>
                <el-form-item>
                  <div
                    class="container-img"
                    v-for="(image, key) in previewImage"
                    :key="key"
                  >
                    <div class="img-center">
                      <img class="preview" :ref="'image'" />
                    </div>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <b-button
            @click="next('form')"
            v-if="this.active == 0"
            variant="primary"
            >Tiếp tục</b-button
          >
          <b-button
            @click="registerCenter"
            v-if="this.active == 1"
            variant="primary"
            >Đăng ký</b-button
          >
          <br />
          <br />
          <p class="sign-up">
            Đã có tài khoản cho trung tâm ?
            <span class="register" @click="registerPage()">Đăng nhập ngay</span>
          </p>
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
import firebase from "firebase";
export default {
  components: {
    RegisterCenterMap,
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("Vui lòng nhập số"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("SĐT không phù hợp"));
          }
        }
      }, 100);
    };
    return {
      active: 0,
      fullscreenLoading: false,
      dialogInfo: false,
      dialogVisible: false,
       previewImage: [],
      imageUrl: "",
      form: {
        email: "",
        name: "",
        address: "",
        phone: "",
        description: "",
      },
      rules: {
        email: [
          { required: true, message: "Không được để trống", trigger: "blur" },
          {
            type: "email",
            message: "Email không phù hợp",
            trigger: ["blur", "change"],
          },
        ],
        phone: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "blur",
          },
          { validator: checkPhone, trigger: "blur" },
        ],
        address: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change",
          },
        ],
        description: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change",
          },
        ],
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

    next(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.active++;
        }
      });
    },

    chooseImg() {
      this.$refs["getFile"].click();
    },

    uploadImage(e) {
      var selectedFiles = e.target.files;
      for (let i = 0; i < selectedFiles.length; i++) {
        this.previewImage.push(selectedFiles[i]);
      }

      for (let i = 0; i < this.previewImage.length; i++) {
        let reader = new FileReader();
        reader.onload = () => {
          this.$refs.image[i].src = reader.result;
        };

        reader.readAsDataURL(this.previewImage[i]);
      }

      this.imageUrl = "";
      this.previewImage.forEach((data) => {
        const storageRef = firebase
          .storage()
          .ref(`center-img/`)
          .child(`${data.name}`)
          .put(data);

        storageRef.on(
          `state_changed`,
          (snapshot) => {
            console.log(snapshot);
          },
          (err) => {
            console.log(err);
          },
          async () => {
            await storageRef.snapshot.ref.getDownloadURL().then((url) => {
              this.imageUrl += url + ";";
            });
          }
        );
      });
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
        imageUrl: this.imageUrl,
      };

      await createCenterForm(data).then((response) => {
        if (response.status == 200) {
          this.fullscreenLoading = false;
          this.dialogInfo = true;
        } else {
          this.fullscreenLoading = false
          this.$message({
            message: "Email này đã được đăng ký",
            type: "danger",
          });
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

.content {
  color: #888;
}

.list {
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

.pac-container {
  z-index: 9999 !important;
}

.container-img {
  height: 130px;
  width: 150px;
  padding: 5px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  border: 1px solid black;
  display: inline-block;
  margin-right: 10px;
}
.img-center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: absolute;
  display: block;
}
.preview {
  max-height: 100px;
  max-width: 140px;
  display: block;
  vertical-align: middle;
}
</style>
