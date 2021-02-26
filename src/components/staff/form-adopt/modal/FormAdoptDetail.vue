<template>
  <div>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="14">
            <el-form-item label="Họ và tên">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="Năm sinh">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Email">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SĐT">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Nghề nghiệp">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Nơi ở hiện tại">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="Địa chỉ trên là">
          <el-radio-group v-model="form.resource" style="width: 100%">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-radio label="Nhà riêng"></el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio label="Nhà trọ"></el-radio>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-radio label="Nhà người quen"></el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio label="Khác"></el-radio>
              </el-col>
            </el-row>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Bạn có thường ở nhà không?" class="long-label">
          <el-radio-group v-model="form.resource" style="width: 100%">
            <el-row :gutter="20">
              <el-col :span="10">
                <el-radio label="Chỉ về ngủ"></el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio label="Đi làm-Về nhà"></el-radio>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="10">
                <el-radio label="Thường đi vắng"></el-radio>
              </el-col>
              <el-col :span="12">
                <el-radio label="Thường xuyên ở nhà"></el-radio>
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
              <el-radio-group v-model="form.resource">
                <el-radio label="Có"></el-radio>
                <el-radio label="Không"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Độ tuổi của trẻ (nếu có)" class="long-label">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item
          label="Có bất kỳ thành viên nào trong gia đình bạn thể hiện hoặc có xu hướng bạo lực không?"
          class="label-inline"
        >
          <el-radio-group v-model="form.resource">
            <el-radio label="Có"></el-radio>
            <el-radio label="Không"></el-radio>
            <el-radio label="Khác"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Các thành viên trong gia đình có biết về quyết định nhận nuôi chó/mèo của bạn không?"
          class="label-inline"
        >
          <el-radio-group v-model="form.resource">
            <el-radio label="Có"></el-radio>
            <el-radio label="Không"></el-radio>
            <el-radio label="Khác"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="Bạn có từng hoặc đang nuôi chó/mèo không?"
          class="label-inline"
        >
          <el-radio-group v-model="form.resource">
            <el-radio label="Đã từng nuôi"></el-radio>
            <el-radio label="Đang nuôi"></el-radio>
            <el-radio label="Chưa từng nuôi"></el-radio>
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
export default {
  // props: ["id"],
  name: "FormAdoptDetail",
  data() {
    return {
      form: {
        name: "",
        phone: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
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

.button{
  text-align: center;
}
</style>