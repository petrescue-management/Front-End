<template>
  <div>
    <el-main v-loading="loading">
      <div class="row bg-title all-pet" style="height: 250px">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title"></h1>
        </div>
      </div>
      <div class="content" style="margin-top: 20px">
        <div class="container-fluid">
          <div class="row">
            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-warning">
                  <i class="nc-icon nc-chart text-warning"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Ca đã cứu</p>
                  <h4 class="card-title">{{ rescues }}</h4>
                </div>
                <div slot="footer">
                  <i class="fas fa-file-alt"></i>
                </div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-success">
                  <i class="nc-icon nc-light-3 text-success"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Thú cưng đã nhận nuôi</p>
                  <h4 class="card-title">{{ petsAdopted }}</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-calendar-o"></i>
                </div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-danger">
                  <i class="nc-icon nc-vector text-danger"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Thú cưng đang tìm chủ</p>
                  <h4 class="card-title">{{ petsFindingOwner }}</h4>
                </div>
                <div slot="footer"><i class="fa fa-clock-o"></i></div>
              </stats-card>
            </div>

            <div class="col-xl-3 col-md-6">
              <stats-card>
                <div slot="header" class="icon-info">
                  <i class="nc-icon nc-favourite-28 text-primary"></i>
                </div>
                <div slot="content">
                  <p class="card-category">Tình nguyện viên</p>
                  <h4 class="card-title">{{ volunteers }}</h4>
                </div>
                <div slot="footer">
                  <i class="fa fa-refresh"></i>
                </div>
              </stats-card>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import StatsCard from "@/components/Card/StatsCard.vue";
import { getCountForCenter } from "@/api/staff/centerApi";
export default {
  components: {
    StatsCard,
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

  data() {
    return {
      rescues: 0,
      petsAdopted: 0,
      petsFindingOwner: 0,
      volunteers: 0,
      loading: false,
    };
  },

  methods: {
    async getCount() {
      this.loading = true;
      await getCountForCenter(this.getUser.token).then((response) => {
        if (response.status == 200) {
          response.json().then((data) => {
            this.rescues = data.rescues;
            this.petsAdopted = data.petsAdopted;
            this.petsFindingOwner = data.petsFindingOwner;
            this.volunteers = data.volunteers;
          });
        }
      });
      this.loading = false;
    },
  },

  created() {
    this.getCount();
  },
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
  padding: 0;
}

.bg-title::before {
  height: 250px !important;
}
</style>
