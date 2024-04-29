<template>
    <div class="filter">
      <input type="text" v-model="searchUniversityText" @input="updateSearchText" placeholder="Search university...">
      <input type="text" v-model="searchText" placeholder="Search country...">
      <select @change="updateCountry" v-model="country">
        <option value=""></option>
        <option v-for="country in filteredCountries" :value="country">{{ country }}</option>
      </select>
    </div>
  </template>
  
<script>
  import axios from 'axios';

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
    async mounted() {
      try {
        const response = await axios.get('http://universities.hipolabs.com/search?_limit=10');
        this.universities = response.data;
        this.countries = [...new Set(this.universities.map(university => university.country))];
        console.log(this.countries);
        this.loading = false;
      } catch (error) {
        console.error(error);
        this.loading = false;
      }
    },
    methods: {
      async updateCountry(event) {
        this.country = event.target.value;
        this.$emit('update-country', this.country);
      },
      async updateSearchText(event) {
        this.searchUniversityText = event.target.value;
        this.$emit('update-search-text', this.searchUniversityText);
      }
    },
  };
</script>
  