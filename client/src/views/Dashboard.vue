<template>
  <div v-bind:class="{toggled: toggled}" class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <div class="bg-light border-right position-sticky" id="sidebar-wrapper">
      <div class="list-group list-group-flush">
        <router-link
        to="/admin/dashboard/add-admin"
        class="list-group-item list-group-item-action bg-light">
        Add Admin
        </router-link>
        <router-link
        to="/admin/dashboard/delivery-info"
        class="list-group-item list-group-item-action bg-light">
        Delivery Info
        </router-link>
        <router-link
        to="/admin/dashboard/editor?edit=new"
        class="list-group-item list-group-item-action bg-light">
        Add Product
        </router-link>
        <router-link
        to="/admin/dashboard/products"
        class="list-group-item list-group-item-action bg-light">
        Product List
        </router-link>
        <a v-on:click="signout()" class="list-group-item list-group-item-action bg-danger text-white">Sign Out</a>
      </div>
    </div>
    <!-- Sidebar -->

    <!-- Page Content -->
    <div id="page-content-wrapper">
      <transition name="fade" mode="out-in">
        <router-view 
        v-on:changeView="changeView"
        v-on:editProduct="editProduct"
        v-bind:productId="productId"
        ></router-view >
      </transition>
    </div>
    <!-- Page Content -->
  </div>
</template>
<script>

export default {
  name: 'dashboard',
  
  data () {
    return {
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
      console.log(view)
      if(view === 'EditorProduct') {
        this.productId = ''
      }
      this.view = view
    },
    editProduct(id) {
      this.productId = id
      this.$router.push({
        path: '/admin/dashboard/editor'
      })
    } ,
    signout() {
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      localStorage.removeItem("role")
      this.$store.commit('mutateSigninStatus', {
        signin: false,
        fullname: '',
        role: 'admin'
      });
      this.$router.push({
        path: "/secret/admin"
      });
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


