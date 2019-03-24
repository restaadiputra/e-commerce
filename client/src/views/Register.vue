<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="col-sm-12">
      <h3 class="dark-grey text-center">Register New User</h3>
      <hr>
    </div>
    <form v-on:submit.prevent="register">
      <div class="row border-between">
        <div class="col-lg-6">
          <h4 class="dark-grey">User Info</h4>
          <hr>
          <div class="form-group">
            <label for="inputName">Fullname</label>
            <input v-model="user.fullname" type="text" class="form-control" id="inputName">
          </div>
          <div class="form-group">
            <label for="inputEmail">Email</label>
            <input v-model="user.email" type="email" class="form-control" id="inputEmail">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputUsername">Username</label>
              <input v-model="user.username" type="text" class="form-control" id="inputUsername">
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword">Password</label>
              <input
                v-model="user.password"
                type="password"
                class="form-control"
                id="inputPassword"
              >
            </div>
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input v-model="user.address" type="text" class="form-control" id="inputAddress">
          </div>
          <div class="form-group">
            <label for="inputPhone">Phone</label>
            <input v-model="user.phone" type="text" class="form-control" id="inputPhone">
          </div>
        </div>

        <div class="col-lg-6">
          <h4 class="dark-grey">Terms and Conditions</h4>
          <hr>
          <p>By clicking on "Register" you agree to The Company's' Terms and Conditions</p>
          <p>
            While rare, prices are subject to change based on exchange rate fluctuations -
            should such a fluctuation happen, we may request an additional payment. You have the option to request a full refund or to pay the new price. (Paragraph 13.5.8)
          </p>
          <p>Should there be an error in the description or pricing of a product, we will provide you with a full refund (Paragraph 13.5.6)</p>
          <p>Acceptance of an order by us is dependent on our suppliers ability to provide the product. (Paragraph 13.5.6)</p>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-secondary mx-2">Register</button>
            <router-link class="btn btn-outline-secondary" to="/">Cancel</router-link>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'register',
  components: {
    Loading,
  },
  data() {
    return {
      user: {
        fullname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone: '',
      },
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = !this.loading;
      this.$axios
        .post('/users/register', this.user)
        .then(({ data }) => {
          this.loading = !this.loading;
          this.clearForm();
          this.$router.push({
            path: '/signin',
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    clearForm() {
      this.user = {
        fullname: '',
        email: '',
        username: '',
        password: '',
        address: '',
        phone: '',
      };
    },
  },
};
</script>
