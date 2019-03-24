<template>
  <div id="app">
    <Navbar />
    <main>
      <transition
        name="fade"
        mode="out-in"
      >
      <router-view />
      </transition>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Navbar,
  },
  data() {
    return {
      signin: localStorage.getItem('token'),
      fullname: localStorage.getItem('token') ? localStorage.getItem('fullname') : '',

    };
  },
  created() {
    if(localStorage.getItem('token')) {
      this.$store.dispatch('getCartCount')
    } 
  },
  methods: {
    changeStatusToSignin() {
      this.signin = true;
      this.fullname = localStorage.getItem('fullname');
    },
    changeStatusToSignout() {
      this.signin = false;
    },
  },
};

</script>


<style>
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

.checked {
  color: orange;
}

.card_item {
  transition: transform .5s;
}

.card_item::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 2s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.15);
  content: '';
  opacity: 0;
  z-index: -1;
}

.card_item:hover,
.card_item:focus {
  transform: scale3d(1.006, 1.006, 1);
}

.card_item:hover::after,
.card_item:focus::after {
  opacity: 1;
}

.border-between > [class*='col-']:before,
.border-between > [class*='nav-item'] {
  background: #e3e3e3;
  bottom: 0;
  content: " ";
  left: 0;
  position: absolute;
  width: 1px;
  top: 0;
}

.border-between > [class*='col-']:first-child:before,
.border-between > [class*='nav-item']:first-child:before {
  display: none;
}
</style>
