<template>
  <div class="relative w-[132px] shadow-md rounded-3xl bg-custom-black-bg-container pb-1 ring-2 ring-zinc-700 flex flex-col items-center my-1 px-8 pt-2">
    <div
        class="-mt-5 dot absolute z-10 h-7 w-7 rounded-full bg-[#285e60] "
      > <img
            class="w-[30px] h-[30px] "
            :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
            alt=""
          /></div>
    <p class="text-md mt-3">{{ props.city }}</p>
    <p class="text-xs mb-2">{{ props.country }}</p>
    <div class="pt-3 flex flex-row items-baseline">
        <p class=" text-3xl mr-2">{{ Math.round(maxTemp) }}&deg;</p>
        <p class=" text-sm mb-1">/{{ Math.round(minTemp) }}&deg;</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, defineProps } from "vue";

const props = defineProps(["city", "country", "lat", "lon"]);

//din weatherdata.data.daily[0].temp.min/.max

const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${props.lat}&lon=${props.lon}&exclude={part}&appid=f4438a9de32c7d28cbb6cff310a0108f&units=metric`
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


    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const minTemp = ref(weatherData.daily[0].temp.min);
const maxTemp = ref(weatherData.daily[0].temp.max);

//console.log("inside BaseSavedCity");
</script>

<style scoped></style>
