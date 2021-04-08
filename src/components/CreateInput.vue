<template>
  <div class="inputBlock">
    <input placeholder="Колонка" type="text" v-model="title" />
    <div class="close" @click="add">OK</div>
  </div>
</template>

<script>
export default {
  name: "CreateInput",
  data() {
    return {
      title: "",
    };
  },
  methods: {
    add() {
      this.$emit("added", this.title);
    },
  },
};
</script>

<style scoped></style>
