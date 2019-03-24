<template>
  <div class="home">
    <div class="container">
      <div class="row">
      <Carrousel />
      <ProductList />
      </div>
    </div>
  </div>
</template>

<script>
import Carrousel from '@/components/Carrousel.vue';
import ProductList from '@/components/ProductList.vue';

export default {
  name: 'home',
  components: {
    Carrousel,
    ProductList,
  },
};
</script>
