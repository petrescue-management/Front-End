<template>
  <div>
    <el-main v-loading="loading">
      <b-card
          header="Thông tin cứu hộ"
          header-tag="header"
        >
      <el-tabs tab-position="left">
        <el-tab-pane label="Người phát hiện">
          <div v-if="doc.finderForm">
            <FinderForm :finderForm="doc.finderForm" :location ="doc.location" :petAttribute="doc.petAttribute" />
          </div>
        </el-tab-pane>
        <el-tab-pane label="Người đi lấy">
          <div v-if="doc.pickerForm">
            <PickerForm :pickerForm="doc.pickerForm" />
          </div>
        </el-tab-pane>
      </el-tabs>
      </b-card>

      <div style="margin-top: 35px">
        <b-card
          header="Cập nhật thú cưng"
          header-tag="header"
          v-show="this.getStatus == 1 ? true : false"
        >
          <div>
            <div style="padding: 0px 10px 20px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                @click="goToAddPet()"
                >Thêm thú cưng</el-button
              >
            </div>
            <el-table :data="listPet" v-loading="loading">
              <el-table-column label="Ảnh">
                <template slot-scope="scope">
                  <el-image
                    style="width: 80%"
                    :src="scope.row.petImgUrl"
                    fit="fit"
                    :preview-src-list="scope.row.listImg"
                  >
                  </el-image>
                </template>
              </el-table-column>
              <el-table-column label="Tên" prop="petName"></el-table-column>
              <el-table-column label="Tuổi" prop="petAgeName"></el-table-column>
              <el-table-column
                label="Giới tính"
                prop="petGenderName"
              ></el-table-column>
              <el-table-column label="Trạng thái">
                <template slot-scope="scope">
                  <el-tag class="status" :type="scope.row.color" size="small">
                    {{ scope.row.status }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column fixed="right" label="Xoá">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    type="danger"
                    icon="el-icon-delete"
                    @click="removePet(scope.row.id)"
                  ></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </b-card>

        <b-card
          header="Danh sách thú cưng"
          header-tag="header"
          v-show="this.getStatus != 1 ? true : false"
        >
          <div>
            <div v-for="pet in listPet" :key="pet.id" class="contain">
              <div class="contain-img" @click="goToDetail(pet.id)">
                <img
                  class="pet-img"
                  :src="pet.img"
                  width="100%"
                  height="100%"
                />
              </div>
              <div class="overlay">
                <p class="name-pet" @click="goToDetail(pet.id)">
                  {{ pet.name }}
                </p>
                <hr class="tag" />
                <p class="att-pet">Giới tính :</p>
                {{ pet.petGender }}
                <br />
                <p class="att-pet">Tuổi :</p>
                {{ pet.petAge }}
                <br />
                <p class="att-pet">Màu sắc :</p>
                {{ pet.petFurColorName }}
                <br/>
                <p class="att-pet">Tình trạng:</p>
                <el-tag :type="pet.color" size="small">
                  {{ pet.status }}
                </el-tag>
                <br />
              </div>
            </div>
          </div>
        </b-card>

        <div style="padding: 20px 0; text-align: center">
          <el-button
            type="success"
            :disabled="this.getStatus != 1 ? true : false"
            @click="updatePetDocument()"
            >{{
              this.getStatus != 1 ? "Đã cập nhật" : "Đóng yêu cầu"
            }}</el-button
          >
        </div>
      </div>
    </el-main>
    <el-dialog title="Thêm thú cưng" :visible.sync="dialogVisible" center>
      <AddPetFromDocument :petDocumentId="petDocumentId" :img="doc.listImg" v-show="dialogVisible" />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { petStatus, petGender, petAge,petAttributeStatus } from "@/enum/consts";
import { updatePetDocumentAPI } from "@/api/staff/reportRescueApi";
import FinderForm from "../pet/modal/FinderForm.vue";
import PickerForm from "../pet/modal/PickerForm.vue";
import AddPetFromDocument from "./modal/AddPetFromDocument.vue";
import CenterService from "../../../services/CenterService";
import EventBus from "@/EventBus";
export default {
  components: {
    FinderForm,
    PickerForm,
    AddPetFromDocument,
  },
  data() {
    return {
      doc: {
        finderForm: null,
        pickerForm: null,
        petDocumentStatus: 0,
      },
      loading: false,
      dialogVisible: false,
      petDocumentId: this.$router.history.current.params.id,
      listPet: [],
    };
  },

  computed: {
    ...mapGetters("rescueReport", ["getDoc", "getPet"]),

    getStatus() {
      return this.doc.petDocumentStatus;
    },

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("rescueReport", [
      "getPetDocumentById",
      "getListPetByPetDocumentId",
    ]),

    goToAddPet() {
      this.dialogVisible = true;
    },

    removePet(id) {
      this.$confirm("Bạn có chắc chắn muốn xoá ?", {
        confirmButtonText: "Xoá",
        cancelButtonText: "Huỷ",
      })
        .then(() => {
          CenterService.deletePetProfile(
            this.getUser.centerId,
            this.petDocumentId,
            id
          )
            .then(() => {
              console.log("Delete successfully!");
              this.$message({
                type: "success",
                message: "Thao tác thành công",
              });
            })
            .catch((e) => {
              console.log(e);
            });
        })
        .catch(() => {});
    },

    onDataChange(items) {
      let _pet = [];
      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        let listImg = this.getListImg(data.petImgUrl);
        _pet.push({
          id: key,
          petName: data.petName,
          petGenderName: petGender.get(data.petGender),
          petGender: data.petGender,
          petAgeName: petAge.get(data.petAge),
          petAge: data.petAge,
          petBreedId: data.petBreedId,
          petFurColorId: data.petFurColorId,
          petImgUrl: listImg[0],
          listImg: listImg,
          petStatus: data.petStatus,
          status: petStatus.get(data.petStatus).name,
          color: petStatus.get(data.petStatus).color,
          petProfileDescription: data.petProfileDescription,
        });
      });
      this.listPet = _pet;
    },

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
    },

    updatePetDocument() {
      let pets = [];
      this.listPet.forEach((item) => {
        let img = "";
        item.listImg.forEach((element) => {
          img += element + ";";
        });
        let pet = {
          petDocumentId: this.petDocumentId,
          petName: item.petName,
          petGender: item.petGender,
          petAge: item.petAge,
          petFurColorId: item.petFurColorId,
          petImgUrl: img,
          petBreedId: item.petBreedId,
          petStatus: item.petStatus,
          petProfileDescription: item.petProfileDescription,
        };
        pets.push(pet);
      });
      let data = {
        petDocumentId: this.petDocumentId,
        petDocumentStatus: 2,
        pets,
      };
      this.$confirm("Bạn có chắc chắn muốn hoàn thành ?", {
        confirmButtonText: "Thêm",
        cancelButtonText: "Huỷ",
      })
        .then(async () => {
          this.loading = true;
          await updatePetDocumentAPI(data, this.getUser.token).then(
            (response) => {
              if (response.status == 200) {
                this.loading = false;
                CenterService.deleteListPetProfile(
                  this.getUser.centerId,
                  this.petDocumentId
                )
                  .then(async () => {
                    console.log("Delete successfully!");
                    this.$message({
                      type: "success",
                      message: "Thao tác thành công",
                    });
                    await this.getData();
                    await this.getPetData();
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            }
          );
        })
        .catch(() => {});
    },

    getDocInfo(info) {
      console.log(info);
      this.doc = {
        petDocumentStatus: info.petDocumentStatus,
        finderForm: info.finderForm,
        pickerForm: info.pickerForm,
        location:info.location,
        petAttribute: petAttributeStatus.get(1),
        listImg: info.finderForm.finderImageUrl + info.pickerForm.pickerImageUrl
      };
      console.log(this.doc);
    },

    async getData() {
      this.loading = true;
      let data = {
        petDocumentId: this.petDocumentId,
        token: this.getUser.token,
      };
      await this.getPetDocumentById(data);
      this.getDocInfo(this.getDoc);

      this.loading = false;
    },

    async getPetData() {
      if (this.getStatus != 1) {
        this.loading = true;
        await this.getListPetByPetDocumentId(this.petDocumentId);
        this.getPetInfo(this.getPet);

        this.loading = false;
      }
    },

    goToDetail(id) {
      this.$router.push({ name: "PetDetail", params: { id } });
    },

     getPetInfo(list) {
       this.listPet = [];
      list.forEach((data) => {
        let listImg = this.getListImg(data.petImgUrl)
        let pet = {
          img: listImg[0],
          id: data.petProfileId,
          name: data.petName,
          petAge: petAge.get(data.petAge),
          petFurColorName: data.petFurColorName,
          petGender: petGender.get(data.petGender),
          color: petStatus.get(data.petStatus).color,
          status: petStatus.get(data.petStatus).name,
        };
        this.listPet.push(pet);
      });
    },
  },

  mounted() {
    CenterService.getListPetProfile(
      this.getUser.centerId,
      this.petDocumentId
    ).on("value", this.onDataChange);

     EventBus.$on("CloseAddDialog", (visible) => {
      this.dialogVisible = visible;
    });
  },

  async created() {
    await this.getData();
    this.getPetData();
  },
};
</script>

<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.info {
  padding: 5px;
  font-size: 18px;
  width: 100%;
}
.text-info-res {
  color: #838383;
  font-weight: 400;
}

.tag {
  width: 90%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  margin-left: 5px;
}

.button {
  text-align: center;
  padding-top: 20px;
}

.map {
  width: 100%;
  background-color: #838383;
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

.title {
  font-size: 35px;
  color: #fff;
  text-transform: capitalize;
  font-weight: 700;
}

.pet-img {
  transition: 0.5s;
}

.pet-img:hover {
  width: 105%;
  height: 105%;
}
</style>