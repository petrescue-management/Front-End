<template>
  <div>
    <el-main>
      <div class="row bg-title pet-detail">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Thông Tin Từng Boss</h1>
        </div>
      </div>
      <div class="pet-info">
        <b-row class="info">
          <b-col sm="4">
            <img :src="pet.imageUrl" width="100%" />
            <div class="button">
              <el-button type="info" @click="changeStatusReceipt('approve')"
                >Chỉnh sửa thông tin</el-button
              >
            </div>
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
                Cân nặng: <span class="value">{{ pet.weight }}</span>
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
              <b-col>
                Tình trạng:
                <span
                  ><el-tag class="status" :type="'warning'">
                    Injured
                  </el-tag></span
                >
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <br />
        <h3>Thông Tin</h3>
        <hr />
        <div class="row">
          <div class="col-3">
            <div class="row">
              <div class="col-2">
                <i
                  :class="
                    pet.isVaccinated == 'True'
                      ? 'text-success fas fa-check-circle'
                      : 'text-warning fas fa-question-circle'
                  "
                ></i>
              </div>
              <div>
                <span>Tiêm phòng bệnh</span>
              </div>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <div class="col-2">
                <i
                  :class="
                    pet.isSterilized == 'True'
                      ? 'text-success fas fa-check-circle'
                      : 'text-warning fas fa-question-circle'
                  "
                ></i>
              </div>
              <div>
                <span>Tiệt trùng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { petGender } from "@/enum/gender-enum";
export default {
  data() {
    return {
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

  computed: {
    ...mapGetters("petInfo", ["getPetFromStore"]),
  },

  methods: {
    ...mapActions("petInfo", ["getPetById"]),

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
    let petId = this.$router.history.current.params.id;
    let data = {
      petId,
    };
    await this.getPetById(data);
    this.getPetInfo(this.getPetFromStore);
  },
};
</script>

<style scoped>
.el-main {
  padding: 0;
}
.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}
.pet-info {
  padding: 50px;
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

.button {
  text-align: center;
  padding-top: 20px;
}

.text-warning {
  color: #ffc107;
}

.text-success {
  color: #28a745;
}
</style>