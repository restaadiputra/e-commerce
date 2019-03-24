<template>
  <div class="container d-flex justify-content-center align-items-center">
    <Loading v-if="loading" />
    <div class="card">
      <div class="card-body">
        <form v-on:submit.prevent="signinAdmin">
          <div class="form-group">
            <label for="username">Admin Username</label>
            <input
              v-model="admin.username"
              type="text"
              class="form-control"
              id="username"
              aria-describedby="usernameHelp"
              placeholder="Enter username"
            >
            <small
              id="usernameHelp"
              class="form-text text-muted"
            ><i>Never share your admin credential.</i></small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              v-model="admin.password"
              type="password"
              class="form-control"
              id="password"
              placeholder="Enter Password"
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
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  created() {
    this.$store.commit('mutateRole', 'admin');
  },
  methods: {
    clearForm() {
      this.user = {
        username: '',
        password: '',
      };
    },
    signinAdmin() {
      this.loading = !this.loading;
      this.$axios
        .post('/admin/signin', this.admin)
        .then(({ data }) => {
          this.loading = !this.loading;
          this.clearForm();
          localStorage.setItem('token', data.token);
          localStorage.setItem('fullname', data.fullname);
          localStorage.setItem('role', data.role)
          this.$store.commit('mutateSigninStatus', {
            signin: true,
            fullname: data.fullname,
            role: data.role
          });
          this.$router.push({
            path: '/admin/dashboard',
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
        })
    }
  }
}
</script>

<style>
  .container {
    height: 70vh;
  }
</style>
