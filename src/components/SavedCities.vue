<template>
  <div class="h-auto my-2 flex justify-start gap-4 py-2">
    <!-- add a city, feature to be worked on -->
    <div
      class="relative shadow-md rounded-3xl pb-1 border-dashed border-2 border-weather-secondary ring- flex flex-col items-center my-1 px-5 py-2"
    >
      <div class="-mt-5 dot absolute z-10 h-7 w-7 rounded-full bg-[#456465]">
        <img
          class="w-[30px] h-[30px]"
          :src="`http://openweathermap.org/img/wn/02d@2x.png`"
          alt=""
        />
      </div>
      <p class="text-md mt-2">Add</p>
      <p class="text-xs mb-2">your city</p>
      <div class="pt-3 flex flex-row items-baseline">
        <p class="text-xl mr-2">hihi</p>
        <p class="text-sm mb-2">haha</p>
      </div>
    </div>
    <!-- v-for method for hardcodedCities -->
    <div class="" v-for="hardcodedCity in hardcodedCities"
    @click="$emit('saved-city-clicked', hardcodedCity)">
      <BaseSavedCity
        :city="hardcodedCity.city"
        :country="hardcodedCity.country"
        :lat="hardcodedCity.lat"
        :lon="hardcodedCity.lon"
      />
    </div>
  </div>
</template>

<script setup>
import BaseSavedCity from "./BaseSavedCity.vue";

let hardcodedCities = [
  {
    city: "Beijing",
    country: "China",
    lat: "39.906217",
    lon: "116.3912757",
  },
  {
    city: "Moscow",
    country: "Russia",
    lat: "55.7504461",
    lon: "37.6174943",
  },
  {
    city: "Washington",
    country: "UnitedStates",
    lat: "38.895037",
    lon: "-77.036543",
  },
  {
    city: "London",
    country: "England",
    lat: "51.507322",
    lon: "-0.127647",
  },
];

// i need a solution for saving cities for each user
//that means i should save that into a database (e.x. firebase) for each user
// --------- BUT, i should somehow make it work before i implement a database.

//i should fetch the savedCities object array in my database
//and output it here in this component.  ---Would look smth like this

//const savedCities = getCity = () =>{
//  get(firebaseurl/user/savedcities)
//  return savedCities = result.stringifyJSON
//}

//addCity = () =>{
//  post(firebaseurl/user/savedcities, cityData{})
//}    ------> this might be needed in another component

//when i get the cities object array, i list them with a v-for as divs
//in the template, and in each div i give the BaseSavedCity component
//the data through props (city, country, lat, lon)

//after that in each BaseSavedCity i fetch the Max&Min temperatures
// from the API based on lat&lon and output it inside of the component

//on pressing a BaseSavedCity (@click) i should emit an event to the parent component,
//and then, in the parent component i give through reactive props the data
//to the forecastToday component
</script>

<style scoped></style>
