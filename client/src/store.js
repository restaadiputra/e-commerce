import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    signin: localStorage.getItem('token') ? true : false,
    fullname: localStorage.getItem('fullname') ? localStorage.getItem('fullname') : '',
    userRole: 'admin'
    // userRole: localStorage.getItem('role') ? localStorage.getItem('role') : ''
  },
  mutations: {
    // mutateRoom(state, roomObj) {
    //   state.roomList.push(roomObj);
    // },
    mutateSigninStatus(state, status) {
      state.signin = status;
    },

    mutateFullname(state, fullname) {
      state.fullname = fullname;
    }

  },
  actions: {
    // changeStatusSignin({ commit }, status) {
    //   commit('mutate')
    // }
    // createRoom({ commit }, dataObj) {
    //   commit('mutateRoom', dataObj)
    // },

    
  },
});
