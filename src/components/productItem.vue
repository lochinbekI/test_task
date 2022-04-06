<template>
  <div>


    <div class="card h-100 mb-4">
      <div class="card-body">
        <div class="form-group">
          <ValidationProvider :name="item.name" :rules="{required: item.is_required}" v-slot="{ errors }">
            <template v-if="item.is_collection">
              <select v-model="item.group_name" class="form-control">
                <option v-for="option in selectData" :key="option.id" :value="option.value">{{ option.value }}</option>
              </select>
            </template>
            <template v-else>
              <input :type="itemType(item.type)" class="form-control" id="ProductName"
                     v-model="item.group_name"
                     placeholder="Enter product name">
            </template>
            <span class="error-massage">{{ errors[0] }}</span>
            <small class="form-text text-muted d-block mt-4" v-html="item.description"></small>
          </ValidationProvider>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "productItem",
  props: {
    item: {
      type: Object,
    }
  },
  data() {
    return {

      selectData: null,
      listData: {
        category_id: 17034410,
        language: "DEFAULT",
        limit: 20,
        query: "",
        attribute_id: this.item.id
      },
      isSelect: false

    }
  },

  methods: {
    getList() {
      this.$http.post('v2/category/attribute/values', this.listData)
        .then(res => {
          this.selectData = res.data
          this.isSelect = true
        })
        .catch(err => {
          console.log(err);
        })
      // .finally(() => {
      //
      // })
    },
    itemType(type) {
      if (type === 'String') {
        return 'text'
      }
      if (type === 'multiline') {
        return 'text'
      }
      if (type === 'ImageURL') {
        return 'url'
      }
      if (type === 'Integer') {
        return 'number'
      }
      if (type === 'Decimal') {
        return 'number'
      }
    },
  },
  mounted() {
    if (this.item.is_collection) {
      this.getList()
    }
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
