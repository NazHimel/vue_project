import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Coins from '@/components/Coins.vue'
import User from '@/components/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/add-user',
      name: 'User',
      component: User
    },
    {
      path: '/coins/:id',
      name: 'Coins',
      component: Coins
    }
  ]
})
