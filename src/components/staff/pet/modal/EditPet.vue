<template>
  <div>
    <el-main>
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="Chọn ảnh">
          <img :src="previewImage" class="uploading-image" width="150px" />
          <input type="file" accept="image/*" @change="uploadImage" />
        </el-form-item>

        <el-form-item label="Tên thú cưng">
          <el-input v-model="form.petname"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="Tuổi">
              <el-input type="number" v-model="form.petAge"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="Cân nặng">
              <el-input type="number" v-model="form.weight"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="Giới thiệu:">
          <el-radio-group v-model="form.petGender">
            <el-radio :label="1">Đực</el-radio>
            <el-radio :label="2">Cái</el-radio>
            <el-radio :label="3">Chưa rõ</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Màu sắc">
          <el-select v-model="form.petFurColorName" placeholder="Chọn màu">
            <el-option
              v-for="item in listPetColor"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Giống loài">
          <el-select v-model="form.petBreedName" placeholder="Chọn giống">
            <el-option
              v-for="item in listPetBreed"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Trạng thái:">
          <el-radio-group v-model="form.petStatus">
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
        <el-button @click="onUploadImg()">Thêm Pet mới</el-button>
      </div>
    </el-main>
  </div>
</template>
<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import {
  createNewPetApi,
  getAllPetTypeApi,
  getPetBreedByTypeIdsApi,
  getAllPetColorsApi,
} from "@/api/staff/petApi";
export default {
  name: "AddPet",
  props: {
    petId: String,
  },
  data() {
    return {
      form: {
        petId: null,
        centerId: null,
        petStatus: null,
        petName: null,
        petTypeName: null,
        petGender: null,
        petAge: null,
        weight: null,
        isVaccinated: null,
        isSterilized: null,
        petBreedName: null,
        petFurColorName: null,
        imageUrl: null,
        desc: null,
      },
      previewImage: null,
      fileUploadToFirebase: null,
      petTypeId: "",
      listPetColor: [],
      listPetBreed: [],
    };
  },

  computed: {
    ...mapGetters("petInfo", ["getPetFromStore"]),
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("petInfo", ["getPetById"]),
    async getAllPetColors() {
      this.listPetColor = [];
      await getAllPetColorsApi()
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
      await getPetBreedByTypeIdsApi(typeId)
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

    async getPet(petId) {
      let data = {
        petId,
      };
      await this.getPetById(data);
      this.getPetInfo(JSON.parse(JSON.stringify(this.getPetFromStore)));
    },

    getPetInfo(petInfo) {
      this.pet = {
        petId: petInfo.petId,
        centerId: petInfo.centerId,
        petStatus: petInfo.petStatus,
        petName: petInfo.petName,
        petTypeName: petInfo.petTypeName,
        petGender: petGender.get(petInfo.petGender),
        petAge: petInfo.petAge,
        weight: petInfo.weight,
        isVaccinated: petInfo.isVaccinated,
        isSterilized: petInfo.isSterilized,
        petBreedName: petInfo.petBreedName,
        petFurColorName: petInfo.petFurColorName,
        imageUrl: petInfo.imageUrl,
      };
    },
  },
  async created() {
    await this.getPet(petId);
    await this.getPetBreedByTypeId(this.petTypeId);
		await this.getAllPetColors();
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
