import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import HomeView from '../views/HomeView.vue'
=======
>>>>>>> f2e928cd6ac19776431e30b3056470826a49e716

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
<<<<<<< HEAD
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
=======

    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/Vista',
      name: 'Vista',

      component: () => import('../views/ActividadesView.vue')
    },
    {
      path: '/Act/:id',
      name: 'Act',

      component: () => import('../views/ActividadView.vue'),
      props: true
    },
    {
      path: '/Login',
      name: 'Login',

      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/User',
      name: 'User',

      component: () => import('../views/UserView.vue')
    },
>>>>>>> f2e928cd6ac19776431e30b3056470826a49e716
  ]
})

export default router
