import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import store from './store';

Vue.use(Router);

const router = new Router({
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

router.beforeEach((to, from, next) => {
  if (
    to.fullPath === '/' ||
    to.fullPath === '/signin' ||
    to.fullPath === '/register') {
    if(store.state.signin && store.state.role === 'admin') {
      next('/dashboard');
    } else {
      store.commit('mutateRole', 'customer');
    }
  }
  if (
    to.fullPath === '/admin/signin' ||
    to.fullPath === '/secret/admin' ) {
    if(store.state.signin && store.state.role === 'admin') {
      next('/dashboard');
    } else if(store.state.signin && store.state.role === 'customer') {
      next('/');
    } else {
      store.commit('mutateRole', 'admin');
    }
  }
  if(to.fullPath === '/admin/dashboard') {
    if(!store.state.signin && store.state.role !== 'admin') {
      next('/secret/admin')
    }
  }
  next();
});


export default router;