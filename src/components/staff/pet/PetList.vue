<template>
  <div>
    <el-main>
      <div class="row bg-title all-pet">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách Boss</h1>
        </div>
      </div>
      <div class="filter-btn">
        <b-button pill variant="primary">Tất cả</b-button>
        <b-button pill variant="warning">Chó</b-button>
        <b-button pill variant="warning">Mèo</b-button>
      </div>
      <div class="filter-dropdown">
        <b-row>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="Trạng thái:"
              label-for="input-3"
            >
              <b-form-select id="input-3" required></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group
              id="input-group-3"
              label="Màu sắc:"
              label-for="input-3"
            >
              <b-form-select id="input-3" required></b-form-select>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="input-group-3" label="Tên:" label-for="input-3">
              <b-form-select id="input-3" required></b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <div style="text-align: center">
          <b-button pill variant="info">Tìm Boss</b-button>
        </div>
      </div>
      <div v-for="pet in listPet" :key="pet.id" class="contain">
        <div
          style="width: 100%; height: 185px; overflow: hidden"
          @click="goToDetail(pet.id)"
        >
          <img :src="pet.img" width="100%" height="100%" />
        </div>
        <div class="overlay">
          <p class="name-pet" @click="goToDetail(pet.id)">{{ pet.name }}</p>
          <el-tag class="status" :type="pet.color" size="small">
            {{ pet.status }}
          </el-tag>
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
          <p class="att-pet">Tiêm phòng:</p>
          {{ pet.isVaccinated == 'True' ? "Có" : "Không"}}
        </div>
      </div>

      <el-popover
        placement="left"
        width="150"
        trigger="hover"
        content="Thêm thú cưng"
      >
        <el-button
          class="float-btn"
          slot="reference"
          type="primary"
          icon="el-icon-plus"
          circle
          @click="goToAddPet()"
        ></el-button>
      </el-popover>
    </el-main>
    <el-dialog
      title="Thêm thú cưng"
      :visible.sync="dialogVisible"
      center
    >
      <AddPet v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { petStatus } from "@/enum/pet-status-enum";
import { petGender } from '@/enum/gender-enum'
import AddPet from "./modal/AddPet";
export default {
  components: {
    AddPet
  },
  data() {
    return {
      listPet: [],
      totalPage: 0,
      dialogVisible: false,
    };
  },
  computed: {
    ...mapGetters("petInfo", ["getListPetFromStore"]),
  },

  methods: {
    ...mapActions("petInfo", ["getListPetPaging"]),

    getTableData(list) {
      this.listPet = [];
      list.forEach((data) => {
        let pet = {
          img: data.imageUrl,
          id: data.petId,
          name: data.petName,
          petAge: data.petAge,
          petFurColorName: data.petFurColorName,
          petGender: petGender.get(data.petGender),
          isVaccinated: data.isVaccinated,
          color: petStatus.get(data.petStatus).color,
          status: petStatus.get(data.petStatus).name,
        };
        this.listPet.push(pet);
      });

      console.log(this.listPet);
    },

    async getlistPet(page) {
      let data = {
        type: "",
        breed: "",
        color: "",
        status: 0,
        centerId: "3f2c6c41-e139-4bbf-873b-b085f0a25355",
        pageIndex: page,
      };
      await this.getListPetPaging(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListPetFromStore)));
    },

    goToDetail(id) {
      this.$router.push({ name: "PetDetail", params: { id } });
    },

    goToAddPet() {
      this.dialogVisible = true;
    },
  },

  created() {
    this.getlistPet(0);
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 89vh;
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
  font-size: 20px;
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