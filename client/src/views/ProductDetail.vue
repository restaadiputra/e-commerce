<template>
  <div class="container">
    <div class="row">
      <Loading v-if="loading" />
      <!-- Product Detail -->
      <div class="col-lg-12">
        <div class="row mb-4">

          <!-- Image -->
          <div class="col-12 col-lg-6">
            <a href="" data-toggle="modal" data-target="#productModal">
              <img class="img-fluid" v-bind:src="product.image" />
            </a>

            <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="productModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="productModalLabel">{{ product.name }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <img class="img-fluid" v-bind:src="product.image" />
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Image -->

          <!-- Detail -->
          <div class="col-12 col-lg-6">
            <!-- Title -->
            <h3 class="mb-4">{{ product.name }}</h3>

            <!-- Price -->
            <h4 class="mb-4">Price: <span>${{ product.price }}</span></h4>

            <hr>
            <div class="mb-4">
              <p>Shipping:</p>
              <p>Free Shipping</p>
            </div>
            <div class="mb-4">
              <p>Stock: {{ product.stock }}</p>
            </div>
            <hr>
            <!-- Quantity -->
            <div class="mb-4">
              <label>Quantity :</label>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button v-on:click="changeQty(-1)" type="button" class="btn btn-outline-secondary btn-number" data-type="minus" data-field="">
                    <i class="fa fa-minus"></i>
                  </button>
                </div>
                <input v-model="amount" type="text" class="form-control" id="quantity" name="quantity" min="1" v-bind:max="product.stock" value="1">
                <div class="input-group-append">
                  <button v-on:click="changeQty(1)" type="button" class="btn btn-outline-secondary btn-number" data-type="plus" data-field="">
                    <i class="fa fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Button -->
            <div class="mb-4">
              <button v-on:click="addToCart" class="btn btn-secondary mr-4">
                <i class="fa fa-shopping-cart"></i> Add To Cart
              </button>
              <router-link v-if="previewCart" class="btn btn-outline-secondary mr-4" :to="'/carts/'">
                <i class="fas fa-cart-plus"></i> View Cart
              </router-link>
            </div>

          </div>
        </div>

        <div class="row">
          <!-- Description -->
          <div class="col-12">
            <div class="card border-light mb-3">
              <div class="card-header bg-secondary text-white text-uppercase"><i class="fa fa-align-justify"></i> Description</div>
              <div class="card-body">
                <p class="card-text">
                  {{ product.description }}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'product-detail',
  components: {
    Loading,
  },
  data() {
    return {
      product: {
        _id: '',
        name: '',
        category: '',
        stock: 1,
        price: 1,
        description: '',
        image: ''
      },
      loading: false,
      amount: 1,
      previewCart: false,
    }
  },
  methods: {
    changeQty(amount) {
      if(this.amount + amount <= this.product.stock && this.amount + amount >= 1) {
        this.amount += amount
      }
    },
    getProductDetail() {
      this.loading = !this.loading;
      const token = localStorage.getItem('token');
      this.$axios
        .get(`/products/${this.$route.params.id}`, {
          headers: {
            token: token
          }
        })
        .then(({ data }) => {
          this.product = data
          this.mode = 'edit'
          this.loading = !this.loading;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }, 
    addToCart() {
      this.loading = !this.loading;
      const token = localStorage.getItem('token');
      const cartItem = {
        productId: this.product._id,
        amount: this.amount
      }

      this.$axios
        .post(`/carts`, cartItem, {
          headers: {
            token: token
          }
        })
        .then(({ data }) => {
          this.loading = !this.loading;
          this.previewCart = !this.previewCart;
          this.$store.commit('mutateCartCount', 1);
        })
        .catch((err) => {
          console.log(err.response.data);
        })
    }
  },
  mounted() {
    this.getProductDetail();
  },
  watch: {
    $route() {
      this.getProductDetail();
    },
  },
}
</script>

