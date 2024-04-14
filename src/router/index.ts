import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

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
      path: '/Register',
      name: 'Register',
  
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/User',
      name: 'User',

      component: () => import('../views/UserView.vue')
    }
  ]
})

export default router
