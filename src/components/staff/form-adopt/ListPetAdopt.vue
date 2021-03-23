<template>
  <div>
    <el-main v-loading="loading">
      <div class="row bg-title form-adoption">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Pet đang chờ nhận nuôi</h1>
        </div>
      </div>
      <br />
      <div>
        <div v-for="pet in listPetWaiting" :key="pet.petId" class="contain" @click="goToListForm(pet.petId)">
          <el-badge :value="pet.count" class="item">
            <div style="width: 100%; height: 185px; overflow: hidden">
              <img :src="pet.imgUrl" width="100%" height="100%" />
            </div>
          </el-badge>
          <div class="overlay">
            <p class="name-pet">{{ pet.petName}}</p>
            <hr class="tag" />
            <p class="att-pet">Giới tính :</p>
            {{pet.gender}}
            <br />
            <p class="att-pet">Tuổi :</p>
            {{pet.age}}
            <br />
            <p class="att-pet">Giống :</p>
            {{pet.breedName}}
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
      loading: false
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

    async getList() {
      let token = this.getUser.token;
      await this.getListPetToBeRegisted(token);
      this.getTableData(JSON.parse(JSON.stringify(this.getListPetWaiting)));
    },
  },

  async created() {
    this.loading = true;
    await this.getList();
    this.loading = false
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
</style>