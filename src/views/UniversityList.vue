<template>
    <div>
      <div class="filter">
        <input type="text" v-model="searchUniversityText" placeholder="Search university...">
        <input type="text" v-model="searchText" placeholder="Search country...">
        <select @change="updateCountry" v-model="country">
          <option v-for="country in filteredCountries" :value="country">{{ country }}</option>
        </select>
      </div>
      <h1 v-if="loading">Идёт загрузка...</h1>
      <ul v-else>
        <li v-for="(university, index) in paginatedUniversities" :key="index">
          <a :href="university.web_pages[0]">{{ university.name }}</a>
        </li>
        <div>
          <button v-for="page in displayedPages" :key="page" @click="changePage(page)" :disabled="page === currentPage">
            {{ page }}
          </button>
        </div>
      </ul>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        universities: [],
        loading: true,
        currentPage: 1,
        itemsPerPage: 10,
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
      paginatedUniversities() {
        const filteredUniversities = this.universities.filter(university => university.name.toLowerCase().includes(this.searchUniversityText.toLowerCase()));
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, filteredUniversities.length);
        return filteredUniversities.slice(startIndex, endIndex);
      },
      pageCount() {
        return Math.ceil(this.universities.length / this.itemsPerPage);
      },
      displayedPages() {
        const totalPageCount = this.pageCount;
        let start = Math.max(1, this.currentPage - 5);
        let end = Math.min(totalPageCount, start + 9);
        if (end - start < 9) {
          start = Math.max(1, end - 9);
        }
        return Array.from({ length: end - start + 1 }, (v, k) => k + start);
      }
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
    async changePage(page) {
      this.loading = true;
      try {
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${this.country}&_page=${page}&_limit=10`);
        this.universities = response.data;
        this.currentPage = page;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },
    async updateCountry(event) {
    this.country = event.target.value;
    this.currentPage = 1; // Установка текущей страницы на 1 при смене страны
    try {
      const response = await axios.get(`http://universities.hipolabs.com/search?country=${this.country}&_page=1&_limit=10`);
      this.universities = response.data;
    } catch (error) {
      console.error(error);
    } finally {
      this.loading = false;
    }
}
  }
  };
  </script>
  