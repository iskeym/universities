<template>
    <div class="filter">
      <input type="text" v-model="searchUniversityText" placeholder="Search university...">
      <input type="text" v-model="searchText" placeholder="Search country...">
      <select @change="updateCountry" v-model="country">
        <option v-for="country in filteredCountries" :value="country">{{ country }}</option>
      </select>
    </div>
  </template>
  
<script>
  export default {
    data() {
      return {
        countries: [],
        country: '',
        searchText: '',
        searchUniversityText: '',
      };
    },
    computed: {
      filteredCountries() {
        return this.countries.filter(country => country.toLowerCase().includes(this.searchText.toLowerCase()));
      },
    },
    methods: {
      async updateCountry(event) {
        this.country = event.target.value;
        this.$emit('update-country', this.country);
      },
    },
  };
  </script>
  