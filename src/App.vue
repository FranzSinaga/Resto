<template>
  <div id="app">
    <navbar />
    <div class="container">
      <div v-if="this.isLoading == false">
        <!-- <span v-if="this.isAuth === true"> -->
          <router-view />
        <!-- </span> -->
        <!-- <span v-else>
          <router-view name="notAuthenticated" />
        </span> -->
      </div>
      <div v-else />
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import axios from "axios";
export default {
  name: "App",
  data: () => {
    return {
      isLoading: true,
      isAuth: false,
    };
  },
  components: {
    Navbar,
    Footer,
  },
  mounted() {
    axios.get("http://localhost:3000/keranjangs").then((res) => {
      this.$store.commit("setKeranjangCount", res.data.length);
      this.$store.commit("setKeranjang", res.data);
      this.isLoading = false;
      this.isAuth = this.$store.state.isAuthenticated;
    });
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap");

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a.router-link-exact-active {
  color: #42b983;
  font-weight: 900;
}
</style>
