import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/Detalles',
      name: 'Detalles',

      component: () => import('../views/DetallesActividad.vue')
    },
    {
      path: '/Agregar',
      name: 'Agregar',

      component: () => import('../views/RegistroActividad.vue')
    },
    {
      path: '/Act/:id',
      
      name: 'Act',
      meta: { requiresDirectAccess: true }, // Esta meta indica que la ruta requiere acceso directo

      component: () => import('../views/DetallesActividad.vue'),
      props: true
    },
    {
      path: '/Login',
      name: 'Login',

      component: () => import('../views/LoginUsuario.vue')
    },
    {
      path: '/error',
      name: 'error',

      component: () => import('../views/Error.vue')
    },
    {
      path: '/p',
      name: 'p',

      component: () => import('../views/Error.vue')
    },
    {
      path: '/Registro',
      name: 'Registro',

      component: () => import('../views/RegistroUsuario.vue')
    }
  ]
})

export default router
