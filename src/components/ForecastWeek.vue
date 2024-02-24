<template>
  <!-- 3/7 Days Weather -->
  <div
    v-if="receivedArrayLength == '0'"
    class="shadow-md rounded-3xl bg-custom-black-bg-container h-60 ring-2 ring-zinc-700"
  >
    <br />
    <br /><br /><br />
    <p class="flex justify-center items-center text-2xl">
      Search for a city to see the forecast for 3 or 7 days!
    </p>
  </div>

  <div
    v-else
    class="shadow-md rounded-3xl bg-custom-black-bg-container pb-1 ring-2 ring-zinc-700"
  >
    <div class="mx-8 text-white font-Helvetica">
      <!-- Title and toggle switch -->
      <div class="flex justify-between items-baseline mb-1">
        <h2 class="mb-2 pt-2 text-3xl">Forecast</h2>

        <label class="flex cursor-pointer select-none items-center">
          <div class="relative z-0">
            <input
              type="checkbox"
              class="sr-only"
              @change="handleCheckboxChange"
            />
            <div
              class="flex h-8 w-36 rounded-full bg-[#1e1e26] justify-evenly items-center"
            >
              <p :class="{ ' text-[#0f2027] ': !isChecked }" class="z-20">
                3 Days
              </p>
              <p :class="{ ' text-[#0f2027] ': isChecked }" class="z-20">
                7 Days
              </p>
            </div>
            <div
              :class="{ 'translate-x-full !bg-primary': isChecked }"
              class="dot absolute z-10 left-2 top-1 h-6 w-16 rounded-full bg-[#c8e9ea] transition"
            ></div>
          </div>
        </label>
      </div>
      <!-- Day elements -->
      <div
        class="h-36 mb-1 flex-col overflow-y-scroll scroll-padding"
        :class="{ scrollbar: isChecked, example: !isChecked }"
      >
        <div
          v-for="day in receivedWeeklyWeatherData"
          :key="day.dt"
          class="w-5/5 flex items-center justify-normal bg-custom-black-bg-elements rounded-xl mb-2 mr-3"
          @click="handleSingleDayForecast(day)"
        >
          <img
            class="w-[40px] h-[40px] object-cover justify-start"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex ml-2 flex-1 justify-start items-baseline">
            <p class="text-xl">{{ Math.round(day.temp.max) }}&deg;</p>
            <p class="text-sm">/ {{ Math.round(day.temp.min) }}&deg;</p>
          </div>

          <div class="flex justify-self-end pr-4 items-baseline">
            <p class="text-3xl">{{ new Date(day.dt * 1000).getDate() }}</p>
            &nbsp;&nbsp;
            <p class="text-xs">
              {{
                monthNames[new Date(day.dt * 1000).getMonth()].substring(0, 3)
              }},
              {{
                (date = new Date(day.dt * 1000).toLocaleDateString("en-us", {
                  weekday: "long",
                })).substring(0, 3)
              }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, defineProps } from "vue";

const props = defineProps(["weeklyWeatherData"]);

//toggle switch in 3-7 days forecast
const isChecked = ref(false);
const dayLimit = ref(3);

const receivedWeeklyWeatherData = ref(props.weeklyWeatherData);
receivedWeeklyWeatherData.value = props.weeklyWeatherData.slice(0, 3);
const receivedArrayLength = ref(receivedWeeklyWeatherData._rawValue.length);

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

const handleCheckboxChange = () => {
  isChecked.value = !isChecked.value;

  if (dayLimit.value === 3) {
    dayLimit.value = 7;
  } else {
    dayLimit.value = 3;
  }
};

//slicing array for 3 days
watch(
  () => dayLimit.value,
  async (newCount, oldCount) => {
    receivedWeeklyWeatherData.value = props.weeklyWeatherData.slice(
      0,
      newCount
    );
  }
);

//click on day in forecast
//don't show 3/7 days ---> show 'go back' button in that place instead
//show date from the day near forecast
//show details of the day instead of days

const showSingleDayForecast = ref(false);
const selectedDayWeatherData = ref(null);

const handleSingleDayForecast = (dayData) => {
  selectedDayWeatherData.value = dayData;
  showSingleDayForecast.value = !showSingleDayForecast.value;
    console.log("handle single day forecast-------------");

  console.log(selectedDayWeatherData.value);
  console.log(showSingleDayForecast.value);

};




</script>

<style>
/*       ScrollBar 1        */
.example::-webkit-scrollbar {
  display: none;
}

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
