<template>
  <div class="flex  min-h-screen font-Roboto bg-weather-primary">
  
    <div class=" w-1/12">
    <NavigationSidebar class="relative z-20"/>
    </div>

    <div class=" w-11/12 pt-1">
      <RouterView />
    </div>
    
    <!-- <p class="p-2 m-2 mb-10 ring-1 ring-green-400">*virtual assistant place*</p> -->
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavigationSidebar from './components/NavigationSidebar.vue';
</script>

<style lang="scss" scoped></style>
