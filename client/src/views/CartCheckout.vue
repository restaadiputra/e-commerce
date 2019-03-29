<template>
  <div class="container px-4">
    <Loading v-if="loading"/>
    <div class="row">
      <div class="col-md-12 col-lg-8 offset-lg-2">
        <h3 class="dark-grey text-center">
          <b>Checkout</b>
        </h3>
        <hr>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-lg-8 offset-lg-2">
        <div class="card">
          <div class="card-header">Review your order</div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-6"><b>Product Name</b></div>
              <div class="col-sm-3 text-right"><b>Qty</b></div>
              <div class="col-sm-3 text-right"><b>Subtotal</b></div>
            </div>
            <hr>
            <div v-for="(product, index) in carts" :key="index" class="row">
              <div class="col-sm-6">{{product.name}}</div>
              <div class="col-sm-3 text-right">{{product.amount}}</div>
              <div class="col-sm-3 text-right">${{product.amount * product.price}}</div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-6"><b></b></div>
              <div class="col-sm-3 text-right"><b>Grand Total</b></div>
              <div class="col-sm-3 text-right"><b>${{ getTotalCart }}</b></div>
            </div>
          </div>
          <div class="card-header">Delivery Information</div>
          <div class="card-body">
            <form @submit.prevent="paidCarts">
              <div class="form-group">
                <label for="name">Fullname</label>
                <input v-model="deliver.fullname" type="text" class="form-control" placeholder="Enter Fullname" required>
              </div>
              <div class="form-group">
                <label for="name">Address</label>
                <input v-model="deliver.address" type="text" class="form-control" placeholder="Enter Address" required>
              </div>
              <div class="form-group">
                <label for="name">Poscode</label>
                <input v-model="deliver.poscode" type="text" class="form-control" placeholder="Enter Poscode" required>
              </div>
              <div class="input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputPayment">Payment</label>
                </div>
                <select v-model="deliver.payment" class="custom-select" id="inputPayment">
                  <option selected>Choose...</option>
                  <option value="card">Credit Card</option>
                  <option value="transfer">Transfer</option>
                </select>
              </div>

              <button type="submit" class="btn btn-primary mt-3">Pay and Deliver</button>
            </form>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "@/components/Loading.vue";
export default {
  name: "checkout",
  components: {
    Loading
  },
  data() {
    return {
      loading: false,
      deliver: {
        fullname: '',
        address: '',
        poscode: '',
        payment: 'card'
      },
      cartId: '',
      carts: []
    };
  },
  created() {
    const token = localStorage.getItem("token");
    this.$axios
      .get("/carts", {
        headers: {
          token: token
        }
      })
      .then(({ data }) => {
        this.cartId = data.car
        if (data.length > 0) {
          data.forEach(item => {
            this.carts.push({
              ...item.productId,
              amount: item.amount,
              cartId: item._id
            });
          });
        }
      })
      .catch(err => {
        console.log(err.response);
      });
  },
  computed: {
    getTotalCart() {
      let total = 0;
      this.carts.forEach(item => (total += item.amount * item.price));
      return total;
    }
  },
  methods: {
    paidCarts() {
      const token = localStorage.getItem("token");
      this.$axios
        .patch(`/carts/`, { 
          status: 'paid', ...this.deliver 
        }, {
          headers: {
            token: token
          }
        })
        .then(({ data }) => {
          this.$router.push({
            path: '/carts'
          })
          this.$store.commit('resetCartCount', 0)
          this.$swal({
            title: "Success",
            text: 'Your package will be delivered to your home. Thank you for shopping at our website.',
            icon: "success",
            button: "close",
          });
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
};
</script>

