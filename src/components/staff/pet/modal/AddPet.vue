<template>
  <div>
    <el-main>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="Chọn loại pet"></el-step>
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
          <img :src="previewImage" class="uploading-image" width="150px" />
          <input type="file" accept="image/*" @change="uploadImage" />
        </el-form-item>

        <el-form-item label="Tên thú cưng">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Tuổi">
              <el-input type="number" v-model="form.age"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Cân nặng">
              <el-input type="number" v-model="form.weight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Giới thiệu:">
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
        <el-form-item label="Tiêm phòng:">
          <el-radio-group v-model="form.isVaccinated">
            <el-radio :label="true">Có</el-radio>
            <el-radio :label="false">Không</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Tiệt trùng:">
          <el-radio-group v-model="form.isSterilized">
            <el-radio :label="true">Có</el-radio>
            <el-radio :label="false">Không</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Mô tả">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button v-if="this.active == 1" @click="onUploadImg()"
          >Thêm Pet mới</el-button
        >
      </div>
    </el-main>
  </div>
</template>
<script>
import firebase from "firebase";
import {
  createNewPetAPI,
  getAllPetTypeAPI,
  getPetBreedByTypeIdsAPI,
  getAllPetColorsAPI,
} from "@/api/staff/petApi";
export default {
  name: "AddPet",
  data() {
    return {
      active: 0,
      form: {
        name: "",
        age: "",
        weight: "",
        gender: "",
        petColorId: "",
        petBreedId: "",
        status: "",
        isVaccinated: true,
        isSterilized: true,
        desc: "",
      },
      previewImage: null,
      fileUploadToFirebase: null,
      listPetType: [],
      petTypeId: "",
      listPetColor: [],
      listPetBreed: [],
    };
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    async next() {
      this.active++;
      if (this.active == 1) {
        await this.getPetBreedByTypeId(this.petTypeId);
        await this.getAllPetColors();
      }
    },

    uploadImage(e) {
      this.fileUploadToFirebase = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.fileUploadToFirebase);
      reader.onload = (e) => {
        this.previewImage = e.target.result;
      };
    },

    onUploadImg() {
      const storageRef = firebase
        .storage()
        .ref(`pet-img/`)
        .child(`${this.fileUploadToFirebase.name}`)
        .put(this.fileUploadToFirebase);

      storageRef.on(
        `state_changed`,
        (snapshot) => {
          console.log(snapshot);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          storageRef.snapshot.ref.getDownloadURL().then((url) => {
            this.createNewPet(url);
          });
        }
      );
    },

    async createNewPet(imgUrl) {
      let data = {
        petStatus: this.form.status,
        centerId: "4bed700a-e24a-4410-9b39-503e780dc8a6",
        petName: this.form.name,
        petGender: this.form.gender,
        petAge: this.form.age,
        weight: this.form.weight,
        description: this.form.desc,
        petBreedId: this.form.petBreedId,
        petFurColorId: this.form.petColorId,
        isVaccinated: this.form.isVaccinated,
        isSterilized: this.form.isSterilized,
        imageUrl: imgUrl,
      };
      let token = this.getUser.token;
      await createNewPetAPI(data,token).then((response) => console.log(response));
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
</style>
