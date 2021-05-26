import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue')
  },  
  {
    path: '/audiobooks',
    name: 'audiobooks',
    component: () => import('../views/Audiobooks.vue')
  },
  {
    path: '/audiobooks/:id',
    name: 'audiobook',
    component: () => import('../views/Audiobook.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
