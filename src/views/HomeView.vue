<template>
  <main class="text-white flex flex-col">
    <!-- top bar div -->
    <div class="w-auto flex flex-row font-Helvetica">
      <!-- current date and user's name -->
      <div class="pt-4 w-1/2 pl-6 flex flex-col">
        <p class="text-sm">Hi, *insert username*</p>
        <p class="text-2xl">Fri, 20 April, 2024</p>
      </div>
      <!-- search bar div -->
      <div class="pl-4 pt-8 mb-4 relative z-10">
        <div
          class="pl-4 flex px-2 shadow-md rounded-3xl bg-custom-black-bg-container ring-2 ring-zinc-700 items-baseline"
        >
          <i class="fa-solid fa-magnifying-glass-location mr-1 text-lg"></i>
          <!-- search bar -->
          <input
            type="text"
            v-model="searchQuery"
            @input="getSearchResults"
            placeholder="Search city..."
            class="pb-1 pt-2 px-1 w-60 bg-transparent focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
          />
        </div>
        <!-- search bar dropdown options -->
        <ul
          v-if="mapboxSearchResults"
          class="absolute bg-zinc-600 text-white w-72 rounded-md shadow-md py-2 px-1 top-[74px]"
        >
          <p v-if="searchError">
            Sorry, something went wrong, please try again.
          </p>
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
    </div>

    <!-- Forecast + AI assistant div -->
    <div class="flex w-full">
      <!-- Forecast components -->
      <div class="w-1/2 pt-1 mb-8 relative z-0">
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
      <!-- AI assistant component in the future -->
      <div class="w-1/2 mx-3 pt-4"></div>
    </div>
  </main>
</template>

<script setup>
import ForecastToday from "../components/ForecastToday.vue";
import { ref } from "vue";
import axios from "axios";
import { RouterLink, useRouter } from "vue-router";

const router = useRouter();

// get user location
window.onload = function findUserLocation() {
  async function success(position) {
    const userLatitude = ref(position.coords.latitude);
    const userLongitude = ref(position.coords.longitude);

    //get city and country based on lat and lon
    fetch(
      `https://api.3geonames.org/${userLatitude.value},${userLongitude.value}.json`,
      {
        mode: "no-cors",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract city and country from response
        const userCity = ref(data.nearest.city);
        const userCountry = ref(data.nearest.state);

        // Do something with city and country, for example log them
        console.log("City:", userCity);
        console.log("Country:", userCountry);
      })
      .catch((error) => {
        console.error("Error fetching city and country:", error);
      });
  }

  function error() {
    console.log("Unable to retrieve your location");
  }

  if (!navigator.geolocation) {
    console.log("Geolocation is not supported by your browser");
  } else {
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(success, error);
  }
};

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
