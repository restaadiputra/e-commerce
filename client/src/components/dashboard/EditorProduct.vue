<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row my-4 mx-2">
      <div class="col-sm-12">
        <h3><b>Product Detail</b></h3>
        <hr>
        <form class="form-horizontal">
          
          <div class="row">
            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="name">Product Name</label>
              <input id="name" name="name" class="form-control" required type="text">
            </div>

            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="category">Category</label>
              <input id="category" name="category" class="form-control" required type="text">
            </div>

            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="stock">Stock</label>
              <input id="stock" name="stock" class="form-control" required type="number" min="1" max="100" value="1">
            </div>

            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="price">Price ($)</label>
              <input id="price" name="price" class="form-control" required type="number" min="1" value="1">
            </div>

            <div class="form-group col-sm-12">
              <label for="description">Description</label>
              <textarea class="form-control" id="description" rows="3"></textarea>
            </div>

            <div class="form-group col-md-12 col-lg-6">
              <div class="row">
                <div class="col-12">
                  <input v-on:change.prevent="handleFileUpload" type="file" class="custom-file-input form-control" id="customFile" ref="file">
                  <label class="custom-file-label mx-3" for="customFile">{{filename === '' ? 'Choose File' : filename}}</label>
                </div>
              </div>
            </div>

            <div class="form-group col-sm-12">
              <button id="singlebutton" name="singlebutton" class="btn btn-primary">Create Product</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/Loading.vue';
export default {
  name: "add-product",
  components: {
    Loading,
  },
  data() {
    return {
      product: {
        name: '',
        category: '',
        stock: 1,
        price: 1,
        description: '',
        image: ''
      },
      filename: '',
      loading: false,
    }
  },
  methods: {
    handleFileUpload() {
      this.filename = this.$refs.file.files[0].name;
      this.product.image = this.$refs.file.files[0];
    },
    createProduct() {
      this.loading = !this.loading;

      const token = localStorage.getItem('token');

      const newProduct = new FormData();
      newProduct.append('name', this.product.name)
      newProduct.append('description', this.product.description)
      newProduct.append('category', this.product.category)
      newProduct.append('stock', this.product.stock)
      newProduct.append('price', this.product.price)
      newProduct.append('description', this.product.description)
      newProduct.append('image', this.product.image)
      
      this.$axios
        .post(`/products`, newProduct, {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: token
          }
        })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })

    },
  }
};
</script>
