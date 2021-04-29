<template>
  <div v-loading="loading">
    <el-main>
      <div v-if="listPetWaiting.length != 0">
        <div
          v-for="pet in listPetWaiting"
          :key="pet.petId"
          class="contain"
          @click="goToListForm(pet.petId)"
        >
          <div style="box-shadow: 5px 10px:">
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
              <br/>
              <p class="att-pet">Ngày đăng ký :</p>
              {{ pet.updateAt }}
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
      <div v-else style="text-align:center;margin-top: 20px">
        <img src="@/assets/img/notfound.png" width="10%" height="auto"/>
        <h4>Không có thú cưng nào</h4>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { petGender, petAge } from "@/enum/consts";
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
      this.$router.push({ name: "WaittingDetail", params: { id } });
    },

    getTableData(list) {
      this.listPetWaiting = [];
      list.forEach((data) => {
        let pet = {
          petId: data.petId,
          count: data.count,
          petName: data.petName,
          gender: petGender.get(data.gender),
          age: petAge.get(data.age),
          breedName: data.breedName,
          imgUrl: data.imgUrl,
          updateAt: this.getDate(data.updatedAt)
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
      let data = {
        token,
        status : 3,
      }
      await this.getListPetToBeRegisted(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListPetWaiting)));
      this.loading = false;
    },


    getDate(createdDate) {
      let date = new Date(createdDate);
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      return (
        (dd > 9 ? "" : "0") +
        dd +
        "-" +
        (mm > 9 ? "" : "0") +
        mm +
        "-" +
        date.getFullYear()
      );
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
    // await this.getAllPetType();
    // await this.getPetBreedByTypeId();
    // this.getAllPetColors();
    await this.getList();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: auto;
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