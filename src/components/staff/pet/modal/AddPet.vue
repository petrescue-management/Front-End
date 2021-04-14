<template>
  <div>
    <el-main v-loading="loading">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="Chọn loại pet"></el-step>
        <el-step title="Chọn ảnh cho pet"></el-step>
        <el-step title="Điền thông tin Pet"></el-step>
      </el-steps>
      <br />

      <el-form v-if="this.active == 0" label-width="120px">
        <el-form-item label="Chọn loại pet">
          <el-select v-model="petTypeId" placeholder="Chọn loại Pet">
            <el-option
              v-for="item in listPetType"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-top: 12px"
            :disabled="!this.petTypeId"
            v-if="this.active == 0"
            @click="next"
            >Next step</el-button
          >
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :model="form"
        v-if="this.active == 1"
        label-width="120px"
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
              <img
                class="preview el-upload-list__item-thumbnail"
                :ref="'image'"
              />
              <span class="overlay">
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(image)"
                >
                  <i class="el-icon-delete"></i>
                </span>
              </span>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-top: 12px"
            :disabled="!this.imageUrl"
            v-if="this.active == 1"
            @click="next"
            >Next step</el-button
          >
        </el-form-item>
      </el-form>

      <el-form
        ref="form"
        :model="form"
        v-if="this.active == 2"
        label-width="120px"
      >
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
            <el-radio :label="1">Đực</el-radio>
            <el-radio :label="2">Cái</el-radio>
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
            <el-radio :label="3">Đã nhận nuôi</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button v-if="this.active == 2" @click="createNewPet()"
          >Thêm Pet mới</el-button
        >
      </div>
    </el-main>
  </div>
</template>
<script>
import firebase from "firebase";
import { emptyGuId } from "@/enum/consts";
import {
  createNewPetAPI,
  getAllPetTypeAPI,
  getPetBreedByTypeIdsAPI,
  getAllPetColorsAPI,
} from "@/api/staff/petApi";
import EventBus from "@/EventBus";
export default {
  name: "AddPet",
  data() {
    return {
      disabled: false,
      active: 0,
      form: {
        name: "",
        age: "",
        weight: "",
        gender: "",
        petColorId: "",
        petBreedId: "",
        status: "",
        desc: "",
      },
      previewImage: [],
      imageUrl: "",
      listPetType: [],
      petTypeId: "",
      listPetColor: [],
      listPetBreed: [],
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
    async next() {
      this.active++;
      if (this.active == 2) {
        await this.getPetBreedByTypeId(this.petTypeId);
        await this.getAllPetColors();
      }
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

    handleRemove(file) {
      console.log(file);
    },

    async createNewPet() {
      this.loading = true;
      let data = {
        petDocumentId: emptyGuId,
        petStatus: this.form.status,
        petName: this.form.name,
        petGender: this.form.gender,
        petAge: this.form.age,
        petProfileDescription: this.form.desc,
        petBreedId: this.form.petBreedId,
        petFurColorId: this.form.petColorId,
        petImgUrl: this.imageUrl,
      };
      let token = this.getUser.token;
      await createNewPetAPI(data, token).then((response) => {
        if (response.status == 200) {
          this.$message({
            message: "Thao tác thành công",
            type: "success",
          });
          EventBus.$emit("CloseAddPetDialog", false);
        } else {
          this.$message({
            message: "Đã xảy ra lỗi",
            type: "danger",
          });
        }
      });
      this.loading = false;
    },

    async getAllPetType() {
      this.listPetType = [];
      await getAllPetTypeAPI()
        .then((response) => response.json())
        .then((data) =>
          data.forEach((element) => {
            let petType = {
              id: element.petTypeId,
              name: element.petTypeName,
            };
            this.listPetType.push(petType);
          })
        );
    },

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
  },

  async created() {
    await this.getAllPetType();
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
.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s;
  display: flex;
  justify-content: space-between;
}

.el-upload-list__item-delete {
  position: relative;
  margin: auto;
  font-size: 30px;
  color: white;
  display: none;
  right: 0;
  top: 0;
}

/* .container-img:hover .overlay {
  opacity: 1;
}

.container-img:hover .el-upload-list__item-delete {
  display: block;
} */
</style>
