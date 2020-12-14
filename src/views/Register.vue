<template>
  <div class="card mt-3">
    <h5 class="card-header">Register</h5>
    <div class="card-body">
      <form @submit="register">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input
            v-model="email"
            type="email"
            class="form-control"
            id="email"
            placeholder="name@example.com"
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
          />
        </div>
        <button class="btn btn-success form-control" type="submit">
          Register
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Register",
  data: () => {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    register(e) {
      e.preventDefault();
      let data = {
        email: this.email,
        password: this.password,
      };
      axios.post("http://localhost:3000/users", data).then((res) => {
        console.log(res);
      });
      this.$router.push("/login");
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