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
    <!-- Forecast components -->
    <div class="pt-4 mb-8 relative z-0">
      <Suspense>
        <ForecastToday
          :key="cityProp"
          :city="cityProp"
          :country="countryProp"
          :lat="latProp"
          :lon="lonProp"
          @triggerProps="triggerProps"
        />
        <template #fallback>
          <p>Loading...</p>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import ForecastToday from "../components/ForecastToday.vue";
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

const cityProp = ref("");
const countryProp = ref("");
const latProp = ref("");
const lonProp = ref("");

const previewCity = (searchResult) => {
  const splitArrayCityStateCountry = searchResult.place_name.split(",");
  var country = "";
  var city = splitArrayCityStateCountry[0];
  if (splitArrayCityStateCountry[2] !== undefined) {
    country = splitArrayCityStateCountry[2];
  } else {
    country = splitArrayCityStateCountry[1];
  }

  cityProp.value = city;
  countryProp.value = country.replaceAll(" ", "");
  latProp.value = searchResult.geometry.coordinates[1];
  lonProp.value = searchResult.geometry.coordinates[0];

  setTimeout(() => {
    showCityViewComponent.value = true;
    searchQuery.value = "";
    mapboxSearchResults.value = null;
  }, 200);
};

//searchbox  it returns the weather
//data through $emits() in the HomeView component

//saved cities component la click pe un element,
//va transmite cu $emits() prop-ul pentru oras
//spre HomeView, iar HomeView il va transmite
//la searchbox pentru a lua datele

//sau

//savedCities trimite prin provide/inject direct
//spre searchbox

function triggerProps(props) {
  

  cityProp.value = props.propCity;
  countryProp.value = props.propCountry;
  latProp.value = props.propLat;
  lonProp.value = props.propLon;
  console.log("triggerPropsKey emit event inside HomeView");
  console.log(cityProp);

  //probabil valorile pt props ce se trimit la child component trebuie sa fie ref-uri ca sa fie reactive mereu.

}
</script>
