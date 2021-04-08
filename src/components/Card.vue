<template>
  <div class="card">
    <div class="cardControl">
      <contenteditable
        tag="div"
        :contenteditable="true"
        v-model="title"
        :noNL="true"
        :noHTML="true"
      />
      <div @click="delCol">&times;</div>
    </div>
    <div class="tasks">
      <Task
        @changeColors="changeColors"
        @delTask="delTask"
        :col="idx"
        :value="task.value"
        :bg="task.bg"
        :text="task.text"
        :idx="i"
        v-for="(task, i) in col.tasks"
        :key="i"
      />
    </div>
    <div class="addTask inputBlock">
      <input placeholder="Добавить задачу" v-model.trim="task" type="text" />
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
      task: "",
      title: this.col.title,
    };
  },
  components: { Task },
  props: ["col", "idx"],
  watch: {
    title() {
      this.$emit("changeTitle", { title: this.title, idx: this.idx });
    },
  },
  methods: {
    delCol() {
      this.$emit("delCol", this.idx);
    },
    addTask() {
      if (this.task) {
        this.$emit("addTask", { task: this.task, col: this.idx });
      }
      this.task = "";
    },
    delTask(obj) {
      this.$emit("delTask", obj);
    },
    changeColors(obj){
      this.$emit('changeColors', obj)
    }
  },
};
</script>
