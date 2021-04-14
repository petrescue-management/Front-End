<template>
  <footer class="footer">
    <div class="container-fluid">
      <nav>
        <ul class="footer-menu">
        </ul>
      </nav>
      <div class="copyright text-center">
        Địa chỉ : {{ getUser.centerAddress }};
        SĐT : {{ getUser.centerPhone }}
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
    }
  },

  computed: {
    getUser() {
      let user = localStorage.getItem("user");
      return JSON.parse(user);
    },
  },

}

</script>
<style>

</style>