<template>
  <el-form ref="form" :model="form" label-width="120px" v-loading="loading">
    <el-form-item label="Cân nặng ">
      <el-input-number
        v-model="form.weight"
        controls-position="right"
        :precision="1"
        :step="0.1"
        :min="0"
        :max="10"
        size="small"
        ><template slot="append">.kg</template></el-input-number
      >
    </el-form-item>
    <el-form-item label="Tiêm Vacxin">
      <el-radio-group v-model="form.isVaccinated">
        <el-radio :label="true">Có</el-radio>
        <el-radio :label="false">Không</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Triệt sản">
      <el-radio-group v-model="form.isSterilized">
        <el-radio :label="true">Có</el-radio>
        <el-radio :label="false">Không</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Mô tả: ">
      <el-input v-model="form.description" type="textarea"></el-input>
    </el-form-item>
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
    <div style="text-align: center">
      <el-button type="primary" @click="createNewPetTracking()"
        >Cập nhật</el-button
      >
    </div>
  </el-form>
</template>

<script>
import firebase from "firebase";
import { createPetTracking } from "@/api/staff/petApi";
import EventBus from "@/EventBus";
export default {
  props: ["petProfileId"],
  data() {
    return {
      form: {
        weight: 1,
        isVaccinated: false,
        isSterilized: false,
        description: null,
      },
      previewImage: [],
      imageUrl: "",
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
          .ref(`pet-tracking/`)
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

    async createNewPetTracking() {
      this.loading = true;
      let data = {
        petProfileId: this.petProfileId,
        isVaccinated: this.form.isVaccinated,
        isSterilized: this.form.isSterilized,
        imageUrl: this.imageUrl,
        description: this.form.description,
        weight: this.form.weight,
      };
      await createPetTracking(data, this.getUser.token).then((response) => {
        if (response.status == 200) {
          this.$message({
            message: "Thao tác thành công",
            type: "success",
          });
          this.loading = false;
          EventBus.$emit("CloseAddTrackingDialog", false);
        } else {
          this.$message({
            message: "Đã có lỗi xảy ra",
            type: "danger",
          });
        }
      });
    },
  },
};
</script>

<style scoped>
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