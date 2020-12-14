import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    keranjangCount: 0,
    keranjang: [],
    isAuthenticated: false,
  },

  mutations: {
    setAuthenticated(state, status) {
      state.isAuthenticated = status;
    },

    addKeranjangCount(state) {
      state.keranjangCount++;
    },
    reduceKeranjangCount(state) {
      state.keranjangCount--;
    },
    setKeranjangCount(state, jumlah) {
      state.keranjangCount = jumlah;
    },

    setKeranjang(state, newKeranjang) {
      state.keranjang = newKeranjang;
    },
    addKeranjang(state, itemKeranjang) {
      state.keranjang.push(itemKeranjang);
    },
    deleteItemKeranjang(state, idItem) {
      let remove = state.keranjang
        .map(function(item) {
          return item.id;
        })
        .indexOf(idItem);
      state.keranjang.splice(remove, 1);
    },
    updateItemKeranjang(state, item) {
      let data = state.keranjang;
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === item.id) {
          data[i].jumlah_pemesanan = item.jumlah_pemesanan;
          data[i].keterangan = item.keterangan;
          console.log(data[i]);
        }
      }
    },
  },
  getters: {
    getCount: (state) => {
      return state.keranjangCount;
    },
    getKeranjang: (state) => {
      return state.keranjang;
    },
  },
  actions: {},
  modules: {},
});
