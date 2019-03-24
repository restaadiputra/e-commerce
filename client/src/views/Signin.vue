<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="col-sm-12">
      <h3 class="dark-grey text-center">
        <b>Sign In</b>
      </h3>
      <hr>
    </div>
    <div class="col-sm-12 text-left">
      <div class="row border-between">
        <div class="col-lg-6 mb-5">
          <form v-on:submit.prevent="signin">
            <h4 class="dark-grey">Enter your info</h4>
            <hr>
            <div class="form-group">
              <label for="inputUsername">Fullname</label>
              <input v-model="user.username" type="text" class="form-control" id="inputUsername">
            </div>
            <div class="form-group">
              <label for="inputPassword">Password</label>
              <input v-model="user.password" type="password" class="form-control" id="inputPassword">
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-secondary">Sign In</button>
            </div>
          </form>
        </div>

        <div class="col-lg-6">
          <h4 class="dark-grey">New Customer?</h4>
          <hr>
          <p>Create an account with us and you'll be able to:</p>
          <ul>
            <li>Check out faster</li>
            <li>Save multiple shipping addresses</li>
            <li>Access your order history</li>
            <li>Save items to your Wish List</li>
            <li>Track new orders</li>
          </ul>
          <div class="d-flex justify-content-center">
            <router-link class="btn btn-outline-secondary" to="/register">Create Account</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';

export default {
  name: 'signin',
  components: {
    Loading,
  },
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  methods: {
    signin() {
      this.loading = !this.loading;
      this.$axios
        .post('/user/signin', this.user)
        .then(({ data }) => {
          this.loading = !this.loading;
          this.clearForm();
          localStorage.setItem('token', data.token);
          localStorage.setItem('fullname', data.fullname);
          // this.$emit('changeStatusToSignin');

          // this.$store.dispatch('changeStatusSignin', true)

          this.$store.commit('mutateSigninStatus', true);
          this.$store.commit('mutateFullname', data.fullname)
          this.$router.push({
            path: '/',
          });
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clearForm() {
      this.user = {
        username: '',
        password: '',
      };
    },
  },
};
</script>
