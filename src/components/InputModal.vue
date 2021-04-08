<template>
  <div class="input-modal modal">
    <input type="text" v-model="id">
    <button @click="load" class="button">Загрузить</button>
  </div>
</template>

<script>
  export default {
    name: 'InputModal',
    data() {
      return {
        id: '',
      }
    },
    methods: {
      load() {
        this.$emit('loadById', this.id)
        this.id = ''
      }
    }
  }
</script>

