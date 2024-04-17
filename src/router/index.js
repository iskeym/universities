import { createRouter, createWebHistory } from 'vue-router'
import UniversityList from '@/views/UniversityList.vue'
import Favourites from '@/views/Favourites.vue'

const routes = [
  {
    path: '/',
    component: UniversityList
  },
  {
    path: '/favourites',
    component: Favourites
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
