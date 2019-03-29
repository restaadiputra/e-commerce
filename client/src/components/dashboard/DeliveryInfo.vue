<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row my-4 mx-2">
      <div class="col-sm-12">
        <h3><b>Delivery Info</b></h3>
        <hr>
      </div>
      
      <div v-if="delivery.length > 0" class="card">
        <div v-for="(person, index) in delivery" :key="index" class="card-body">
          <div class="row">
            <div class="col-sm-12"><b>Customer name: </b>{{person.personalInfo.fullname}}</div>
            <div class="col-sm-12"><b>Address: </b>{{person.personalInfo.address}}</div>
            <div class="col-sm-12"><b>Status: </b>{{person.status}}</div>
          </div>
        </div>        
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
export default {
  name: 'delivery-info',
  components: {
    Loading,
  },
  created() {
    this.loading = true;
    const token = localStorage.getItem('token');
    this.$axios
      .get('/delivery', {
        headers: {
          token: token
        }
      })
      .then(({ data }) => {
        this.delivery = data
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err.response.data.message);
      })
  }, 
  data() {
    return {
      delivery: [],
      loading: false,
    }
  },
  methods: {
    
  }
}
</script>
