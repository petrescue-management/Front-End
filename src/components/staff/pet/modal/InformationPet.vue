<template >
  <div>
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
      <b-col>
        Mô tả: <span class="value">{{ pet.petProfileDescription }}</span>
      </b-col>
    </b-row>  
    <hr class="tag" />
  </div>
</template>
<script>

export default {
    props:{
        pet: Object,
    }
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
h2{
  margin: 0 0 10px 0 !important;
}
</style>