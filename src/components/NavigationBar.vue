<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg font-Helvetica">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white pt-3 pb-2"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Durleshtskii Forecast</p>
        </div>
      </RouterLink>

      <div class="flex fap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer px-3"
          @click="toggleModal"
        ></i>
        <i
          class="fa-solid fa-right-from-bracket text-xl hover:text-logout-button duration-150 cursor-pointer"
        ></i>
      </div>

      <BaseModal :modal-active="modalActive" @close-modal="toggleModal">
        <div class="text-black">
          <h1 class="text-2xl mb-1">About:</h1>
          <p class="mb-4">
            The Local Weather allows you to track the current and future weather
            of cities of your choosing. Also, you have your personal Virtual
            Assistant. Use it :)
          </p>
          <h2 class="text-2xl">How it works:</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Search for your city by entering the name into the search bar.
            </li>
            <li>
              Select a city within the results, this will take you to the
              current weather for your selection.
            </li>
            <li>
              Track the city by choosing the option in options menu. This will
              save the city to view at a later time on the home page.
            </li>
          </ol>

          <h2 class="text-2xl">Removing a city</h2>
          <p>
            If you no longer wish to track a city, simply select the city within
            the home page. There will be an option to delete the city.
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import BaseModal from "./BaseModal.vue";

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
