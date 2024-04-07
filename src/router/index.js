import { createRouter, createWebHistory } from 'vue-router'
import UniversityList from '@/views/UniversityList.vue'

const routes = [
  {
    path: '/',
    component: UniversityList
  },
  {

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
