<template>
  <button @click="toggleFavorite">
      <font-awesome-icon v-if="localIsFavorite == false" :icon="['far', 'heart']" />
      <font-awesome-icon v-else :icon="['fas', 'heart']" />
  </button>
</template>

<script>
export default {
  props: {
      isFavorite: {
          type: Boolean,
          default: false
      }
  },
  data() {
      return {
          localIsFavorite: this.isFavorite
      };
  },
  methods: {
      toggleFavorite() {
          this.$emit('add-to-favorites', this.university);
          this.localIsFavorite = !this.localIsFavorite;
      }
  }
};
</script>