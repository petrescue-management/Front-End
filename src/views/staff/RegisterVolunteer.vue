<template>
  <div class="vertical-center">
    <div class="row" style="margin: 0">
      <div class="col-md-6">
        <div class="info">
          <img
            src="@/assets/img/Logo_notitle_circle.png"
            width="120px"
            height="120px"
            style="
              display: block;
              margin-left: auto;
              margin-right: auto;
              margin-bottom: 20px;
            "
          />
          <h3>Pet Rescue</h3>
          <h3>Đăng ký làm Tình Nguyện Viên</h3>
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
          <p class="content">
            By signing up for and by signing in to this service you accept our:
          </p>
          <ul class="list">
            <li>Privacy policy</li>
            <li>GitLab.com Terms.</li>
          </ul>
        </div>
      </div>
      <div class="col-md-6">
        <div class="inner-block">
          <div v-if="this.active == 0">
            <h4>Bước 1 - Nhập thông tin cá nhân</h4>
            <div class="vue-tempalte">
              <el-form
                label-position="top"
                label-width="100px"
                size="mini"
                :model="form"
                :rules="rules"
                ref="form"
                v-loading="loading"
              >
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      class="label-text"
                      label="First name"
                      prop="firstname"
                    >
                      <el-input v-model="form.firstname"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      class="label-text"
                      label="Last name"
                      prop="lastname"
                    >
                      <el-input v-model="form.lastname" required></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item class="label-text" label="Email" prop="email">
                      <el-input v-model="form.email"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col>
                    <el-form-item class="label-text" label="Giới Tính">
                      <el-radio-group v-model="form.gender">
                        <el-radio :label="2">Nam</el-radio>
                        <el-radio :label="1">Nữ</el-radio>
                        <el-radio :label="3">Khác</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item
                      class="label-text"
                      label="Ngày sinh"
                      prop="dob"
                    >
                      <el-date-picker
                        v-model="form.dob"
                        type="date"
                        placeholder="Pick a day"
                        required
                      >
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item class="label-text" label="Phone" prop="phone">
                      <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <div v-if="this.active == 1">
            <h4>Bước 2 - Chọn trung tâm bạn muốn tham gia</h4>
            <div class="vue-tempalte">
              <el-form
                label-position="top"
                label-width="100px"
                v-loading="loading"
              >
                <div class="form-search">
                  <div class="input-group1">
                    <el-form-item class="label-text" label="Chọn Center">
                      <el-input v-model="center" @input="showList()">
                        <el-button
                          slot="append"
                          icon="el-icon-search"
                        ></el-button>
                      </el-input>
                    </el-form-item>
                  </div>
                  <div v-show="isShowList" class="now-idea-searching">
                    <div class="now-list-restaurant-row">
                      <div
                        v-for="center in listCenterFilter"
                        :key="center.id"
                        class="item-restaurant"
                        @click="chooseCenter(center.id,center.name)"
                      >
                        <a class="item-content"
                          ><div class="img-restaurant">
                            <img :src="center.img" />
                          </div>
                          <div class="info-restaurant">
                            <div class="name-res">
                              {{ center.name }}
                            </div>
                            <div class="address-res">
                              {{ center.address }}
                            </div>
                          </div>
                          <div class="opentime-status">
                            <span
                              class="stt offline"
                              title="Mở cửa"
                              style="
                                color: rgb(35, 152, 57);
                                background-color: rgb(35, 152, 57);
                              "
                            ></span></div
                        ></a>
                      </div>
                    </div>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
          <b-button
            @click="next('form')"
            v-if="this.active == 0"
            variant="primary"
            >Countinue</b-button
          >
          <b-button @click="register()" v-if="this.active == 1" variant="primary"
            >Register</b-button
          >
        </div>
      </div>
    </div>
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
import { mapGetters, mapActions } from "vuex";
import {createVolunteerRegisterFormAPI} from '@/api/staff/volunteerApi'
export default {
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
      loading: false,
      dialogInfo: false,
      dialogVisible: false,
      form: {
        email: "vqm2108@gmail.com",
        firstname: "minh",
        lastname: "vo",
        dob: "",
        gender: 2,
        phone: "0784445345",
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
        firstname: [
          { required: true, message: "Không được để trống", trigger: "blur" },
        ],
        lastname: [
          { required: true, message: "Không được để trống", trigger: "blur" },
        ],
        dob: [
          {
            type: "date",
            required: true,
            message: "Không được để trống",
            trigger: "change",
          },
        ],
        address: [
          {
            required: true,
            message: "Không được để trống",
            trigger: "change",
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
      },
      center: "",
      centerId: "",
      active: 0,
      isShowList: false,
      listCenter: [],
      listCenterFilter: [],
    };
  },

  computed:{
    ...mapGetters("center", ["getListCenter"]),
  },

  methods: {
    ...mapActions("center", ["getCenterOpening"]),

    next(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.getList()
          this.active++;
        }
      });
    },

    showList() {
      if (this.center) {
        this.listCenterFilter = this.listCenter.filter((center) => {
          return center.name.toUpperCase().includes(this.center.toUpperCase());
        });
        this.isShowList = true;
      } else {
        this.isShowList = false;
      }
    },

    getTableData(list) {
      this.listCenter = [];
      list.forEach((data) => {
        let center = {
          id: data.centerId,
          name: data.centerName,
          img: data.imageUrl,
          address: data.address,
        };
        this.listCenter.push(center);
      });
    },

    async getList() {
      this.loading = true;
      await this.getCenterOpening(1);
      this.getTableData(JSON.parse(JSON.stringify(this.getListCenter)));
      this.loading = false;
    },

    getDate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return (
        date.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd
      );
    },

    chooseCenter(id,center){
      this.isShowList = false;
      this.center = center;
      this.centerId = id
    },

    async register(){
      this.loading = true;
      let data = {
        firstName: this.form.firstname,
        lastName: this.form.lastname,
        phone: this.form.phone,
        dob: this.getDate(this.form.dob),
        gender: this.form.gender,
        email: this.form.email,
        centerId: this.centerId,
      }

      console.log(data);
      await createVolunteerRegisterFormAPI(data).then((response) => {
        if(response.status == 200){
          this.$message({
            message: "Đăng ký thành công",
            type: "success",
          });
        }else{
          this.$message({
            message: "Email này đã được đăng ký",
            type: "danger",
          });
        }
      })
      this.loading = false;
    }
    
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
</style>
