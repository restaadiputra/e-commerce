<template>
  <div v-bind:class="{toggled: toggled}" class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-light border-right position-sticky" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <a v-on:click="changeView('MainDashboard')" class="list-group-item list-group-item-action bg-light">Dashboard</a>
        <a v-on:click="changeView('ProductList')" class="list-group-item list-group-item-action bg-light">Product List</a>
        <a v-on:click="changeView('EditorProduct')" class="list-group-item list-group-item-action bg-light">Add Product</a>
      </div>
    </div>
    <!-- Sidebar -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <transition name="fade" mode="out-in">
        <component v-bind:is="view"></component>
      </transition>
    </div>
    <!-- Page Content -->
  </div>
</template>
<script>
import MainDashboard from "@/components/dashboard/MainDashboard.vue";
import ProductList from "@/components/dashboard/ProductList.vue";
import EditorProduct from "@/components/dashboard/EditorProduct.vue";

export default {
  name: 'dashboard',
  components: {
    MainDashboard,
    ProductList,
    EditorProduct
  },
  data () {
    return {
      view: 'MainDashboard',
      toggled: false,
      productId: ''
    }
  },
  mounted() {
    this.$root.$on('toogleSidebar', () => {
      this.toggled = !this.toggled
    });
  },
  methods: {
    toggleSidebar() {
      this.toggled = !this.toggled
    },
    changeView(view) {
      this.view = view
    }
  }
}
</script>
<style>
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

#sidebar-wrapper {
  min-height: 100vh;
  margin-left: -15rem;
  -webkit-transition: margin .25s ease-out;
  -moz-transition: margin .25s ease-out;
  -o-transition: margin .25s ease-out;
  transition: margin .25s ease-out;
}

#sidebar-wrapper .sidebar-heading {
  padding: 0.875rem 1.25rem;
  font-size: 1.2rem;
}

#sidebar-wrapper .list-group {
  width: 15rem;
}

#page-content-wrapper {
  min-width: 100vw;
}

#wrapper.toggled #sidebar-wrapper {
  margin-left: 0;
}

@media (min-width: 768px) {
  #sidebar-wrapper {
    margin-left: 0;
  }

  #page-content-wrapper {
    min-width: 0;
    width: 100%;
  }

  #wrapper.toggled #sidebar-wrapper {
    margin-left: -15rem;
  }
}

</style>


