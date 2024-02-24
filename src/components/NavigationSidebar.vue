<template>
  <div class="pl-6 pr-2">
    <nav>
      <ul
        class="nav__list bg-custom-black-bg-container shadow-xl pt-8 p-4 w-14 h-[92%] mt-6 flex flex-col items-center gap-10 text-2xl rounded-3xl ring-2 ring-zinc-700"
      >
            <RouterLink :to="{ name: 'home' }">
        <li class="nav__item" data-tooltip="Home">
          <i class="fa-solid fa-house hover:text-sidebar-icons "></i>
        </li>
         </RouterLink>
          <RouterLink :to="{ name: 'notifications' }">
        <li class="nav__item" data-tooltip="Notifications">
          <i class="fa-solid fa-bell hover:text-sidebar-icons "></i>
        </li>
        </RouterLink>
        <li class="nav__item" data-tooltip="Settings">
          <i class="fa-solid fa-gear hover:text-sidebar-icons"></i>
        </li>
        <li class="nav__item" data-tooltip="Info">
          <i class="fa-solid fa-circle-info hover:text-sidebar-icons mt-72"
           @click="toggleModal"></i>
        </li>
        <li class="nav__item" data-tooltip="Log-Out">
          <i
            class="fa-solid fa-right-from-bracket hover:text-logout-button "
          ></i>
        </li>
      </ul>
      <!-- popup iconita info -->
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
  </div>
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

<style scoped>
.nav__item {
  list-style: none;
  position: relative;
}
i {
  transition: all 200ms ease-in;
}

</style>
