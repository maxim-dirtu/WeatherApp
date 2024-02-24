<template>
  <div class="flex  min-h-screen font-Roboto bg-weather-primary">
    <NavigationSidebar class="relative z-20"/>
    <RouterView />
    
    <p class="p-2 m-2 mb-10 ring-1 ring-green-400">*virtual assistant place*</p>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavigationSidebar from './components/NavigationSidebar.vue';
</script>

<style lang="scss" scoped></style>
