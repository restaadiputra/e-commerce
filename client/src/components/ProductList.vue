<template>
  <div class="col-lg-12">
    <div class="row">
      <Loading v-if="loading" />
      <!-- Product Card -->
      <div v-for="(product, index) in products" :key="index" class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 card_item">
          <router-link :to="'/products/' + product._id ">
            <img class="card-img-top" v-bind:src="product.image" v-bind:alt="product.name"
            width="700">
          </router-link>
          <div class="card-body">
            <h4 class="card-title">
              <router-link :to="'/products/' + product._id ">{{ product.name }}</router-link>
            </h4>
            <h5>${{ product.price }}</h5>
            <p class="card-text">{{ product.description.slice(0, 100) }}...</p>
          </div>
        </div>
      </div>
      <!-- Product Card -->
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'product-list',
  components: {
    Loading,
  },
  created() {
    this.loading = !this.loading;
    this.$axios
      .get('/products')
      .then(({ data }) => {
        this.products = data
        this.loading = !this.loading;
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
  }, 
  data() {
    return {
      products: [],
      loading: false
    }
  }
};
</script>
