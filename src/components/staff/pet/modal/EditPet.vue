<template>
  <div>
    <el-main v-loading="loading">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Tên thú cưng">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="15">
            <el-form-item label="Tuổi">
              <el-radio-group v-model="form.age">
                <el-radio :label="1">Trẻ</el-radio>
                <el-radio :label="2">Trưởng thành</el-radio>
                <el-radio :label="3">Già</el-radio>
                <el-radio :label="4">Chưa rõ</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Giới tính:">
          <el-radio-group v-model="form.gender">
            <el-radio :label="2">Đực</el-radio>
            <el-radio :label="1">Cái</el-radio>
            <el-radio :label="3">Chưa rõ</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Màu sắc">
          <el-select v-model="form.petColorId" placeholder="Chọn màu">
            <el-option
              v-for="item in listPetColor"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Giống loài">
          <el-select v-model="form.petBreedId" placeholder="Chọn giống">
            <el-option
              v-for="item in listPetBreed"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Trạng thái:">
          <el-radio-group v-model="form.status">
            <el-radio :label="1">Đang điều trị</el-radio>
            <el-radio :label="2">Chưa nhận nuôi</el-radio>
            <el-radio :label="5">Đã chết</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-input type="textarea" v-model="form.desc"></el-input>
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
      </el-form>
      <div style="text-align: center">
        <el-button @click="editPet">Cập nhật</el-button>
      </div>
    </el-main>
  </div>
</template>
<script>
import {
  getPetBreedByTypeIdsAPI,
  getAllPetColorsAPI,
  updatePetProfile,
} from "@/api/staff/petApi";
import { emptyGuId } from "@/enum/consts";
import firebase from "firebase";
import EventBus from "@/EventBus";
export default {
  name: "EditPet",
  props: {
    pet: Object,
  },
  data() {
    return {
      form: {
        name: "",
        age: "",
        gender: "",
        petColorId: "",
        petBreedId: "",
        status: "",
        desc: "",
      },
      petTypeId: "",
      listPetColor: [],
      listPetBreed: [],
      loading: false,
      previewImage: [],
      imageUrl: "",
    };
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    async getAllPetColors() {
      this.listPetColor = [];
      await getAllPetColorsAPI()
        .then((response) => response.json())
        .then((data) =>
          data.forEach((element) => {
            let petColor = {
              id: element.petFurColorId,
              name: element.petFurColorName,
            };
            this.listPetColor.push(petColor);
          })
        );
    },

    async getPetBreedByTypeId(typeId) {
      this.listPetBreed = [];
      await getPetBreedByTypeIdsAPI(typeId)
        .then((response) => response.json())
        .then((data) =>
          data.forEach((element) => {
            let petbreed = {
              id: element.petBreedId,
              name: element.petBreedName,
            };
            this.listPetBreed.push(petbreed);
          })
        );
    },

    async editPet() {
      this.loading = true;
      if (!this.imageUrl) {
        this.pet.imageUrl.forEach((data) => {
          this.imageUrl += data + ";";
        });
      }
      let data = {
        petProfileId: this.pet.petProfileId,
        petStatus: this.form.status,
        centerId: this.getUser.centerId,
        petName: this.form.name,
        petGender: this.form.gender,
        petAge: this.form.age,
        description: this.form.desc,
        petBreedId: this.form.petBreedId,
        petFurColorId: this.form.petColorId,
        imageUrl: this.imageUrl,
        petDocumentId: this.pet.petDocumentId
          ? this.pet.petDocumentId
          : emptyGuId,
      };
      let token = this.getUser.token;
      await updatePetProfile(data, token).then((response) => {
        if (response.status == 200) {
          this.$message({
            message: "Thao tác thành công",
            type: "success",
          });
          EventBus.$emit("CloseEditDialog", false);
        } else {
          this.$message({
            message: "Đã xảy ra lỗi",
            type: "danger",
          });
        }
      });
      this.loading = false;
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

    showData() {
      this.form = {
        name: this.pet.petName,
        age: this.pet.petAgeNum,
        gender: this.pet.petGenderNum,
        petColorId: this.pet.petFurColorId,
        petBreedId: this.pet.petBreedId,
        status: this.pet.petStatusNum,
        desc: this.pet.petProfileDescription,
      };
    },
  },
  async created() {
    this.loading = true;
    await this.getPetBreedByTypeId(this.pet.petTypeId);
    await this.getAllPetColors();
    this.showData();
    this.loading = false;
  },
};
</script>
<style scoped>
.el-main {
  height: auto;
  width: 100%;
}

.filter-btn {
  text-align: center;
  margin: 15px;
}

.btn {
  margin: 0 15px;
  font-size: 20px;
  font-weight: 700;
  padding: 10px 30px;
  color: #fff;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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
