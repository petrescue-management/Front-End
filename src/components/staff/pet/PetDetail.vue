<template>
  <div v-loading="loading">
    <el-main>
      <div class="row bg-title pet-detail">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Thông Tin Từng Boss</h1>
        </div>
      </div>
      <div style="padding: 20px 0 0 20px">
        <el-button type="info" icon="el-icon-back" @click="back()" plain
          >Trở về</el-button
        >
      </div>
      <div class="pet-info">
        <b-row class="info">
          <b-col sm="4" style="display: block">
            <el-carousel height="300px">
              <el-carousel-item v-for="item in pet.imageUrl" :key="item">
                <el-image
                  style="width: 100%; height: 100%"
                  :src="item"
                  fit="fit"
                  :preview-src-list="pet.imageUrl"
                >
                </el-image>
              </el-carousel-item>
            </el-carousel>
            <div style="text-align: center; margin-top: 20px">
              <span>Tình trạng : </span>
              <span
                ><el-tag class="status" :type="pet.color">
                  {{ pet.petStatus }}
                </el-tag></span
              >
              <br /><br />
              <el-button
                type="info"
                icon="el-icon-edit"
                :disabled="pet.petStatus == 'Đã nhận nuôi' ? true : false"
                style="width: 200px"
                @click="dialogEdit = true"
                >Chỉnh sửa thông tin</el-button
              >
            </div>
          </b-col>
          <b-col sm="8">
            <el-tabs type="border-card">
              <el-tab-pane label="Thông tin của bé">
                <InformationPet :pet="pet" />
              </el-tab-pane>
              <el-tab-pane label="Theo dõi tình trạng">
                <div style="padding: 0px 10px 20px">
                  <el-button
                    type="primary"
                    icon="el-icon-document-add"
                    @click="dialogAddTracking = true"
                    :disabled="pet.petStatus == 'Đã nhận nuôi' ? true : false"
                    >Cập nhật thêm</el-button
                  >
                </div>
                <div v-if="pet.petTracking">
                  <PetTracking :petTracking="pet.petTracking" />
                </div>
              </el-tab-pane>
              <el-tab-pane label="Người phát hiện" v-if="pet.finderForm">
                <div v-if="pet.finderForm">
                  <FinderForm
                    :finderForm="pet.finderForm"
                    :petAttribute="pet.petAttribute"
                    :location ="pet.location"
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane label="Người mang về" v-if="pet.pickerForm">
                <div v-if="pet.pickerForm">
                  <PickerForm :pickerForm="pet.pickerForm" />
                </div>
              </el-tab-pane>
            </el-tabs>
          </b-col>
        </b-row>
      </div>
    </el-main>
    <el-dialog
      title="Cập nhật tình trạng"
      :visible.sync="dialogAddTracking"
      center
    >
      <AddTracking :petProfileId="pet.petProfileId" v-if="dialogAddTracking" />
    </el-dialog>

    <el-dialog title="Chỉnh sửa thông tin" :visible.sync="dialogEdit" center>
      <EditPet :pet="pet" v-if="dialogEdit" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  petGender,
  petStatus,
  petAge,
  petAttributeStatus,
} from "@/enum/consts";
import InformationPet from "./modal/InformationPet.vue";
import PetTracking from "./modal/PetTracking.vue";
import AddTracking from "./modal/AddTracking.vue";
import FinderForm from "./modal/FinderForm.vue";
import EventBus from "@/EventBus";
import PickerForm from "./modal/PickerForm.vue";
import EditPet from "./modal/EditPet.vue";
export default {
  components: {
    InformationPet,
    PetTracking,
    AddTracking,
    FinderForm,
    PickerForm,
    EditPet,
  },
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
        petBreedName: null,
        petFurColorName: null,
        imageUrl: null,
        petProfileDescription: null,
        petTracking: null,
        finderForm: null,
        pickerForm: null,
      },
      loading: false,
      dialogAddTracking: false,
      dialogEdit: false,
    };
  },

  computed: {
    ...mapGetters("petInfo", ["getPetFromStore"]),
  },

  methods: {
    ...mapActions("petInfo", ["getPetById"]),

    back() {
      this.$router.push({ name: "PetList" });
    },

    async getPetInfo(petInfo) {
      this.pet = {
        petProfileId: petInfo.petProfileId,
        petDocumentId: petInfo.petDocumentId,
        centerId: petInfo.centerId,
        petStatus: petStatus.get(petInfo.petStatus).name,
        petStatusNum: petInfo.petStatus,
        color: petStatus.get(petInfo.petStatus).color,
        petName: petInfo.petName,
        petGender: petGender.get(petInfo.petGender),
        petGenderNum: petInfo.petGender,
        petTypeId: petInfo.petTypeId,
        petAge: petAge.get(petInfo.petAge),
        petAgeNum: petInfo.petAge,
        petBreedName: petInfo.petBreedName,
        petBreedId: petInfo.petBreedId,
        petFurColorName: petInfo.petFurColorName,
        petFurColorId: petInfo.petFurColorId,
        imageUrl: this.getListImg(petInfo.imageUrl),
        petProfileDescription: petInfo.petProfileDescription,
        petAttribute: petAttributeStatus.get(petInfo.petAttribute),
        petTracking: petInfo.petTracking,
        finderForm: petInfo.finderForm,
        pickerForm: petInfo.pickerForm,
        location : petInfo.location
      };
    },

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
    },

    

    async getData() {
      this.loading = true;
      let petId = this.$router.history.current.params.id;
      let data = {
        petId,
      };
      await this.getPetById(data);
      this.getPetInfo(this.getPetFromStore);

      this.loading = false;
    },
  },

  mounted() {
    EventBus.$on("CloseAddTrackingDialog", (visible) => {
      this.dialogAddTracking = visible;
      this.getData();
    });

     EventBus.$on("CloseEditDialog", (visible) => {
      this.dialogEdit = visible;
      this.getData();
    });
  },

  async created() {
    await this.getData();
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
  padding: 10px 50px 50px 50px;
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

.el-image >>> img {
  max-height: 300px;
}
</style>