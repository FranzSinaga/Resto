<template>
  <div class="mt-3">
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Update Pesanan {{ this.pesananUpdateData.nama }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <form @submit="update">
              <div class="mb-3">
                <label for="jumlah" class="form-label">Jumlah</label>
                <input
                  type="number"
                  class="form-control"
                  id="jumlah"
                  v-model="pesananUpdateData.jumlah_pemesanan"
                />
              </div>
              <div class="mb-3">
                <label for="keterangan" class="form-label">Keterangan</label>
                <textarea
                  class="form-control"
                  id="keterangan"
                  v-model="pesananUpdateData.keterangan"
                  placeholder="Keterangan"
                />
              </div>
              <button type="submit" class="btn btn-success float-end">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <h2>Keranjang <span class="bolder">Saya</span></h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Foto</th>
          <th scope="col">Makanan</th>
          <th scope="col">Keterangan</th>
          <th scope="col">Jumlah</th>
          <th scope="col">Harga</th>
          <th scope="col">Total Harga</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="keranjang in keranjangs" :key="keranjang.id">
          <th scope="row">{{ keranjang.id }}</th>
          <td>
            <img
              :src="require(`@/assets/${keranjang.products.gambar}`)"
              :alt="keranjang.products.nama"
              class="img-fluid rounded"
              style="width: 200px"
            />
          </td>
          <td>{{ keranjang.products.nama }}</td>
          <td v-if="keranjang.keterangan === ''">-</td>
          <td v-else>{{ keranjang.keterangan }}</td>
          <td>{{ keranjang.jumlah_pemesanan }}</td>
          <td>Rp. {{ keranjang.products.harga }}</td>
          <td>
            Rp. {{ keranjang.jumlah_pemesanan * keranjang.products.harga }}
          </td>
          <td>
            <button
              class="btn btn-outline-default"
              v-on:click="
                deletePesanan(
                  keranjang.id,
                  keranjang.jumlah_pemesanan * keranjang.products.harga
                )
              "
            >
              <i class="fas fa-trash-alt" style="color: red"></i>
            </button>

            <!-- Button trigger modal -->
            <button
              @click="getPesananById(keranjang.id)"
              type="button"
              class="btn btn-outline-default"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <i class="fas fa-edit"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="row">
      <div class="d-flex justify-content-between mt-4">
        <div />
        <div>
          <p class="float-end bolder">Total Harga: Rp. {{ total }}</p>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-8" />
      <div class="col-md-4">
        <form @submit="pesan">
          <div class="my-3">
            <label for="nama" class="form-label">Nama: </label>
            <input v-model="nama" type="text" class="form-control" id="nama" />
          </div>
          <div class="mb-3">
            <label for="no meja" class="form-label">No Meja: </label>
            <input
              v-model="no_meja"
              type="text"
              class="form-control"
              id="no meja"
            />
          </div>
          <button class="float-end btn btn-success">Pesan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Keranjang",
  data: () => {
    return {
      keranjangs: [],
      total: 0,
      nama: "",
      no_meja: "",
      pesananUpdateData: {},
    };
  },
  mounted() {
    this.keranjangs = this.$store.state.keranjang;
    var total = 0;
    this.$store.state.keranjang.forEach((e) => {
      console.log(e);
      var totalPerItem = e.jumlah_pemesanan * e.products.harga;
      total += totalPerItem;
    });
    this.total = total;
  },
  methods: {
    deletePesanan(id, totalHarga) {
      console.log(id);
      axios
        .delete(`http://localhost:3000/keranjangs/${id}`)
        .then((res) => {
          console.log(res);
          this.total = this.total - totalHarga;
        })
        .then(() => {
          this.$toast.open({
            message: "Sukses menghapus pesanan",
            type: "success",
            position: "top-right",
            duration: 1000,
          });
          this.$store.commit("reduceKeranjangCount");
          this.$store.commit("deleteItemKeranjang", id);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPesananById(id) {
      let data = this.keranjangs;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
          this.pesananUpdateData = {
            id: id,
            jumlah_pemesanan: data[i].jumlah_pemesanan,
            keterangan: data[i].keterangan,
            nama: data[i].products.nama,
          };
        }
      }
    },
    update(e) {
      e.preventDefault();
      axios
        .patch(
          `http://localhost:3000/keranjangs/${this.pesananUpdateData.id}`,
          {
            jumlah_pemesanan: this.pesananUpdateData.jumlah_pemesanan,
            keterangan: this.pesananUpdateData.keterangan,
          }
        )
        .then(() => {
          this.$store.commit("updateItemKeranjang", this.pesananUpdateData);
          this.$toast.open({
            message: "Sukses mengupdate pesanan",
            type: "success",
            position: "top-right",
            duration: 1000,
          });
        })
        .then(() => {
          this.keranjangs = this.$store.state.keranjang;
          var total = 0;
          this.$store.state.keranjang.forEach((e) => {
            console.log(e);
            var totalPerItem = e.jumlah_pemesanan * e.products.harga;
            total += totalPerItem;
          });
          this.total = total;
        })
        .finally(() => {
          document.getElementById("exampleModal").click("hide");
          this.pesananUpdateData = {};
        });
    },
    closeModal() {
      this.pesananUpdateData = {};
    },
    pesan(e) {
      e.preventDefault();
      if (this.keranjangs.length <= 0) {
        this.$toast.open({
          message: "Pesanan kosong",
          type: "warning",
          position: "top-right",
          duration: 1000,
        });
        return;
      }
      var data = {
        nama: this.nama,
        noMeja: this.no_meja,
        keranjangs: this.keranjangs,
      };

      try {
        console.log(data);
        axios
          .post("http://localhost:3000/pesanans", data)
          .then(function (response) {
            console.log(response);
          })
          .then(() => {
            this.$toast.open({
              message: "Sukses dipesan",
              type: "success",
              position: "top-right",
              duration: 1000,
            });
          })
          .then(() => {
            this.keranjangs.map((e) => {
              console.log(e);
              axios
                .delete("http://localhost:3000/keranjangs/" + e.id)
                .then((res) => {
                  console.log(res);
                })
                .then(() => {
                  this.$store.commit("reduceKeranjangCount");
                  this.$store.commit("deleteItemKeranjang", e.id);
                });
            });
          })
          .then(() => {
            this.$router.push("/pesanan-sukses");
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.bolder {
  font-weight: bolder;
}
</style>