<template>
  <div>
    <Filter @update-country="updateCountry" @update-search-text="updateSearchText"></Filter>
    <h1 v-if="loading">Идёт загрузка...</h1>
    <ul v-else>
      <li v-for="(university, index) in paginatedUniversities" :key="index">
        <a :href="university.web_pages[0]">{{ university.name }}</a> - <p>{{ university.country }}</p>
        <HeartBtn :isFavorite="checkFavorite(university)" @toggleFavorite="toggleFavorite(university)"/>
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
import Filter from '@/components/Filter.vue';
import HeartBtn from '@/components/UI/HeartBtn.vue';

export default {
  components: {
    Filter,
    HeartBtn
  },
  data() {
    return {
      universities: [],
      loading: true,
      currentPage: 1,
      itemsPerPage: 10,
      countries: [],
      country: ''
    };
  },
  computed: {
    paginatedUniversities() {
      const filteredUniversities = this.universities
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
      this.loading = false;
    } catch (error) {
      console.error(error);
      this.loading = false;
    }
  },
  methods: {
    updateSearchText(event) {
      this.currentPage = 1;
      this.searchUniversityText = event;
      this.universities = this.universities.filter(university => {
        return university.name.toLowerCase().includes(this.searchUniversityText ? this.searchUniversityText.toLowerCase() : '');
      });
    },
    checkFavorite(university) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const index = favorites.findIndex(item => item.name === university.name);
      
      if (index !== -1) {
        return true
      } else {
        return false
      }
    },
    toggleFavorite(university) {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const index = favorites.findIndex(item => item.name === university.name);
      
      if (index !== -1) {
        favorites.splice(index, 1);
      } else {
        favorites.push(university);
      }

      localStorage.setItem('favorites', JSON.stringify(favorites));
      console.log(favorites);
    },
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
      this.currentPage = 1;
      try {
        const response = await axios.get(`http://universities.hipolabs.com/search?country=${event}&_page=1&_limit=10`);
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