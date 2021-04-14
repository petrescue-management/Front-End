<template>
  <div v-loading="loading">
    <el-main>
      <div class="row bg-title all-pet">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách Boss</h1>
        </div>
      </div>
      <div class="filter-btn">
        <b-button
          pill
          :variant="type === 'Chó' ? 'primary' : 'warning'"
          @click="filterType('Chó')"
          >Chó</b-button
        >
        <b-button
          pill
          :variant="type === 'Mèo' ? 'primary' : 'warning'"
          @click="filterType('Mèo')"
          >Mèo</b-button
        >
      </div>
      <div class="filter-dropdown" style="padding: 20px">
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="Trạng thái:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="status"
                :options="listStatus"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="Màu sắc:"
              label-for="input-3"
            >
              <b-form-select
                id="input-3"
                v-model="color"
                :options="listPetColor"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-3" label="Giống:" label-for="input-3">
              <b-form-select
                id="input-3"
                v-model="breed"
                :options="listPetBreed"
              ></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <div style="text-align: center">
          <b-button pill variant="info" @click="filterPet()"><b-icon icon="search" aria-hidden="true"></b-icon> Tìm Boss</b-button>
          <b-button pill variant="primary" @click="goToAddPet()"> + Thêm Boss </b-button>
        </div>
      </div>
      <div v-for="pet in listPet" :key="pet.id" class="contain">
        <div class="contain-img" @click="goToDetail(pet.id)">
          <img class="pet-img" :src="pet.img" width="100%" height="100%" />
        </div>
        <div class="overlay">
          <p class="name-pet" @click="goToDetail(pet.id)">{{ pet.name }}</p>
          <hr class="tag" />
          <p class="att-pet">Giới tính :</p>
          {{ pet.petGender }}
          <br />
          <p class="att-pet">Tuổi :</p>
          {{ pet.petAge }}
          <br />
          <p class="att-pet">Màu sắc :</p>
          {{ pet.petFurColorName }}
          <br />
          <p class="att-pet">Tình trạng:</p>
          <el-tag :type="pet.color" size="small">
            {{ pet.status }}
          </el-tag>
          <br />
        </div>
      </div>
    </el-main>
    <el-dialog title="Thêm thú cưng" :visible.sync="dialogVisible" center>
      <AddPet v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { petStatus, petGender, typePet, petAge } from "@/enum/consts";
import {
  getAllPetColorsAPI,
  getAllPetTypeAPI,
  getPetBreedByTypeIdsAPI,
} from "@/api/staff/petApi";
import AddPet from "./modal/AddPet";
import EventBus from "@/EventBus";
export default {
  components: {
    AddPet,
  },
  data() {
    return {
      listPet: [],
      totalPage: 0,
      dialogVisible: false,
      loading: false,
      type: typePet.dog,
      listPetColor: [],
      listStatus: [],
      status: 0,
      color: "",
      name: "",
      breed: "",
      listPetType: [],
      listPetBreed: [],
    };
  },
  computed: {
    ...mapGetters("petInfo", ["getListPetFromStore"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("petInfo", ["getListPetPaging"]),

    filterType(type) {
      this.type = type;
      this.getPetBreedByTypeId();
      this.getlistPet(0);
    },

    filterPet() {
      this.getlistPet(0);
    },

    async getPetBreedByTypeId() {
      let typeId = this.listPetType.filter((list) => {
        return list.name == this.type;
      });
      console.log(typeId);
      this.listPetBreed = [];
      let all = {
        value: "",
        text: "Tất cả",
      };
      this.listPetBreed.push(all);
      await getPetBreedByTypeIdsAPI(typeId[0].id)
        .then((response) => response.json())
        .then((data) =>
          data.forEach((element) => {
            let petbreed = {
              value: element.petBreedName,
              text: element.petBreedName,
            };
            this.listPetBreed.push(petbreed);
          })
        );
    },

    getTableData(list) {
      this.listPet = [];
      list.forEach((data) => {
        let listImg = this.getListImg(data.imageUrl);
        let pet = {
          img: listImg[0],
          id: data.petId,
          name: data.petName,
          petAge: petAge.get(data.petAge),
          petFurColorName: data.petFurColorName,
          petGender: petGender.get(data.petGender),
          isVaccinated: data.isVaccinated,
          color: petStatus.get(data.petStatus).color,
          status: petStatus.get(data.petStatus).name,
        };
        this.listPet.push(pet);
      });
    },

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
    },

    async getlistPet(page) {
      this.loading = true;
      let data = {
        type: this.type,
        breed: this.breed,
        color: this.color,
        status: this.status,
        centerId: this.getUser.centerId,
        pageIndex: page,
      };

      await this.getListPetPaging(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListPetFromStore)));
      this.loading = false;
    },

    goToDetail(id) {
      this.$router.push({ name: "PetDetail", params: { id } });
    },

    goToAddPet() {
      this.dialogVisible = true;
    },

    getStatus() {
      petStatus.forEach((values, keys) => {
        let status = {
          value: keys,
          text: values.name,
        };
        this.listStatus.push(status);
      });
    },

    async getAllPetColors() {
      this.listPetColor = [];
      let all = {
        value: "",
        text: "Tất cả",
      };
      this.listPetColor.push(all);
      await getAllPetColorsAPI()
        .then((response) => response.json())
        .then((data) => {
          data.forEach((element) => {
            let petColor = {
              value: element.petFurColorName,
              text: element.petFurColorName,
            };
            this.listPetColor.push(petColor);
          });
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
  },

  mounted() {
    EventBus.$on("CloseAddPetDialog", (visible) => {
      this.dialogVisible = visible;
      this.getlistPet(0);
    });
  },

  async created() {
    await this.getAllPetType();
    await this.getPetBreedByTypeId();
    this.getAllPetColors();
    this.getStatus();
    this.getlistPet(0);
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 80vh;
  padding: 0;
}
.contain {
  width: 25%;
  float: left;
  position: relative;
  margin-top: -5px;
  padding: 20px 20px;
}

.overlay {
  background-color: white;
  text-align: left;
  width: 100%;
  padding: 7px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
}

.name-pet {
  margin: 0px;
  padding: 5px 0px;
  color: #222222;
  font-size: 18px;
  font-weight: 600;
  display: inline;
  transition: 0.5s;
}

.contain-img {
  width: 100%;
  height: 185px;
  overflow: hidden;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}

.name-pet:hover {
  color: #d61c62;
  cursor: pointer;
}
.att-pet {
  margin: 0px;
  color: #858585;
  font-size: 15px;
  display: inline;
}

.tag {
  width: 30%;
  margin: 0;
  border: 2px solid #5a6268;
}

.status {
  float: right;
  margin: 5px;
}

.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}

.filter-btn {
  text-align: center;
  margin: 15px;
}

.btn {
  margin: 0 15px;
  font-size: 18px;
  font-weight: 700;
  padding: 10px 30px;
  color: #fff;
}

.float-btn {
  position: fixed;
  bottom: 10%;
  right: 3%;
}

.pet-img {
  transition: 0.5s;
}

.pet-img:hover {
  width: 105%;
  height: 105%;
}
</style>