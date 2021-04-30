<template>
  <div>
    <el-main v-loading="loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-tabs type="border-card">
          <el-tab-pane label="Thông tin cơ bản">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="Họ và tên">
                  <el-input v-model="form.username" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="16">
                <el-form-item label="Email">
                  <el-input v-model="form.email" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="SĐT">
                  <el-input v-model="form.phone" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Nghề nghiệp">
              <el-input v-model="form.job" readonly></el-input>
            </el-form-item>
            <el-form-item label="Nơi ở hiện tại">
              <el-input v-model="form.address" readonly></el-input>
            </el-form-item>
            <el-form-item label="Địa chỉ trên là">
              <el-radio-group
                v-model="form.houseType"
                style="width: 100%"
                onclick="return false"
              >
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-radio :label="1">Nhà riêng</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="2">Nhà trọ</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-radio :label="3">Nhà người quen</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="4">Khác</el-radio>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="Thông tin khác">
            <el-form-item
              label="Bạn có thường ở nhà không?"
              class="label-inline"
            >
              <el-radio-group
                v-model="form.frequencyAtHome"
                style="width: 100%"
                onclick="return false"
              >
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-radio :label="1">Chỉ về ngủ</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="2">Đi làm-Về nhà</el-radio>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="10">
                    <el-radio :label="3">Thường đi vắng</el-radio>
                  </el-col>
                  <el-col :span="12">
                    <el-radio :label="4">Thường xuyên ở nhà</el-radio>
                  </el-col>
                </el-row>
              </el-radio-group>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item
                  label=" Có trẻ em ở nhà hay không ?"
                  class="label-inline"
                >
                  <el-radio-group
                    v-model="form.haveChildren"
                    onclick="return false"
                  >
                    <el-radio :label="true">Có</el-radio>
                    <el-radio :label="false">Không</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="Độ tuổi của trẻ (nếu có)" class="label-inline">
              <el-radio-group v-model="form.childAge" onclick="return false">
                <el-radio :label="1">Dưới 5 tuổi</el-radio>
                <el-radio :label="2">Dưới 10 tuổi</el-radio>
                <el-radio :label="3">Dưới 15 tuổi</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="Có bất kỳ thành viên nào trong gia đình bạn thể hiện hoặc có xu hướng bạo lực không?"
              class="label-inline"
            >
              <el-radio-group
                v-model="form.beViolentTendencies"
                onclick="return false"
              >
                <el-radio :label="true">Có</el-radio>
                <el-radio :label="false">Không</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="Các thành viên trong gia đình có biết về quyết định nhận nuôi chó/mèo của bạn không?"
              class="label-inline"
            >
              <el-radio-group
                v-model="form.haveAgreement"
                onclick="return false"
              >
                <el-radio :label="true">Có</el-radio>
                <el-radio :label="false">Không</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item
              label="Bạn có từng hoặc đang nuôi chó/mèo không?"
              class="label-inline"
            >
              <el-radio-group v-model="form.havePet" onclick="return false">
                <el-radio :label="1">Đã từng nuôi</el-radio>
                <el-radio :label="2">Đang nuôi</el-radio>
                <el-radio :label="3">Chưa từng nuôi</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <div class="button" v-if="form.adoptionRegisterStatus == 1">
        <el-button type="success" @click="changeStatus(2)"
          >Chấp thuận</el-button
        >
        <el-button type="danger" @click="showDeny(3)">Từ chối</el-button>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { changeStatusAdoptionFormAPI } from "@/api/staff/adoptionFormApi";
