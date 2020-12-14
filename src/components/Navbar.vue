<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Resto</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/food">Foods</router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="this.$store.state.isAuthenticated">
          <li class="nav-item">
            <router-link class="nav-link" to="/keranjang">
              Keranjang <i class="fas fa-shopping-cart"></i> {{ " " }}
              <span
                v-if="this.$store.state.keranjangCount !== 0"
                class="badge bg-success"
                >{{ this.$store.state.keranjangCount }}</span
              >
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" style="cursor: pointer" @click="logout">
              Logout
            </a>
          </li>
        </ul>

        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"> Login </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/register">
              Register
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data: () => {
    return {
      jumlah: 0,
    };
  },
  methods: {
    logout() {
      this.$store.commit("setAuthenticated", false);
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
a .pointer {
  cursor: pointer;
}
</style>