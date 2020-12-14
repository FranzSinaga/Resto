<template>
  <footer>
    <p class="text-center mt-3">{{ year }} Copyright Franz Aditya Natanael Sinaga</p>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data: () => {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
footer {
  padding: 30px;
}
</style>