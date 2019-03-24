<template>
  <nav
    v-bind:class="getUserRole !== 'admin' ? 'navbar-light bg-white mb-4': 'navbar-dark bg-dark  sticky-top'" 
    class="navbar navbar-expand-lg">
    <div v-if="getUserRole !== 'admin'" class="container">
      <router-link class="navbar-brand" to="/">Corner Stone</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <form class="form-inline">
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="Search Product"
          aria-label="Search"
        >
      </form>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto my-lg-0">
          <li class="nav-item dropdown border-right">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Category</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link class="dropdown-item" to="/category1">Category 1</router-link>
              <router-link class="dropdown-item" to="/category2">Category 2</router-link>
              <router-link class="dropdown-item" to="/category3">Category 3</router-link>
            </div>
          </li>

          <li v-if="getSigninStatus" class="nav-item mx-3">
            <span class="navbar-text">{{ getUserFullname }}</span>
          </li>

          <li v-if="getSigninStatus" class="nav-item border-right"></li>

          <li v-if="getSigninStatus" class="nav-item border-right">
            <a v-on:click="signout" class="nav-link" to="/signin">Sign Out</a>
          </li>

          <li v-if="!getSigninStatus" class="nav-item border-right">
            <router-link class="nav-link" to="/signin">Sign In</router-link>
          </li>

          <li v-if="!getSigninStatus" class="nav-item border-right">
            <router-link class="nav-link" to="/register">Register</router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-shopping-cart"></i>Cart
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-if="getUserRole === 'admin'">
      <button v-on:click="toggleSidebar" class="btn btn-primary" id="menu-toggle"><i class="fas fa-bars"></i></button>
    </div>
  </nav>
</template>
<script>
export default {
  name: "navbar",
  computed: {
    getSigninStatus() {
      return this.$store.state.signin;
    },
    getUserFullname() {
      return this.$store.state.fullname;
    },
    getUserRole() {
      return this.$store.state.userRole;
    }
  },
  methods: {
    toggleSidebar() {
      this.$root.$emit('toogleSidebar');
    },
    signout() {
      localStorage.removeItem("token");
      localStorage.removeItem("fullname");
      this.$store.commit("mutateSigninStatus", false);
      this.$store.commit("mutateFullname", "");
      this.$router.push({
        path: "/"
      });
      this.$emit("signout");
    }
  }
};
</script>
