<template>
  <div class="container position-relative py-5">
    <form class="pb-2">
      <div class="row">
        <div class="input-group mb-3 col-lg-6">
          <input type="text" v-model="category_send_id" class="form-control" placeholder="Enter category ID">
          <div class="input-group-append">
            <button @click="getProduct" class="btn btn-primary" type="button">Get products</button>
          </div>
        </div>
      </div>
    </form>
    <div class="row">
      <div v-for="(item, i) in products" class="col-lg-4 col-md-6 col-12 pb-4" :key="'products' + i">
        <div class="card h-100 mb-4">
          <ProductItem :item="item"/>
<!--          <div class="card-body">-->
<!--            <form>-->
<!--              <div class="form-group">-->
<!--                <label for="ProductName">{{ item.name }}</label>-->
<!--                <select v-if="item.type ==='multiline'"  class="form-control">-->
<!--                  <option>1</option>-->
<!--                </select>-->
<!--                <input v-else :type="itemType(item.type)" class="form-control" id="ProductName" v-model="item.group_name"-->
<!--                       placeholder="Enter product name">-->
<!--                <small id="emailHelp" class="form-text text-muted">{{ item.description }}</small>-->
<!--              </div>-->
<!--            </form>-->
<!--          </div>-->
        </div>
      </div>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <button @click="changeToJson" class="btn btn-success">Save all products</button>
    </div>
    <div class="form-group">
      <label for="formdata">All products data</label>
      <textarea class="form-control" id="formdata" v-model="productsJsonData" rows="9"></textarea>
    </div>
    <div class="d-flex align-items-center justify-content-center">
      <a class="btn btn-dark" @click="downloadJson" id="downloadLinkId" href="#">Download JSON</a>
    </div>
  </div>
</template>

<script>
import ProductItem from "@/components/productItem";
export default {
  name: "EditProduct",
  components: {ProductItem},
  data() {
    return {
      products: [],
      productsJsonData: null,
      category_send_id: null,
      productData: {
        attribute_type: "ALL",
        category_id: [],
        language: "DEFAULT"
      }
    }
  },
  methods: {
    changeToJson() {
      this.productsJsonData = JSON.stringify(this.products)
    },
    downloadJson() {
      const url = URL.createObjectURL(
        new Blob([this.productsJsonData], {
          type: "application/json",
        })
      );
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "patients");
      document.body.appendChild(link);
      link.click();
    },
    getProduct() {
      this.productData.category_id.push(this.category_send_id)
      this.$http.post('v3/category/attribute', this.productData)
        .then(res => {
          this.products = res.data.result[0].attributes
        })
        .catch(err => {
          console.log(err);
        })
      // .finally(() => {
      //
      // })
    },
  },
  computed:{
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
