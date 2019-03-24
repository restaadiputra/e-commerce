<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white mb-4">
    <div class="container">
      <a class="navbar-brand" href="#">logo</a>
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
          <li class="nav-item active">
            <a class="nav-link" href="#">
              <span class="sr-only">(current)</span>
            </a>
          </li>

          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >Category</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">cat1</a>
              <a class="dropdown-item" href="#">cat2</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">cat3</a>
            </div>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="./login-register.html">Sign in</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="#">
              <i class="fas fa-shopping-cart"></i>Cart
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
