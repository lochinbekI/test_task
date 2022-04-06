<template>
  <div class="container position-relative py-5">
    <ValidationObserver ref="form"
                        tag="form"
                        class="pb-2"
                        @submit.prevent="getProduct">
      <div class="row">
        <div class="input-group position-relative mb-4 col-lg-6">
          <validation-provider
            rules="required"
            name="category ID"
            vid="category_send_id"
            v-slot="props"
          >
            <input type="text" v-model="category_send_id" class="form-control" placeholder="Enter category ID">
            <span class="error-massage">{{ props.errors[0] }}</span>
          </validation-provider>
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary">Get products</button>
          </div>
        </div>
      </div>
    </ValidationObserver>
    <ValidationObserver ref="itemsRef"
                        tag="form"
                        class="pb-2"
                        @submit.prevent="changeToJson"
    >
      <div class="row">
        <div v-for="item in products" class="col-lg-4 col-md-6 col-12 pb-4" :key="item.id">
          <ProductItem :item="item" ref="productRef"/>
        </div>
      </div>
    </ValidationObserver>
    <div v-if="products.length > 0">
      <div class="d-flex align-items-center justify-content-center">
        <button type="submit" @click="changeToJson" class="btn btn-success">Save all products</button>
      </div>
      <div class="form-group">
        <label for="formdata">All products data</label>
        <textarea class="form-control" id="formdata" v-model="productsJsonData" rows="9"></textarea>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <a class="btn btn-dark" @click="downloadJson" id="downloadLinkId" href="#">Download JSON</a>
      </div>
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
    async changeToJson() {
      const valid = await this.$refs.itemsRef.validate()
      if (valid) {
        this.productsJsonData = JSON.stringify(this.products)
      }
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
    async getProduct() {
      const validate = await this.$refs.form.validate()
      if (validate) {
        this.productData.category_id[0] = this.category_send_id;
        this.$http.post('v3/category/attribute', this.productData)
          .then(res => {
            this.products = res.data.result[0].attributes
          })
          .catch(err => {
            console.log(err);
          })
      }
    },
  },
  computed: {},
  mounted() {
  }
}
</script>

<style scoped>
.error-massage {
  position: absolute;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>
