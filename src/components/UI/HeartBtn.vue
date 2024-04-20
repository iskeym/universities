<!-- <template>
    <button :class="{ green: isFavorite }" @click="addToFavorites">
        <font-awesome-icon :icon="['far', 'heart']" />
        <font-awesome-icon :icon="['fas', 'heart']" />
    </button>
</template>

<script>
export default {
  props: ['university'],
  computed: {
    isFavorite() {
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      return favorites.includes(this.university);
    }
  },
  methods: {
    addToFavorites() {
      this.$emit('add-to-favorites', this.university);
    }
  }
};
</script>

<style>
.green {
  background-color: green;
}
</style> -->

<template>
    <button :class="{ green: isFavorite }" @click="addToFavorites">Add to Favorites</button>
  </template>
  
  <script>
  export default {
    props: ['university'],
    computed: {
      isFavorite() {
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        return favorites.includes(this.university);
      }
    },
    methods: {
      addToFavorites() {
        this.$emit('add-to-favorites', this.university);
      }
    }
  };
  </script>
  
  <style>
  .green {
    background-color: green;
  }
  </style>
  