import UserAuthService from "@/services/UserAuthService";
import EventBus from "@/EventBus";
export default {
  props: ["id"],
  name: "FormAdoptDetail",
  data() {
    return {
      form: {
        username: null,
        phone: null,
        email: null,
        job: null,
        address: null,
        houseType: null,
        frequencyAtHome: null,
        haveChildren: null,
        childAge: null,
        beViolentTendencies: null,
        haveAgreement: null,
        havePet: null,
        adoptionRegisterStatus: null,
        insertedBy: null,
        insertedAt: null,
      },
      loading: false,
    };
  },

  computed: {
    ...mapGetters("adoptionForm", ["getAdoptionForm"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("adoptionForm", ["getListAdoptionFormById"]),

    showDeny(status) {
      this.$prompt("Lý do từ chối", "Từ chối đơn", {
        confirmButtonText: "Từ chối",
        cancelButtonText: "Cancel",
      })
        .then(async ({ value }) => {
          this.loading = true;
          let token = this.getUser.token;
          let data = {
            id: this.id,
            status,
            reason: value,
          };
          await changeStatusAdoptionFormAPI(data, token).then((response) => {
            if (response.status == 200) {
              response.json().then((data) => {
                let denyMessage = {
                  titlte: "Bạn có thông báo tình trạng đăng ký nhận nuôi",
                  body: "Xin lỗi, bạn không phù hợp với thú cưng này",
                  date: this.getDate(),
                  type: 1,
                  description: data.reason,
                };

                UserAuthService.createNoti(
                  data.reject.userId,
                  data.reject.adoptionFormId,
                  denyMessage
                )
                  .then(() => {
                    console.log("Created new item successfully!");
                  })
                  .catch((e) => {
                    console.log(e);
                  });
                EventBus.$emit("CloseAdoptDialog", false, true);
              });
              this.loading = false;
            }
          });
        })
        .catch(() => {});
    },

    getFormInfo(formInfo) {
      this.form = {
        username: formInfo.username,
        phone: formInfo.phone,
        email: formInfo.email,
        job: formInfo.job,
        address: formInfo.address,
        houseType: formInfo.houseType,
        frequencyAtHome: formInfo.frequencyAtHome,
        haveChildren: formInfo.haveChildren,
        childAge: formInfo.childAge,
        beViolentTendencies: formInfo.beViolentTendencies,
        haveAgreement: formInfo.haveAgreement,
        havePet: formInfo.havePet,
        adoptionRegisterStatus: formInfo.adoptionRegisterStatus,
        insertedBy: formInfo.insertedBy,
        insertedAt: formInfo.insertedAt,
      };
    },

    getDate() {
      let date = new Date();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      return (
        date.getFullYear() +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        (dd > 9 ? "" : "0") +
        dd +
        " " +
        (hh > 9 ? "" : "0") +
        hh +
        ":" +
        (min > 9 ? "" : "0") +
        min
      );
    },

    changeStatus(status) {
      this.$confirm("Bạn có chắc chắn muốn chấp nhận đơn đăng ký này?", {
        confirmButtonText: "Chấp nhận",
        cancelButtonText: "Đóng",
      }).then(async () => {
        this.loading = true;
        let token = this.getUser.token;
        let data = {
          id: this.id,
          status,
          reason: "test",
        };
        await changeStatusAdoptionFormAPI(data, token).then((response) => {
          if (response.status == 200) {
            response.json().then((data) => {
              let approve = data.approve;

              let approveMessage = {
                titlte: "Bạn có thông báo tình trạng đăng ký nhận nuôi",
                body: "Bạn đã được chấp thuận nhận nuôi một con thú cưng",
                date: this.getDate(),
                type: 1,
                description: null,
              };

              UserAuthService.createNoti(
                approve.userId,
                approve.adoptionFormId,
                approveMessage
              )
                .then(() => {
                  console.log("Created new item successfully!");
                })
                .catch((e) => {
                  console.log(e);
                });
            });
            this.$message({
              message: "Thú cưng đã được chuyển qua trạng thái chờ đến lấy",
              type: "success",
            });
            this.loading = false;
            EventBus.$emit("CloseAdoptDialog", false, false);
          }
        });
      });
    },
  },

  async created() {
    this.loading = true;
    let data = {
      id: this.id,
    };
    await this.getListAdoptionFormById(data);
    this.getFormInfo(JSON.parse(JSON.stringify(this.getAdoptionForm)));
    this.loading = false;
  },
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
  margin-top: 15px;
  text-align: center;
}
</style>