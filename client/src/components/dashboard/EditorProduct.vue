<template>
  <div class="container">
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
              <label class="control-label" for="description">Category</label>
              <input id="description" name="description" class="form-control" required type="text">
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

            <div class="form-group col-sm-12 col-md-6">
              <div class="row">
                <div class="col-12">
                  <input type="file" class="custom-file-input form-control" id="customFile">
                  <label class="custom-file-label mx-3" for="customFile">Choose file</label>
                </div>
              </div>
            </div>

            <!-- Button -->
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
export default {
  name: "add-product"
};
</script>
