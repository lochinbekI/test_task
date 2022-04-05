<template>
  <div>
    <div class="card-body">
      <form>
        <div class="form-group">
          <label for="ProductName">{{ itemData.name }}</label>
          <select v-if="itemData.type ==='multiline'" class="form-control">
            <option>1</option>
          </select>
          <input v-else :type="itemType(itemData.type)" class="form-control" id="ProductName" v-model="itemData.group_name"
                 placeholder="Enter product name">
          <small id="emailHelp" class="form-text text-muted">{{ itemData.description }}</small>
        </div>
      </form>
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
  data(){
    return{
      itemData: {...this.item}
    }
  },
  methods:{
    itemType(type){
      if (type === 'String'){
        return 'text'
      }
      if (type === 'ImageURL'){
        return 'url'
      }
      if (type === 'Integer'){
        return 'number'
      }
      if (type === 'Decimal'){
        return 'number'
      }
    },
  }
}
</script>

<style scoped>

</style>
