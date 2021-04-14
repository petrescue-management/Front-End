<template >
  <div>
    <h3>Thông tin từ người nhận nuôi</h3>
    <b-row class="info">
      <b-col>
        Người nhận nuôi:
        <span class="value">{{ data.username }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col
        >Ngày nhận nuôi:
        <span class="value">{{ data.adoptedAt }}</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col
        >Email: <span class="value">{{ data.email }}</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col
        >SĐT: <span class="value">{{ data.phone }}</span></b-col
      >
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Công việc: <span class="value">{{ data.job }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
    <b-row class="info">
      <b-col>
        Địa chỉ: <span class="value">{{ data.address }}</span>
      </b-col>
    </b-row>
    <hr class="tag" />
  </div>
</template>
<script>
export default {
  props: {
    adopter: Object,
  },

  data() {
    return {
      data: null,
    };
  },

  methods: {
    getDate(createdDate) {
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

    getTableData() {
      this.data = {
        adoptedAt: this.getDate(this.adopter.adoptedAt),
        username: this.adopter.username,
        address:this.adopter.address,
        email: this.adopter.email,
        phone: this.adopter.phone,
        job: this.adopter.job,
        userId: this.adopter.userId,
      };
    },
  },

  created() {
    this.getTableData();
  },
};
</script>
<style scoped>
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

.container-img {
  padding: 5px;
  border-radius: 15px;
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  margin-right: 10px;
  margin-left: 20px;
}
.img-center {
  left: 50%;
  transform: translate(-50%, -50%);
  top: 50%;
  position: relative;
  display: block;
}
.preview >>> img {
  max-height: 100px;
  max-width: 140px;
  display: block;
  vertical-align: middle;
}

.preview {
  max-height: 100px;
  max-width: 140px;
  display: block;
  vertical-align: middle;
}
h3 {
  margin: 0 0 10px 0 !important;
}
</style>