<template>
  <main class="container text-white">
    <div class="pt-4 mb-4 relative z-10">
      <!-- search bar -->
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city..."
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <!-- search bar dropdown options -->
      <ul
        v-if="mapboxSearchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <p v-if="searchError">Sorry, something went wrong, please try again.</p>
        <p v-if="!serverError && mapboxSearchResults.length === 0">
          Sorry, we couldn't obtain a result based on your input. Maybe, try
          again..?
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            classes="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
    <!-- cityView component -->
    <div class="pt-4 mb-8 relative z-0">
      <Suspense>
        <AsyncCityView
          :key="cityProp"
          :city="cityProp"
          :country="countryProp"
          :lat="latProp"
          :lon="lonProp"
        />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import AsyncCityView from "../components/AsyncCityView.vue";
import { ref } from "vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

const mapboxAPIKey =
  "pk.eyJ1IjoiZGlydHVtYXhpbSIsImEiOiJjbHNrdW55emMwN21yMndud21ua2JianBxIn0.oduLx8Pu4UfvLLGl9GPLYw";
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(null);
const showCityViewComponent = ref(false);

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapboxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 200);
};

var cityProp = "";
var countryProp = "";
var latProp = "";
var lonProp = "";

const previewCity = (searchResult) => {
  console.log(searchResult);

  const splitArrayCityStateCountry = searchResult.place_name.split(",");
  var country = "";
  var city = splitArrayCityStateCountry[0];
  if (splitArrayCityStateCountry[2] !== undefined) {
    country = splitArrayCityStateCountry[2];
  } else {
    country = splitArrayCityStateCountry[1];
  }
  console.log(city, country);

  cityProp = city;
  countryProp = country.replaceAll(" ", "");
  latProp = searchResult.geometry.coordinates[1];
  lonProp = searchResult.geometry.coordinates[0];

  // const lat = ref( searchResult.geometry.coordinates[1]);
  // let lon = searchResult.geometry.coordinates[0];
  // country = country.replaceAll(" ", "");

  console.log("after router push");
  console.log(cityProp, countryProp, latProp, lonProp);
  console.log(typeof cityProp);
  console.log(typeof countryProp);
  console.log(typeof latProp);
  console.log(typeof lonProp);

  console.log("------data passed through props-----");

  setTimeout(() => {
    showCityViewComponent.value = true;
    searchQuery.value = "";
    mapboxSearchResults.value = null;
  }, 200);
};
</script>
