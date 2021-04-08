<template>
  <div class="card">
    <div class="cardControl">
      <div contenteditable="true">{{ col.title }}</div>
      <div @click="delCol">&times;</div>
    </div>
    <div class="tasks">
      <Task @delTask="delTask" :col="idx" :value="task.value" :idx="i" v-for="(task, i) in col.tasks" :key="i" />
    </div>
    <div class="addTask inputBlock">
      <input placeholder="Добавить задачу"  v-model.trim="task" type="text" />
      <div class="close" @click="addTask">OK</div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";
export default {
  name: "Card",
  data() {
    return {
      task: '',
    }
  },
  components: { Task },
  props: ["col", "idx"],
  methods: {
    delCol() {
      this.$emit("delCol", this.idx);
    },
    addTask() {
      if (this.task) {
        this.$emit("addTask", { task: this.task, col: this.idx })
      }
     
      this.task = ""
    },
    delTask(obj) {
      this.$emit("delTask", obj)
    },
  },
};
</script>