<template>
    <div>
        <h1 v-if="loading">Идёт загрузка...</h1>
        <ul v-else>
            <li v-for="(university, index) in favorites" :key="index">
                <a :href="university.web_pages[0]">{{ university.name }}</a> - <p>{{ university.country }}</p>
                <HeartBtn :isFavorite="true" @toggleFavorite="removeUniversity(university)"/>
            </li>
        </ul>
    </div>
</template>

<script>
import HeartBtn from "@/components/UI/HeartBtn.vue";

export default{
    components: {
        HeartBtn
    },
    data() {
        return {
            favorites: [],
            loading: false,
            university: { name: '', country: '', web_pages: [] }
        }
    },
    mounted() {
        this.favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const index = this.favorites.findIndex(item => item.name === this.university.name);
    },
    methods: {
        removeUniversity(university) {
            this.favorites = this.favorites.filter(item => item.name !== university.name);
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        }
    }
}
</script>
