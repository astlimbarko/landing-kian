import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    beforeEnter: (to, from, next) => {
      window.location.href = 'https://landing-kian-auth.web.app'
    }
  },
  {
    path: '/calc',
    name: 'Calculator',
    beforeEnter: (to, from, next) => {
      window.location.href = 'https://landing-kian-calc.web.app'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router