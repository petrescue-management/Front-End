<template>
  <div>
    <el-main v-loading="loading">
      <el-form :model="form" :rules="rules" ref="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="Email" prop="email">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="Giới Tính">
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
            <el-form-item label="First name" prop="firstname">
              <el-input v-model="form.firstname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Last name" prop="lastname">
              <el-input v-model="form.lastname" required></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="date" prop="dob">
              <el-date-picker
                v-model="form.dob"
                type="date"
                placeholder="Pick a day"
                required
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="Phone" prop="phone">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Address" prop="address">
          <el-input v-model="form.address" required></el-input>
        </el-form-item>
      </el-form>
      <div class="button">
        <el-button type="primary" @click="addVolunteer('form')">Add</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { addVolunteerToCenterAPI } from "@/api/staff/volunteerApi";
// import EventBus from "@/EventBus";
export default {
  name: "AddVolunteer",
  data() {
    

    // var checkDate = (rule, value, callback) => {
    //   let date = this.getDate(value);
    //   let today = new Date();
    //   let date =
    //     today.getFullYear() +
    //     "-" +
    //     (today.getMonth() + 1) +
    //     "-" +
    //     today.getDate();
    //   setTimeout(() => {
    //     if (!Number.isInteger(+value)) {
    //       callback(new Error("Vui lòng nhập số"));
    //     } else {
    //       if (phoneReg.test(value)) {
    //         callback();
    //       } else {
    //         callback(new Error("SĐT không phù hợp"));
    //       }
    //     }
    //   }, 100);
    // };
    return {
      form: {
        email: "",
        firstname: "",
        lastname: "",
        dob: "",
        address: "",
        gender: 2,
        phone: "",
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
        ],
      },
      loading: false,
    };
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
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

    addVolunteer(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let token = this.getUser.token;
          let data = {
            email: this.form.email,
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            dob: this.getDate(this.form.dob),
            address: this.form.address,
            gender: this.form.gender,
            phone: this.form.phone,
          };
          console.log(data);
          addVolunteerToCenterAPI(data, token).then((response) => {
            if (response.status == 200) {
              this.$message({
                message: "Thêm thành công",
                type: "success",
              });
            } else {
              this.$message({
                message: "Thêm không thành công",
                type: "danger",
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },

  async created() {},
};
</script>

<style scoped>
.el-main {
  height: auto;
  width: 100%;
}

.long-label >>> label {
  line-height: normal;
}

.label-inline >>> .el-form-item__label {
  float: none;
  text-align: left;
  width: 100% !important;
}

.button {
  text-align: center;
}
</style>