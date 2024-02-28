<template>
  <div class="flex flex-col">
    <!-- go back and date -->
    <div class="flex flex-row justify-between items-baseline mt-2">
      <div
        class="flex flex-row items-center px-3 hover:bg-zinc-700 hover:rounded-lg"
        @click="$emit('goBackClicked')"
      >
        <i class="fa-solid fa-arrow-left mr-3 text-lg"></i>
        <p class="text-sm">Go Back</p>
      </div>
      <div class="flex flex-row items-baseline mr-5">
        <p class="text-xl">{{ dayOfTheWeek }},</p>
        <p class="text-xl pl-2">{{ day }} {{ month }}</p>
      </div>
    </div>

    <!-- icon and summary -->
    <div class="w-full flex flex-row">
      <div class="w-1/5">
        <img
          class="w-auto h-auto object-cover"
          :src="`http://openweathermap.org/img/wn/${dataProvided.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <div class="flex w-4/5 items-center justify-center text-center">
        <p class="text-lg" :class="{ ' text-md ': summaryTooLong }">
          {{ dataProvided.summary }}
        </p>
      </div>
    </div>

    <!-- weather data & undertext -->
    <div class="w-full flex flex-col mb-2 ">
      <!-- weather data -->
      <div class="w-full  flex items-center gap-4 justify-center">
        <div class="w-1/5 flex flex-row">
          <p class="text-2xl flex">
            {{ Math.round(dataProvided.temp.max) }}&deg;
          </p>
          <p>/</p>
          <p class="text-2xl flex">
            {{ Math.round(dataProvided.temp.min) }}&deg;
          </p>
        </div>
        <div class="w-1/5 flex flex-row items-baseline text-2xl">
          {{ sunrise }}
          <p class="text-xs pl-px">AM</p>
        </div>
        <div class="w-1/5 flex flex-row items-baseline text-2xl">
          {{ sunset }}
          <p class="text-xs pl-px">PM</p>
        </div>
        <div class="w-1/5 flex items-baseline">
          <h1 class="text-2xl">
            {{ Math.round(dataProvided.humidity) }}
          </h1>
          <p class="text-xs">%</p>
        </div>

        <div class="flex items-baseline ">
          <h1 class="text-2xl">
            {{ Math.round(dataProvided.wind_speed) }}
          </h1>
          <p class="text-xs">km/h</p>
        </div>
      </div>
      <!-- weather data undertext -->
      <div class="w-full mt-1 flex flex-row justify-center gap-5 text-emerald-50">
        <p class="w-1/5 text-sm">Max&deg; / Min&deg;</p>
        <p class="w-1/5 text-md">Sunrise</p>
        <p class="w-1/5 text-md">Sunset</p>
        <p class="w-1/5 text-md">Humidity</p>
        <p class=" text-md">Wind</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from "vue";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const props = defineProps(["selectedDayData"]);
const dataProvided = ref(props.selectedDayData);

const dt = ref(null);
dt.value = dataProvided.value.dt;

const day = ref(new Date(dt.value * 1000).getDate());
console.log("DAY");
console.log(day.value);
const month = ref(monthNames[new Date(dt.value * 1000).getMonth()]);
const dayOfTheWeek = ref(
  new Date(dt.value * 1000)
    .toLocaleDateString("en-us", {
      weekday: "long",
    })
    .substring(0, 3)
);

const summaryTooLong = ref(false);
if (dataProvided.value.summary.length > 50) {
  summaryTooLong.value = true;
}

const sunrise = ref(
  new Date(dataProvided.value.sunrise * 1000)
    .toLocaleTimeString()
    .substring(0, 4)
);
const sunset = ref(
  new Date(dataProvided.value.sunset * 1000)
    .toLocaleTimeString()
    .substring(0, 4)
);

console.log(sunrise.value);
</script>

<style scoped></style>
