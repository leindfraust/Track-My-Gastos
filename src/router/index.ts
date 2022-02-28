import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import Clothing from '../views/Clothing.vue';
import Food from '../views/Food.vue'
import Essentials from '../views/Essentials.vue'
import Miscellaneous from '@/views/Miscellaneous.vue';
import About from '@/views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/clothing',
    name: 'ClothingNav',
    component: Clothing
  },
  {
    path: '/food',
    name: 'FoodNav',
    component: Food
  },
  {
    path: '/essentials',
    name: 'EssentialsNav',
    component: Essentials
  },
  {
    path: '/miscellaneous',
    name: 'MiscellaneousNav',
    component: Miscellaneous
  },
  {
    path: '/about',
    name: 'AboutNav',
    component: About
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
