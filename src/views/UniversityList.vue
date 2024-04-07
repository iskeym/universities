<template>
    <div>
      <ul v-if="loading">
        <li>Идет загрузка...</li>
      </ul>
      <ul v-else>
        <li v-for="(university, index) in paginatedUniversities" :key="index">
          {{ university.name }}
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
        itemsPerPage: 10
      };
    },
    computed: {
      paginatedUniversities() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = Math.min(startIndex + this.itemsPerPage, this.universities.length);
        return this.universities.slice(startIndex, endIndex);
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
          const response = await axios.get(`http://universities.hipolabs.com/search?_page=${page}&_limit=10`);
          this.universities = response.data;
          this.currentPage = page;
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  