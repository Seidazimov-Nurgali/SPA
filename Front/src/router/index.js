import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/store/AuthStore.js"
import Index from "@/views/Index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Auth/Login.vue'),
      meta: {
        forGuests: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Auth/Register.vue'),
      meta: {
        forGuests: true
      }
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../views/Auth/Register.vue'),
      meta: {
        forGuests: true
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: {
        forLogged: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: () => import('../views/Errors/404.vue')
    },
    {
      path: '/500',
      name: '500',
      component: () => import('../views/Errors/500.vue')
    },
    {
      path: '/posts',
      name: 'posts',
      component: () => import('../views/Posts/PostList.vue'),
      meta: {
        forLogged: true
      }
    },
    {
      path: '/posts/create',
      name: 'posts_create',
      component: () => import('../views/Posts/PostCreate.vue'),
      meta: {
        forLogged: true
      }
    },
    {
      path: '/posts/:id',
      name: 'posts_show',
      component: () => import('../views/Posts/PostShow.vue'),
      meta: {
        forLogged: true
      }
    },
    {
      path: '/posts/:id/edit',
      name: 'posts_edit',
      component: () => import('../views/Posts/PostEdit.vue'),
      meta: {
        forLogged: true
      }
    },
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.matched.some((record) => record.meta.forLogged) && !authStore.getAuth)
    next({name: 'login'})
  else if (to.matched.some((record) => record.meta.forGuests) && authStore.getAuth)
    next({name: 'dashboard'})
  else next()
})
export default router
