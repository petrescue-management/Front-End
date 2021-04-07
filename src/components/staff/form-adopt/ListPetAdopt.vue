<template>
  <div>
    <el-main v-loading="loading">
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Pet đang chờ nhận nuôi</h1>
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
          <b-col style="margin: auto">
            <div style="text-align: center">
              <b-button pill variant="info" @click="filterPet()"
                >Tìm Boss</b-button
              >
            </div>
          </b-col>
        </b-row>
      </div>
      <br />
      <div>
        <div
          v-for="pet in listPetWaiting"
          :key="pet.petId"
          class="contain"
          @click="goToListForm(pet.petId)"
        >
          <div style="box-shadow: 5px 10px:">
            <el-badge :value="pet.count" class="item">
              <div
                style="
                  width: 100%;
                  height: 185px;
                  overflow: hidden;
                  border-top-left-radius: 5%;
                  border-top-right-radius: 5%;
                "
              >
                <img :src="pet.imgUrl" width="100%" height="100%" />
              </div>
            </el-badge>
            <div class="overlay">
              <p class="name-pet">{{ pet.petName }}</p>
              <hr class="tag" />
              <p class="att-pet">Giới tính :</p>
              {{ pet.gender }}
              <br />
              <p class="att-pet">Tuổi :</p>
              {{ pet.age }}
              <br />
              <p class="att-pet">Giống :</p>
              {{ pet.breedName }}
            </div>
          </div>
        </div>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  getAllPetColorsAPI,
  getAllPetTypeAPI,
  getPetBreedByTypeIdsAPI,
} from "@/api/staff/petApi";
export default {
  computed: {
    ...mapGetters("adoptionForm", ["getListPetWaiting"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      listPetWaiting: [],
      total: 0,
      dialogVisible: false,
      id: null,
      type: "Chó",
      loading: false,
      listPetColor: [],
      color: "",
      name: "",
      breed: "",
      listPetType: [],
      listPetBreed: [],
    };
  },

  methods: {
    ...mapActions("adoptionForm", ["getListPetToBeRegisted"]),

    goToListForm(id) {
      this.$router.push({ name: "ListFormAdopt", params: { id } });
    },

    getTableData(list) {
      this.listPetWaiting = [];
      list.forEach((data) => {
        let pet = {
          petId: data.petId,
          count: data.count,
          petName: data.petName,
          gender: data.gender,
          age: data.age,
          breedName: data.breedName,
          imgUrl: data.imgUrl,
        };
        this.listPetWaiting.push(pet);
      });
    },

    filterType(type) {
      this.type = type;
      this.getPetBreedByTypeId();
      this.getlistPet(0);
    },

    filterPet() {
      this.getlistPet(0);
    },

    async getList() {
      this.loading = true;
      let token = this.getUser.token;
      await this.getListPetToBeRegisted(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListPetWaiting)));
      this.loading = false;
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

  async created() {
    await this.getAllPetType();
    await this.getPetBreedByTypeId();
    this.getAllPetColors();
    await this.getList();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
  padding: 0;
}
.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
.contain {
  width: 25%;
  float: left;
  position: relative;
  margin-top: -5px;
  padding: 20px 20px;
  border-top-left-radius: 5%;
  border-top-right-radius: 5%;
}

.overlay {
  background-color: white;
  text-align: left;
  width: 100%;
  padding: 7px;
}

.name-pet {
  margin: 0px;
  padding: 5px 0px;
  color: #222222;
  font-size: 20px;
  display: inline;
  transition: 0.5s;
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
  bottom: 5%;
  right: 3%;
}
</style>