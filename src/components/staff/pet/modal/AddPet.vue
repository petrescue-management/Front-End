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
            type="primary"
            v-if="this.active == 0"
            @click="next"
            >Tiếp theo</el-button
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
          <vue-upload-multiple-image
            @upload-success="uploadImageSuccess"
            @before-remove="beforeRemove"
            @edit-image="editImage"
            :data-images="formdata"
          ></vue-upload-multiple-image>
        </el-form-item>
        <el-form-item>
          <el-button @click="back" style="margin-top: 12px">Trở lại</el-button>
          <el-button
            style="margin-top: 12px"
            type="primary"
            :disabled="this.formdata.length == 0"
            v-if="this.active == 1"
            @click="next"
            >Tiếp theo</el-button
          >
        </el-form-item>
      </el-form>

      <el-form
        :model="form"
        :rules="rules"
        ref="formAdd"
        v-if="this.active == 2"
        label-width="120px"
      >
        <el-form-item prop="name" label="Tên thú cưng">
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
        <el-form-item prop="petColorId" label="Màu sắc">
          <el-select v-model="form.petColorId" placeholder="Chọn màu">
            <el-option
              v-for="item in listPetColor"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="petBreedId" label="Giống loài">
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
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="desc" label="Mô tả">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center" v-if="this.active == 2">
        <el-button @click="back">Trở lại</el-button>
        <el-button type="primary" @click="createNewPet('formAdd')"
          >Thêm Pet mới</el-button
        >
      </div>
    </el-main>
  </div>
</template>
<script>
import firebase from "firebase";
import VueUploadMultipleImage from "vue-upload-multiple-image";
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
  components: {
    VueUploadMultipleImage,
  },
  data() {
    return {
      disabled: false,
      active: 0,
      form: {
        name: "",
        age: 1,
        gender: 1,
        petColorId: "",
        petBreedId: "",
        status: 1,
        desc: "",
      },
      rules: {
        name: [
            { required: true, message: 'Please input Activity name', trigger: 'blur' },
            { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
          ],
        petColorId: [
          {
            required: true,
            message: "Hãy chọn màu",
            trigger: "change",
          },
        ],
        petBreedId: [
          {
            required: true,
            message: "Hãy chọn giống",
            trigger: "change",
          },
        ],
        desc: [
            { required: true, message: 'Please input activity form', trigger: 'blur' }
          ]
      },
      previewImage: [],
      images: [],
      formdata: [],
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
    back() {
      this.active--;
    },

    async next() {
      this.active++;
      if (this.active == 2) {
        this.loading = true;
        this.uploadToFirebase();
        await this.getPetBreedByTypeId(this.petTypeId);
        await this.getAllPetColors();
        this.loading = false;
      }
    },

    uploadImageSuccess(formData, index, fileList) {
      console.log("data", formData, index, fileList);
      this.formdata = fileList;
    },

    uploadToFirebase() {
      this.imageUrl = "";
      this.formdata.forEach((data) => {
        const storageRef = firebase
          .storage()
          .ref(`pet-img/`)
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

    createNewPet(formAdd) {
      this.$refs[formAdd].validate(async (valid) => {
        if (valid) {
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
        }
      });
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
    this.loading = true;
    await this.getAllPetType();
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
