<template>
  <div class="mt-3">
    <h2>Daftar <span class="bolder">Makanan</span></h2>
    <div class="input-group mb-3">
      <input
        v-model="search"
        type="text"
        class="form-control"
        placeholder="Cari Makanan Kesukaan Anda .."
        aria-describedby="button-addon2"
      />
      <button
        @click="searchFoods"
        class="btn btn-outline-secondary"
        type="button"
        id="button-addon2"
      >
        Search
      </button>
    </div>

    <div class="row">
      <div class="col-md-4 mt-3" v-for="product in products" :key="product.id">
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
  name: "Foods",
  components: {},
  data() {
    return {
      products: [],
      search: "",
    };
  },
  mounted() {
    axios.get("http://localhost:3000/products").then((res) => {
      this.products = res.data;
      console.log(res.data);
    });
  },
  methods: {
    searchFoods() {
      axios
        .get(`http://localhost:3000/products?q=${this.search}`)
        .then((res) => {
          this.products = res.data;
          console.log(res.data);
        });
    },
  },
};
</script>