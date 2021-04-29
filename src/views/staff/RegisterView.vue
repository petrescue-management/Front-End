<template>
  <div class="vertical-center">
    <div class="row" style="margin: 0; height: 90%">
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
          <p class="content">
            PetRescue cho trung tâm là trang web giúp quản lý trung tâm của bạn
            một cách dễ dàng và tiện lợi hơn. Với các chức năng chính
          </p>
          <ul class="list">
            <li>Quản lý thú cưng trong trung tâm</li>
            <li>Quản lý các tình nguyện viên</li>
            <li>Quản lý các trường hợp cứu hộ</li>
            <li>Theo dõi tình hình nhận nuôi của thú cưng</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="inner-block">
          <div v-if="this.active == 0">
            <h5 style="font-weight: 600">
              Bước 1 - Điều khoản để trở thành trung tâm
            </h5>
            <div class="vue-tempalte">
              <Policy />
              <el-checkbox v-model="check"
                >Tôi đồng ý với các điều khoản của hệ thống</el-checkbox
              >
            </div>
          </div>
          <div v-if="this.active == 2">
            <h5 style="font-weight: 600">Bước 3 - Nhập thông tin trung tâm</h5>
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
                    required
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
                  <vue-upload-multiple-image
                    @upload-success="uploadImageSuccess"
                    @before-remove="beforeRemove"
                    @edit-image="editImage"
                    :data-images="images"
                  ></vue-upload-multiple-image>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <b-button
            @click="next()"
            v-if="this.active != 2"
            :disabled="!check"
            variant="primary"
            >Tiếp tục</b-button
          >
          <b-button
            @click="registerCenter('form')"
            v-if="this.active == 2"
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
  </div>
</template>

<script>
import RegisterCenterMap from "@/components/google-map/RegisterCenterMap";
import VueUploadMultipleImage from "vue-upload-multiple-image";
import EventBus from "@/EventBus";
import { createCenterForm } from "@/api/staff/centerApi.js";
import firebase from "firebase";
import Policy from "../../components/staff/Policy";
export default {
  components: {
    RegisterCenterMap,
    VueUploadMultipleImage,
    Policy,
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
      dialogVisible: false,
      dialogConfirm: false,
      images: [],
      formdata: [],
      imageUrl: "",
      check: false,
      form: {
        email: "minh01223095445@gmail.com",
        name: "Cứu Hộ Chó Mèo Sài Gòn Time - SGT",
        address: "",
        phone: "0784445345",
        description:
          "Giải cứu các bé chó mèo :Trong hoàn cảnh cận kề với cái chết.Bị bỏ rơi vì già nua, bệnh tật.Bị lạc chủ.",
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
            trigger: ["blur", "change"],
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
            trigger: ["blur", "change"],
          },
        ],
        name: [
          {
            required: true,
            message: "Không được để trống",
            trigger: ["blur", "change"],
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

    next() {
      if (this.active === 1) {
        this.uploadToFirebase();
      }
      this.active++;
    },

    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      this.formdata = fileList;
    },

    uploadToFirebase() {
      this.imageUrl = "";
      console.log(this.formdata);
      this.formdata.forEach((data) => {
        const storageRef = firebase
          .storage()
          .ref(`center-img/`)
          .child(`${data.name}`)
          .putString(data.path, "data_url");

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

    beforeRemove(index, done, fileList) {
      console.log("index", index, fileList);
      done();
    },
    editImage(formData, index, fileList) {
      console.log("edit data", formData, index, fileList);
    },

    registerCenter(form) {
      this.$refs[form].validate(async (valid) => {
        if (valid) {
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
          console.log(data);
          await createCenterForm(data).then((response) => {
            if (response.status == 200) {
              this.fullscreenLoading = false;
              this.$alert(
                "Đăng ký thành công, hãy chờ phản hồi mail từ chúng tôi nhé",
                "Đăng ký thành công",
                {
                  confirmButtonText: "OK",
                  callback: () => {
                    this.$router.push({
                      name: "LoginStaff",
                    });
                  },
                }
              );
            } else {
              this.fullscreenLoading = false;
              this.$message({
                message: "Email này đã được đăng ký",
                type: "danger",
              });
            }
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

.inner-block {
  padding: 40px 55px 10px 55px !important;
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
