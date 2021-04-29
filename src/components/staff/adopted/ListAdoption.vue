<template>
  <div v-loading="loading">
    <el-main >
      <div v-if="listAdoption.length != 0">
        <div
          v-for="pet in listAdoption"
          :key="pet.id"
          class="contain"
          @click="goToListForm(pet.id)"
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
              <p class="att-pet">Người nhận nuôi:</p><br/>
              {{ pet.adopter }}
              <br />
              <p class="att-pet">Ngày nhận:</p>
              {{ pet.dateAdopted }}
              <br />
              <p class="att-pet">Tình trạng:</p>
              <el-tag class="status" :type="pet.color" size="small">
                {{ pet.status }}
              </el-tag>
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
import {adoptionStatus} from '@/enum/consts'
export default {
  data() {
    return {
      listAdoption: [],
      totalPage: 0,
      id: null,
      loading: false,
      listStatus:[],
      status: 0,
    };
  },

  computed: {
    ...mapGetters("adoptedPet", ["getListAdopted"]),

    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  methods: {
    ...mapActions("adoptedPet", ["getListAdoptedPet"]),

    goToListForm(id) {
      this.$router.push({ name: "Adoption", params: { id } });
    },

    getTableData(list) {
      this.listAdoption = [];
      list.forEach((data) => {
        let listImg = this.getListImg(data.petImgUrl);
        let pet = {
          id : data.adoptionRegistrationId,
          petName: data.petName,
          imgUrl: listImg[0],
          adopter : data.username,
          dateAdopted : this.getDatetime(data.adoptedAt),
          status : adoptionStatus.get(data.adoptionStatus).name,
          color: adoptionStatus.get(data.adoptionStatus).color
        };
        this.listAdoption.push(pet);
        this.listAdoption.sort((a, b) => (new Date(a.dateAdopted) < new Date(b.dateAdopted) ? 1 : -1));
      });
    },

    getListImg(list) {
      if (list.lastIndexOf(";") != -1) {
        return list.substr(0, list.lastIndexOf(";")).split(";");
      } else {
        return list.split(";");
      }
    },

    async getList(page) {
      this.loading = true;
      let data = {
        token: this.getUser.token,
        page,
      };
      await this.getListAdoptedPet(data);
      this.getTableData(JSON.parse(JSON.stringify(this.getListAdopted)));
      this.loading = false;
    },

    getDatetime(createdDate) {
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

    getStatus() {
      adoptionStatus.forEach((values, keys) => {
        let status = {
          value: keys,
          text: values.name,
        };
        this.listStatus.push(status);
      });
    },
  },

  async created() {
    await this.getList(0);
    this.getStatus()
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
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
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
  border-top-right-radius: 5%
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

.pet-img {
  transition: 0.5s;
}

.pet-img:hover {
  width: 105%;
  height: 105%;
}
</style>