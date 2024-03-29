<template>
  <div
    v-if="!weatherData"
    class="shadow-md rounded-3xl bg-custom-black-bg-container h-[200px] mb-6 ring-2 ring-zinc-700"
  >
    <br />
    <br /><br /><br />
    <p class="flex justify-center items-center text-2xl">
      Search for a city to see the forecast for today!
    </p>
  </div>
  <!-- weather forecast container -->
  <div
    v-else
    class="shadow-md rounded-3xl bg-custom-black-bg-container mb-6 ring-2 ring-zinc-700"
    :key="componentKey"
  >
    <!-- div for icon + weather data -->
    <div class="flex">
      <!-- icon  -->
      <div class="w-1/5 h-full flex">
        <img
          class="w-[110px] h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <!-- div for weather data + undertext -->
      <div class="w-4/5 h-full flex flex-col">
        <!-- main data -->
        <div class="flex justify-around mb-4 mt-6 items-end">
          <h1 class="text-2xl">{{ propCity }}</h1>

          <h1 class="text-3xl">
            {{ Math.round(weatherData.current.temp) }}&deg
          </h1>

          <div class="flex items-baseline">
            <h1 class="text-3xl">
              {{ Math.round(weatherData.current.humidity) }}
            </h1>
            <p class="text-xs">%</p>
          </div>

          <div class="flex items-baseline">
            <h1 class="text-3xl">
              {{ Math.round(weatherData.current.wind_speed) }}
            </h1>
            <p class="text-xs">km/h</p>
          </div>
        </div>
        <!-- undertext  -->
        <div class="flex items-center justify-end mb-1 text-xs">
          <p class="pl-14 pr-8">{{ propCountry }}</p>
          <p class="pl-12 pr-8">Temperature</p>
          <p class="pl-12 pr-8">Humidity</p>
          <p class="pl-12 pr-6">Wind Speed</p>
        </div>
      </div>
    </div>

    <!-- Hourly Weather -->
    <div
      class="w-[calc(100% - 1px)] pb-2 ml-6 mr-4 text-white flex gap-14 example overflow-x-scroll"
    >
      <!-- hour NOW div -->
      <div class="flex flex-col gap-2 items-center">
        <p class="whitespace-nowrap text-sm">Now</p>
        <img
          class="w-auto h-[32px] object-cover"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
        <p class="text-sm">{{ Math.round(weatherData.current.temp) }}&deg</p>
      </div>
      <!-- loading other divs with for -->
      <div
        v-for="hourData in weatherData.hourly"
        :key="hourData.dt"
        class="flex flex-col gap-2 items-center"
      >
        <p class="whitespace-nowrap text-sm">
          {{
            new Date(hourData.currentTime + 60 * 60 * 1000).toLocaleTimeString(
              "ro-RO",
              {
                hour: "numeric",
              }
            )
          }}
        </p>
        <img
          class="w-auto h-[30px] object-cover"
          :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`"
          alt=""
        />
        <p class="text-sm">{{ Math.round(hourData.temp) }}&deg;</p>
      </div>
    </div>
  </div>

  <!-- 3/7 Days Weather -->
  <ForecastWeek :weeklyWeatherData="weeklyWeatherData" />

  <!-- Saved Cities -->
  <SavedCities @saved-city-clicked="handleSavedCityClick" />
</template>

<script setup>
import ForecastWeek from "./ForecastWeek.vue";
import SavedCities from "./SavedCities.vue";
import axios from "axios";
import { ref, defineProps, defineEmits } from "vue";
const emit = defineEmits(['triggerPropsKey']);


const props = defineProps(["city", "country", "lat", "lon"]);

console.log("-----");
console.log(props.city, props.country, props.lat, props.lon);


const propCity = ref(props.city);
const propCountry = ref(props.country);
const propLat = ref(props.lat);
const propLon = ref(props.lon);

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${propLat.value}&lon=${propLon.value}&exclude={part}&appid=f4438a9de32c7d28cbb6cff310a0108f&units=metric`
    );

    // call current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // call hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    console.log(
      "---getWeatherData function, whole response.data object with local time on machine offset----"
    );
    console.log(weatherData);
    console.log(weatherData.data);

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
var weatherData= await getWeatherData();

const weeklyWeatherData = ref([]);

// week forecast
//slicing array for 7 days
if (weatherData) {
  weeklyWeatherData.value = await Array.from(weatherData.daily).slice(1, 8);
}

//saved cities
const onSavedCityClick = async (hardcodedCity) => {
  console.log("hardcoded city");

  propCity.value = hardcodedCity.city;
  propCountry.value = hardcodedCity.country;
  propLat.value = hardcodedCity.lat;
  propLon.value = hardcodedCity.lon;
  const newWeatherData = await getWeatherData();
  return newWeatherData;
};

const componentKey =ref(0);
const forceRerender = () =>{
  componentKey.value++;
}

const handleSavedCityClick = async(hardcodedCity) =>{
  weatherData = await onSavedCityClick(hardcodedCity);
  forceRerender();
  console.log(weatherData);
  emit('triggerProps', {"propCity":propCity.value, "propCountry":propCountry.value, "propLat":propLat.value, "propLon":propLon.value});
}

</script>

<style scoped>
.example::-webkit-scrollbar {
  display: none;
}
.scrollbar {
  height: 174px;
  width: 100%;
  overflow: auto;
  padding-right: 10px;
}
/*       ScrollBar 1        */

::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  border-radius: 8px;
  background-color: #1e1e26;
  border: 1px solid #3f3f46;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  border: 3px solid transparent;
  background-clip: content-box;
  background-color: #c8e9ea;
}
</style>
