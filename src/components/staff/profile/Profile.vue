<template>
  <div>
    <el-main>
      <div class="content">
        <div class="container-fluid">
            <div>
              <edit-profile-form> </edit-profile-form>
            </div>
        </div>
      </div>
    </el-main>
  </div>
</template>
<script>
import EditProfileForm from "./UserProfile/EditProfileForm.vue";

export default {
  components: {
    EditProfileForm,
  },
};
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
</style>
