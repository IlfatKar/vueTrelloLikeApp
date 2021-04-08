<template>
  <div>
    <div class="task" contenteditable="false">
      {{ value }}
      <div class="del" contenteditable="false" @click="delTask">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["value", "idx", "col"],
  methods: {
    delTask() {
      this.$emit("delTask", { idx: this.idx, col: this.col })
    }
  },
};
</script>

<style scoped></style>
