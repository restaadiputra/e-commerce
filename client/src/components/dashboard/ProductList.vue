<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row my-4 mx-2">
      <div class="col-sm-12">
        <h3><b>Product List</b></h3>
        <hr>
      </div>
      
        <div v-for="(product, index) in products" :key="index" class="col-lg-4 col-md-6 mb-4">
        <div class="card h-100 card_item">
          <a v-on:click="getProductDetail(product._id)">
            <img class="card-img-top" v-bind:src="product.image" v-bind:alt="product.name"
            width="700">
          </a>
          <div class="card-body">
            <h4 class="card-title">
              <a v-on:click="getProductDetail(product._id)">{{ product.name }}</a>
            </h4>
            <h5>Price: ${{ product.price }}</h5>
            <h5>Stock: {{ product.stock }} pcs</h5>
          </div>
        </div>
      </div>
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
    const token = localStorage.getItem('token');
    this.$axios
      .get('/products', {
        headers: {
          token: token
        }
      })
      .then(({ data }) => {
        console.log(data)
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
      loading: false,
    }
  },
  methods: {
    getProductDetail(id) {
      this.$emit('editProduct', id)
    }
  }
}
</script>
