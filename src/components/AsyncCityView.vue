<template>
  <div
    v-if="!weatherData"
    class="shadow-md rounded-3xl bg-custom-black-bg-container h-60 mb-4 ring-2 ring-zinc-700"
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
    class="shadow-md rounded-3xl bg-custom-black-bg-container mb-4 ring-2 ring-zinc-700"
  >
    <!-- div for icon + weather data -->
    <div class="flex">
      <!-- icon  -->
      <div class="w-1/5 h-full">
        <img
          class="w-full h-auto"
          :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt=""
        />
      </div>
      <!-- div for weather data + undertext -->
      <div class="w-4/5 h-full flex flex-col">
        <!-- main data -->
        <div class="flex justify-around mb-4 mt-6 items-end">
          <h1 class="text-3xl">{{ props.city }}</h1>

          <h1 class="text-4xl">
            {{ Math.round(weatherData.current.temp) }}&deg
          </h1>

          <div class="flex items-baseline">
            <h1 class="text-4xl">
              {{ Math.round(weatherData.current.humidity) }}
            </h1>
            <p class="text-xs">%</p>
          </div>

          <div class="flex items-baseline">
            <h1 class="text-4xl">
              {{ Math.round(weatherData.current.wind_speed) }}
            </h1>
            <p class="text-xs">km/h</p>
          </div>
        </div>
        <!-- undertext  -->
        <div class="flex items-center justify-end mb-1 text-xs">
          <p class="pl-14 pr-8">{{ props.country }}</p>
          <p class="pl-12 pr-8">Temperature</p>
          <p class="pl-12 pr-8">Humidity</p>
          <p class="pl-12 pr-6">Wind Speed</p>
        </div>
      </div>
    </div>

    <!-- Hourly Weather -->
    <div
      class="w-[calc(100% - 1px)] pt-1 pb-4 ml-6 mr-4 text-white flex gap-14 example overflow-x-scroll"
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
            new Date(hourData.currentTime).toLocaleTimeString("ro-RO", {
              hour: "numeric",
            })
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
  <div
    v-if="!weatherData"
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
      <div class="flex justify-between items-baseline mb-3">
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
      <div class="h-44 mb-2 flex-col overflow-y-scroll scrollbar"
      :class="{ 'scrollbar': isChecked }">
        <div
          v-for="day in weeklyWeatherData"
          :key="day.dt"
          class="w-5/5 flex items-center justify-normal bg-custom-black-bg-elements rounded-xl mb-2"
        >
          <img
            class="w-[50px] h-[50px] object-cover justify-start"
            :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
            alt=""
          />
          <div class="flex ml-2 flex-1 justify-start items-baseline">
            <p class="text-xl">{{ Math.round(day.temp.max) }}&deg;</p>
            <p class="text-sm">/ {{ Math.round(day.temp.min) }}&deg;</p>
          </div>

          <div class="flex justify-self-end pr-4 items-baseline">
           <p class=" text-3xl ">{{ new Date(day.dt * 1000).getDate() }}</p> 
           &nbsp;&nbsp;
            <p class=" text-xs">
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
import axios from "axios";
import { ref, defineProps, watch } from "vue";

const props = defineProps(["city", "country", "lat", "lon"]);

console.log("-----");
console.log(props.city, props.country, props.lat, props.lon);

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
    console.log("---getWeatherData function----");
    console.log(weatherData.data);

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

//toggle switch in 3-7 days forecast
const isChecked = ref(false);
const dayLimit = ref(3);
const weeklyWeatherData = ref([]);
const forecastContainer = ref(null);
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

//slicing array for 7 days
if (weatherData) {
  weeklyWeatherData.value = await Array.from(weatherData.daily).slice(
    1,
    dayLimit.value + 1
  );
}

//slicing array for 3 days
watch(
  () => dayLimit.value,
  async (newCount, oldCount) => {
    weeklyWeatherData.value = Array.from(weatherData.daily).slice(
      1,
      newCount + 1
    );
    console.log(weeklyWeatherData.value);
  }
);
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
.masked-overflow {
  /* scroll bar width, for use in mask calculations */
  --scrollbar-width: 16px;
  /* mask fade distance, for use in mask calculations */
  --mask-height: 20px;

  /* If content exceeds height of container, overflow! */
  overflow-y: auto;

  /* Our height limit */
  height: 176;

  /* Need to make sure container has bottom space,
  otherwise content at the bottom is always faded out */
  padding-bottom: var(--mask-height);
  padding-top: 4px;

  /* Keep some space between content and scrollbar */
  padding-right: 10px;

  /* The CSS mask */

  /* The content mask is a linear gradient from top to bottom */
  --mask-image-content: linear-gradient(
    to bottom,
    transparent,
    black var(--mask-height),
    black calc(100% - var(--mask-height)),
    transparent
  );

  /* Here we scale the content gradient to the width of the container 
  minus the scrollbar width. The height is the full container height */
  --mask-size-content: calc(100% - var(--scrollbar-width)) 100%;

  /* The scrollbar mask is a black pixel */
  --mask-image-scrollbar: linear-gradient(black, black);

  /* The width of our black pixel is the width of the scrollbar.
  The height is the full container height */
  --mask-size-scrollbar: var(--scrollbar-width) 100%;

  /* Apply the mask image and mask size variables */
  mask-image: var(--mask-image-content), var(--mask-image-scrollbar);
  mask-size: var(--mask-size-content), var(--mask-size-scrollbar);

  /* Position the content gradient in the top left, and the 
  scroll gradient in the top right */
  mask-position: 0 0, 100% 0;

  /* We don't repeat our mask images */
  mask-repeat: no-repeat, no-repeat;
}
</style>
