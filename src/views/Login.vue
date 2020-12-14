<template>
  <div class="card mt-3">
    <h5 class="card-header">Login</h5>
    <div class="card-body">
      <form @submit="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="password"
            placeholder="*******"
            required
          />
        </div>
        <button class="btn btn-success form-control" type="submit">
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    login(e) {
      e.preventDefault();
      axios
        .get(`http://localhost:3000/users?email=${this.email}`)
        .then((res) => {
          if (res.data.length <= 0) {
            this.$toast.open({
              message: "Username Tidak Ditemukan",
              type: "error",
              position: "top-right",
              duration: 1000,
            });
            return;
          }
          if (res.data[0].password === this.password) {
            return true;
          }
          return false;
        })
        .then((res) => {
          if (res) {
            this.$store.commit("setAuthenticated", true);
            this.$router.push("/");
          } else if (res === false) {
            this.$toast.open({
              message: "Password Salah",
              type: "error",
              position: "top-right",
              duration: 1000,
            });
          }
        });
      //   this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.card {
  margin: 0 auto; /* Added */
  float: none; /* Added */
  margin-bottom: 10px; /* Added */
  width: 50%;
}
</style>