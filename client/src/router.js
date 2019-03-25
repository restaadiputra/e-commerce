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
      path: '/secret/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "admin" */ './views/AdminLogin.vue')
    },
    {
      path: '/products/:id',
      name: 'product-detail',
      component: () => import(/* webpackChunkName: "product-detail" */ './views/ProductDetail.vue'),
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import(/* webpackChunkName: "carts" */ './views/CartDetail.vue'),
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import(/* webpackChunkName: "signin" */ './views/Signin.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import(/* webpackChunkName: "register" */ './views/Register.vue'),
    },
    
    {
      path: '/admin/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ './views/Dashboard.vue'),
    },
    {
      path: '*',
      name: 'not-found',
      component: () => import(/* webpackChunkName: "not-found" */ './views/NotFound.vue'),
    },
  ],
  
});

router.beforeEach((to, from, next) => {
  if (
    to.fullPath === '/' ||
    to.fullPath === '/signin' ||
    to.fullPath === '/register') {
    if(store.state.signin && store.state.role === 'admin') {
      next('/admin/dashboard');
    } else {
      store.commit('mutateRole', 'customer');
    }
  }
  if (
    to.fullPath === '/admin/signin' ||
    to.fullPath === '/secret/admin' ) {
    if(store.state.signin && store.state.role === 'admin') {
      next('/admin/dashboard');
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