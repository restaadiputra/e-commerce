<template>
  <div class="container px-4">
    <Loading v-if="loading" />
    
    <div class="row">
      <div class="col-sm-12">
      <h3 class="dark-grey text-center">
        <b>Your Cart ({{carts.length}} items)</b>
      </h3>
      <hr>
    </div>
      <div class="col-md-4">
        <h4>Item</h4>
      </div>
      <div class="col-md-2 text-right">
        <h4>Price</h4>
      </div>
      <div class="col-md-2 text-right">
        <h4>Quantity</h4>
      </div>
      <div class="col-md-2 text-right">
        <h4>Total</h4>
      </div>
      <div class="col-md-2 text-center">
        <h4>Option</h4>
      </div>
    </div>
    <div v-for="(item, index) in carts" :key="index" class="row mb-3">
      <div class="col-md-4">
        <div class="row">
          <div class="col-sm-6">
            <img class="img-fluid" v-bind:src="item.image" />
          </div>
          <div class="col-sm-6">
            <p>{{ item.name }}</p>
            <p><i>{{ item.category }}</i></p>
          </div>
        </div>
      </div>
      <hr>
      <div class="col-md-2 text-right">
        <p>$ {{ item.price }}</p>
      </div>
      <div class="col-md-2 text-right">
        <p>{{ item.amount }}</p>
      </div>
      <div class="col-md-2 text-right">
        <p>$ {{ item.price * item.amount }}</p>
      </div>
      <div class="col-md-2 text-center">
        <a v-on:click="removeCart(item.cartId)" ><i class="fas fa-trash-alt text-danger"></i></a>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class="col-md-2 offset-md-6 text-right">
        <p>Total Price</p>
      </div>
      <div class="col-md-2 text-right">
        <p>$ {{getTotalCart}}</p>
      </div>
      <div v-if="carts.length > 0" class="col-md-2 text-right">
        <button class="btn btn-dark">Checkout</button>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'cart-detail',
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      carts: []
    }
  },
  created() {
    const token = localStorage.getItem('token');
    this.$axios
      .get('/carts', {
        headers: {
          token: token
        }
      })
      .then(({ data }) => {
        if(data.length > 0) {
          data.forEach(item => {
            this.carts.push({...item.productId, amount: item.amount, cartId: item._id})
          });
        }
      })
      .catch(err => {
        console.log(err.response);
      })
  },
  computed: {
    getTotalCart() {
      let total = 0
      this.carts.forEach(item => total += (item.amount * item.price))
      return total
    }
  }, 
  methods: {
    removeCart(id) {
      const token = localStorage.getItem('token');
      this.$axios
        .delete(`/carts/${id}`, {
          headers: {
            token: token
          }
        })
        .then(({ data }) => {
          let index = this.carts.findIndex(cart => cart.cartId === data._id)
          this.carts.splice(index, 1)
          this.$store.commit('mutateCartCount', -1);
        })
        .catch(err => {
          console.log(err.response);
        })
    }
  }
}
</script>
