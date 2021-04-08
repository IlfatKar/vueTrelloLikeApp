<template>
  <div class="inputBlock">
    <input placeholder="Колонка" type="text" v-model.trim="title" />
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
      if (this.title) {
        this.$emit("added", this.title);
      }
      this.title = ""
    },
  },
};
</script>
