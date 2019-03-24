<template>
  <div class="container d-flex justify-content-center align-items-center">
    <Loading v-if="loading" />
    <div class="card">
      <div class="card-header mt-5">
        Register New Admin
      </div>
      <div class="card-body">
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <label for="fullname">Fullname</label>
            <input
              v-model="admin.fullname"
              type="text"
              class="form-control"
              id="fullname"
            >
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              v-model="admin.email"
              type="email"
              class="form-control"
              id="email"
            >
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input
              v-model="admin.username"
              type="text"
              class="form-control"
              id="username"
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="admin.password"
              type="password"
              class="form-control"
              id="password"
            >
          </div>
          <div class="d-flex justify-content-center">
          <button type="submit" class="btn btn-primary">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>

import Loading from '@/components/Loading.vue';
export default {
  name: 'admin-login',
  components: {
    Loading
  },
  data() {
    return {
      admin: {
        fullname: '',
        email: '',
        username: '',
        password: '',
        role: 'admin'
      },
      loading: false,
    };
  },
  methods: {
    register() {
      this.loading = !this.loading;
      this.$axios
        .post('/users/register', this.admin)
        .then(({ data }) => {
          this.loading = !this.loading;
          this.clearForm();
          this.$router.push({
            path: '/admin/dashboard',
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
        role: 'admin'
      };
    },
  }
}
</script>
