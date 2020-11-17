import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
import filmRouter from '@/router/routers/film.js'
import cinemaRouter from '@/router/routers/cinema.js'
import centerRouter from '@/router/routers/center.js'
const routes = [


  filmRouter,
  cinemaRouter,
  centerRouter,

  {
    path: '/',
    redirect: '/film'
    // name: 'Home',
    // component: Home
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
