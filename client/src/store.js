import Vue from 'vue';
import Vuex from 'vuex';
import axios from './api/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signin: localStorage.getItem('token') ? true : false,
    fullname: localStorage.getItem('fullname') ? localStorage.getItem('fullname') : '',
    role: localStorage.getItem('role') ? localStorage.getItem('role') : 'customer',
    cartCount: 0
  },
  mutations: {
    mutateSigninStatus(state, data) {
      state.signin = data.signin;
      state.fullname = data.fullname;
      state.role = data.role;
      state.cartCount = data.cartCount;
    },
    mutateRole(state, role) {
      state.role = role;
    },
    mutateCartCount(state, num) {
      state.cartCount += num;
    }
  },
  actions: {
    // changeStatusSignin({ commit }, status) {
    //   commit('mutate')
    // }
    getCartCount({ commit }) {
      const token = localStorage.getItem('token');
      axios
        .get('/carts', {
          headers: {
            token: token
          }
        })
        .then(({ data }) => {
          console.log(data)
          commit('mutateCartCount', data.length)
        })
    }
    
  },
});
