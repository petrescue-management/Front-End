<template>
  <div>
    <el-main v-loading="loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form-item label="Họ và tên">
              <el-input v-model="form.username" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
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
          <el-radio-group v-model="form.houseType" style="width: 100%" onclick="return false">
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
        <el-form-item label="Bạn có thường ở nhà không?" class="long-label">
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
              class="long-label"
            >
              <el-radio-group v-model="form.haveChildren" onclick="return false">
                <el-radio :label="true">Có</el-radio>
                <el-radio :label="false">Không</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Độ tuổi của trẻ (nếu có)" class="long-label">
              <el-input v-model="form.childAge" readonly></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="Có bất kỳ thành viên nào trong gia đình bạn thể hiện hoặc có xu hướng bạo lực không?"
          class="label-inline"
        >
          <el-radio-group v-model="form.beViolentTendencies" onclick="return false">
            <el-radio :label="true">Có</el-radio>
            <el-radio :label="false">Không</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Các thành viên trong gia đình có biết về quyết định nhận nuôi chó/mèo của bạn không?"
          class="label-inline"
        >
          <el-radio-group v-model="form.haveAgreement" onclick="return false">
            <el-radio :label="true">Có</el-radio>
            <el-radio :label="false">Không</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Bạn có từng hoặc đang nuôi chó/mèo không?"
          class="label-inline"
        >
          <el-radio-group v-model="form.havePet" onclick="return false">
            <el-radio :label="1" >Đã từng nuôi</el-radio>
            <el-radio :label="2" >Đang nuôi</el-radio>
            <el-radio :label="3" >Chưa từng nuôi</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
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
// import { adoptionFormStatus } from '@/enum/adoption-form-status'
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
      },
      loading : false
    };
  },

  computed: {
    ...mapGetters("adoptionForm", ["getAdoptionForm"]),
  },

  methods: {
    ...mapActions("adoptionForm", ["getListAdoptionFormById"]),

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
      };
    },
  },

  async created() {
    this.loading = true
    let data = {
      id: this.id,
    };
    await this.getListAdoptionFormById(data);
    this.getFormInfo(JSON.parse(JSON.stringify(this.getAdoptionForm)));
    this.loading = false
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
  text-align: center;
}
</style>