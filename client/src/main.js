import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from './api/axios';
import swal from 'sweetalert';

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
Vue.prototype.$swal = swal

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app');
