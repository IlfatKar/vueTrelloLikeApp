<template>
  <div class="card">
    <div class="cardControl">
      <div contenteditable="true">{{ col.title }}</div>
      <div @click="delCol">&times;</div>
    </div>
    <div class="tasks">
      <Task :value="task.value" v-for="task in col.tasks" :key="task.idx" />
    </div>
    <div class="addTask inputBlock">
      <input placeholder="Добавить задачу" type="text" />
      <div class="close">OK</div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Card",
  components: { Task },
  props: ["col", "idx"],
  methods: {
    delCol() {
      this.$emit("delCol", this.idx);
    },
  },
};
</script>

<style scoped></style>
