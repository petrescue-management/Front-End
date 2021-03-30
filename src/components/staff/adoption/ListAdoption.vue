<template>
  <div>
    <el-main>
      <div class="row bg-title all-pet">
        <div style="width: 5%"></div>
        <div style="width: 90%; margin: auto; z-index: 2">
          <h1 class="title">Danh sách pet đã nhận nuôi</h1>
        </div>
      </div>

      <div class="contain">
        <el-badge :value="12" class="item">
          <div style="width: 100%; height: 185px; overflow: hidden">
            <img :src="img" width="100%" height="100%" />
          </div>
        </el-badge>
        <div class="overlay">
          <p class="name-pet">Avril</p>
          <el-tag class="status" type="success" size="small"> Test </el-tag>
          <hr class="tag" />
          <p class="att-pet">Giới tính :</p>
          Nam
          <br />
          <p class="att-pet">Tuổi :</p>
          21
          <br />
          <p class="att-pet">Màu sắc :</p>
          Đen
          <br />
          <p class="att-pet">Tiêm phòng:</p>
          Có
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      listAdoption: [],
      img:
        "https://firebasestorage.googleapis.com/v0/b/pet-rescue-fb.appspot.com/o/pet-img%2F2019_05_17_00_18_IMG_0253.JPG?alt=media&token=e0d231d6-93f6-4d9e-b2b3-f3c44d37731a",
      totalPage: 0,
      dialogVisible: false,
    };
  },

  created() {},
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