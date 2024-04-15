import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/Home',
      name: 'home',

      component: () => import('../views/HomeView.vue')
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
      path: '/AddAct',
      name: 'AddAct',

      component: () => import('../views/AddActivityView.vue')
    },

    {
      path: '/DetailsActivities',
      name: 'DetailsActivities',

      component: () => import('../views/DetailsActivitiesView.vue')
    },
    {
      path: '/MyActivities/',
      name: 'MyActivities',

      component: () => import('../views/MyActivitiesView.vue'),
      props: true
    },
    {
      path: '/MyPerfil',
      name: 'MyPerfil',

      component: () => import('../views/MyPerfilView.vue')
    },

    {
      path: '/User',
      name: 'User',

      component: () => import('../views/UserView.vue')
    },
  ]
})

export default router
