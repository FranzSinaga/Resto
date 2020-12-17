<template>
  <div class="row mt-3">
    <div class="col-md-6">
      <img
        v-if="loadImage == false"
        :src="require(`../assets/${product.gambar}`)"
        :alt="product.nama"
        class="img-fluid rounded"
      />
    </div>
    <div class="col-md-6">
      <h2 class="bolder">{{ product.nama }}</h2>
      <hr />
      <h3>
        Harga: <span class="bolder">{{ product.harga }}</span>
      </h3>
      <form @submit="addToCart">
        <div class="my-3">
          <label for="jumlah" class="form-label">Jumlah Pesan</label>
          <input
            v-model="jumlah"
            type="number"
            min="1"
            class="form-control"
            id="jumlah"
          />
        </div>
        <div class="mb-3">
          <label for="ket" class="form-label">Keterangan</label>
          <textarea
            v-model="keterangan"
            :placeholder="keteranganText"
            class="form-control"
            id="ket"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success">Pesan</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FoodDetail",
  data() {
    return {
      product: [],
      keteranganText: "Keterangan spt: Pedes, Nasi Setengah ..",
      jumlah: 0,
      keterangan: "",
      loadImage: true,
    };
  },
  mounted() {
    axios
      .get(`http://localhost:3000/products/${this.$route.params.id}`)
      .then((res) => {
        this.product = res.data;
        this.loadImage = false;
      });
  },
  computed: {
    image() {
      return {
        img: require(`../assets/${this.icon}`),
      };
    },
  },
  methods: {
    addToCart(e) {
      e.preventDefault();
      if (this.$store.state.isAuthenticated) {
        var data = {
          jumlah_pemesanan: this.jumlah,
          keterangan: this.keterangan,
          products: {
            id: this.product.id,
            kode: this.product.kode,
            nama: this.product.nama,
            harga: this.product.harga,
            is_ready: true,
            gambar: this.product.gambar,
          },
        };
        try {
          axios
            .post("http://localhost:3000/keranjangs", data)
            .then(function (response) {
              console.log(response);
              return response;
            })
            .then((response) => {
              this.$toast.open({
                message: "Sukses masuk keranjang",
                type: "success",
                position: "top-right",
                duration: 1000,
              });
              this.$router.push("/keranjang");
              this.$store.commit("addKeranjang", response.data);
              this.$store.commit("addKeranjangCount");
            });
        } catch (e) {
          console.log(e);
        }
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>