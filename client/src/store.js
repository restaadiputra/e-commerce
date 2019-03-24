import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signin: localStorage.getItem('token') ? true : false,
    fullname: localStorage.getItem('fullname') ? localStorage.getItem('fullname') : '',
    role: localStorage.getItem('role') ? localStorage.getItem('role') : 'customer'
  },
  mutations: {
    mutateSigninStatus(state, data) {
      state.signin = data.signin;
      state.fullname = data.fullname;
      state.role = data.role;
    },
    mutateRole(state, role) {
      state.role = role
    }
  },
  actions: {
    // changeStatusSignin({ commit }, status) {
    //   commit('mutate')
    // }
    
  },
});
