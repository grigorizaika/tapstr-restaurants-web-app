<template>
  <div id="app">
    <restaurant-start></restaurant-start>
  </div>
</template>

<script>
import RestaurantStart from './components/RestaurantStart.vue'

export default {
  name: 'app',
  components: {
    RestaurantStart
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
