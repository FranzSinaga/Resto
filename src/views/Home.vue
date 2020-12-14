<template>
  <div>
    <div class="jumbotron">
      <div class="row">
        <div class="col-md-6 mt-5">
          <h1 class="display-5 bolder">Delicious Food Menu</h1>
          <p class="display-6">in Your Gadget</p>

          <p>Ayo segera pilih dan pesan makanan favorit Anda</p>
          <p class="lead">
            <router-link class="btn btn-success btn-lg" to="/food"
              >Pesan</router-link
            >
          </p>
        </div>
        <div class="col-md-6">
          <img
            alt="ilustrasi"
            class="img-fluid"
            src="../assets/ilustrasi.png"
          />
        </div>
      </div>
    </div>

    <div class="d-flex justify-content-between mt-4">
      <div>
        <h2>Best <span class="bolder">Foods</span></h2>
      </div>
      <div>
        <router-link class="btn btn-success" to="/food"
          >Lihat Semua</router-link
        >
      </div>
    </div>

    <div class="row mt-3">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card">
          <img
            :src="require(`@/assets/${product.gambar}`)"
            class="card-img-top"
            alt="..."
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.nama }}</h5>
            <p class="card-text">Harga: Rp. {{ product.harga }}</p>
            <router-link
              :to="{ name: 'FoodDetail', params: { id: product.id } }"
              class="btn btn-success"
              >Pesan</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    console.log(this.$store.state.isAuthenticated);
    axios.get("http://localhost:3000/best-products").then((res) => {
      this.products = res.data;
      console.log(res.data);
    });
  },
};
</script>

<style>
h1,
h2.bolder {
  font-weight: bolder;
}
span.bolder {
  font-weight: bolder;
}
</style>
