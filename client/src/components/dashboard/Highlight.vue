<template>
  <div class="container">
    <Loading v-if="loading" />
    <div class="row my-4 mx-2">
      <div class="col-sm-12">
        <h3 v-if="mode === 'new'"><b>Create New Product</b></h3>
        <h3 v-if="mode === 'edit'"><b>Edit Product</b></h3>
        <hr>
        <form v-on:submit.prevent="postingData" class="form-horizontal"> 
          <div class="row">
            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="name">Product Name</label>
              <input v-model="product.name" id="name" name="name" class="form-control" required type="text">
            </div>

            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="category">Category</label>
              <input v-model="product.category" id="category" name="category" class="form-control" required type="text">
            </div>

            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="stock">Stock</label>
              <input v-model="product.stock" id="stock" name="stock" class="form-control" required type="number" min="1" max="100" value="1">
            </div>

            <div class="form-group col-sm-12 col-md-6">
              <label class="control-label" for="price">Price ($)</label>
              <input v-model="product.price" id="price" name="price" class="form-control" required type="number" min="1" value="1">
            </div>

            <div class="form-group col-sm-12">
              <label for="description">Description</label>
              <textarea class="form-control" v-model="product.description" id="description" rows="3"></textarea>
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
              <button v-if="mode === 'new'" type="submit" id="singlebutton" name="singlebutton" class="btn btn-primary">Create Product</button>
              <button v-if="mode === 'edit'" type="submit" id="singlebutton" name="singlebutton" class="btn btn-primary">Edit Product</button>
              <button v-if="mode === 'edit'" v-on:click.prevent="deleteProduct" type="submit" id="singlebutton" name="singlebutton" class="btn btn-danger ml-3">Delete</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>