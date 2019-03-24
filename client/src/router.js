import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue'),
    },
    {
      path: '/secret/admin',
      name: 'admin',
      component: () => import('./views/AdminLogin.vue')
    },
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
    },
  ],
});
