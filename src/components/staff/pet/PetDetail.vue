<template>
  <div>
    <el-main v-loading="loading">
      <div class="row bg-title pet-detail">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Thông Tin Từng Boss</h1>
        </div>
      </div>
      <div class="pet-info">
        <b-row class="info">
          <b-col sm="4" style="display: block">
            <el-image
              style="width: 100%"
              :src="pet.imageUrl"
              :preview-src-list="listImgUrl"
            >
            </el-image>
          </b-col>
          <b-col sm="8">
            <el-tabs type="border-card">
              <el-tab-pane label="Thông tin của bé">
                <InformationPet :pet="pet" />
              </el-tab-pane>
              <el-tab-pane label="Cập nhật tình trạng">
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
              <el-tab-pane label="Người phát hiện">
                <div v-if="pet.finderForm">
                  <FinderForm
                    :pickerForm="pet.pickerForm"
                    :finderForm="pet.finderForm"
                  />
                </div>
              </el-tab-pane>
              <el-tab-pane label="Người mang về">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { petGender, petStatus } from "@/enum/consts";
import InformationPet from "./modal/InformationPet.vue";
import PetTracking from "./modal/PetTracking.vue";
import AddTracking from "./modal/AddTracking.vue";
import FinderForm from "./modal/FinderForm.vue";
import EventBus from "@/EventBus";
import PickerForm from "./modal/PickerForm.vue";
export default {
  components: {
    InformationPet,
    PetTracking,
    AddTracking,
    FinderForm,
    PickerForm,
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
      listImgUrl: [],
      loading: false,
      dialogAddTracking: false,
    };
  },

  computed: {
    ...mapGetters("petInfo", ["getPetFromStore"]),
  },

  methods: {
    ...mapActions("petInfo", ["getPetById"]),

    getPetInfo(petInfo) {
      this.pet = {
        petProfileId: petInfo.petProfileId,
        petDocumentId: petInfo.petDocumentId,
        centerId: petInfo.centerId,
        petStatus: petStatus.get(petInfo.petStatus).name,
        color: petStatus.get(petInfo.petStatus).color,
        petName: petInfo.petName,
        petGender: petGender.get(petInfo.petGender),
        petAge: petInfo.petAge,
        petBreedName: petInfo.petBreedName,
        petFurColorName: petInfo.petFurColorName,
        imageUrl: petInfo.imageUrl,
        petProfileDescription: petInfo.petProfileDescription,
        petTracking: petInfo.petTracking,
        finderForm: petInfo.finderForm,
        pickerForm: petInfo.pickerForm,
      };
      this.listImgUrl.push(petInfo.imageUrl);
      console.log(this.pet);
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
</style>