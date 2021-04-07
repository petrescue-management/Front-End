<template>
  <div>
    <el-main>
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách nhận nuôi</h1>
        </div>
      </div>
      <div class="pet-info">
        <h3>Thông Tin của Pet</h3>
        <hr />
        <b-row class="info">
          <b-col sm="4" style="display: block; margin: auto">
            <img :src="pet.imageUrl" width="80%" />
          </b-col>
          <b-col>
            <h2>{{ pet.petName }}</h2>
            <b-row class="info">
              <b-col
                >Giống: <span class="value">{{ pet.petBreedName }}</span></b-col
              >
            </b-row>
            <hr class="tag" />
            <b-row class="info">
              <b-col>
                Màu sắc: <span class="value">{{ pet.petFurColorName }}</span>
              </b-col>
            </b-row>
            <hr class="tag" />
            <b-row class="info">
              <b-col>
                Tuổi: <span class="value">{{ pet.petAge }}</span>
              </b-col>
            </b-row>
            <hr class="tag" />
            <b-row class="info">
              <b-col>
                Giới tính: <span class="value">{{ pet.petGender }}</span>
              </b-col>
            </b-row>
            <hr class="tag" />
            <b-row class="info">
            </b-row>
          </b-col>
        </b-row>
      </div>
      <div style="padding: 30px 50px;">
        <h3>Danh sách đơn nhận nuôi</h3>
        <hr />
        <el-table :data="listForm">
          <el-table-column
            prop="username"
            label="Tên người nhận nuôi"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="phone"
            label="Số điện thoại"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="address"
            label="Địa chỉ"
            width="180"
          ></el-table-column>
          <el-table-column
            prop="job"
            label="Nghề Nghiệp"
            width="180"
          ></el-table-column>
          <el-table-column label="Trạng thái" width="180">
            <template slot-scope="scope">
              <el-tag class="status" :type="scope.row.color" size="small">
                {{ scope.row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="Chi tiết" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click="goToDetail(scope.row.id)"
                >Detail</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :total="length"
          layout="prev, pager, next"
        ></el-pagination> -->
      </div>
      <br /><br /><br /><br />
    </el-main>
    <el-dialog
      title="DETAILS OF REGISTRATION FORM"
      :visible.sync="dialogVisible"
      center
    >
      <FormAdoptDetail v-bind:id="id" v-if="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { adoptionFormStatus,petGender} from "@/enum/consts";
import FormAdoptDetail from "./modal/FormAdoptDetail";
import EventBus from "@/EventBus";
export default {
  components: {
    FormAdoptDetail,
  },

  computed: {
    ...mapGetters("adoptionForm", ["getListAdoptionForm", "getPet"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      listForm: [],
      total: 0,
      dialogVisible: false,
      id: null,
      pet: {
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
    };
  },

  methods: {
    ...mapActions("adoptionForm", ["getListAdoptionFormByPetId"]),

    goToDetail(id) {
      this.dialogVisible = true;
      this.id = id;
    },

    getTableData(list) {
      this.listForm = [];
      console.log(list);
      list.forEach((data) => {
        let form = {
          id: data.adoptionRegistrationId,
          username: data.userName,
          phone: data.phone,
          address: data.address,
          email: data.email,
          job: data.job,
          status: adoptionFormStatus.get(data.adoptionRegistrationStatus).name,
          color: adoptionFormStatus.get(data.adoptionRegistrationStatus).color,
        };
        this.listForm.push(form);
      });
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
        imageUrl: petInfo.imgUrl,
      };
    },

    async getlistForm() {
      let data = {
        token: this.getUser.token,
        petId: this.$router.history.current.params.id,
      };
      await this.getListAdoptionFormByPetId(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListAdoptionForm)));
      this.getPetInfo(JSON.parse(JSON.stringify(this.getPet)));
    },
  },

  mounted() {
    EventBus.$on("CloseAdoptDialog", (visible) => {
      this.dialogVisible = visible;
      this.getlistForm();
    });
  },

  created() {
    this.getlistForm();
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
.small {
  max-width: 500px;
}

.pet-info {
  padding: 10px 50px;
}
.tag {
  border-top: 1px dashed #8c8b8b;
  margin: 5px;
}

.info {
  font-size: 18px;
}

.value {
  font-weight: 300;
}
</style>