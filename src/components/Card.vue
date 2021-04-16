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
      <draggable v-model="cols.tasks" @change="checkMove" group="tasks" @start="drag=true" @end="drag=false">
        <Task @changeColors="changeColors"
              @delTask="delTask"
              :col="idx"
              :value="task.value"
              :idx="task.idx"
              v-for="task in cols.tasks"
              :key="task.idx" />
      </draggable>
     
    </div>
    <div class="addTask inputBlock">
      <input placeholder="Добавить задачу" v-model.trim="task" type="text" />
      <div class="close" @click="addTask">OK</div>
    </div>
  </div>
</template>

<script>
  import Task from "./Task";
  import draggable from 'vuedraggable'
export default {
  name: "Card",
  data() {
    return {
      cols: this.col,
      task: "",
      title: this.col.title,
    };
  },
    components: { Task, draggable },
    props: ["col", "idx"],
  watch: {
    title() {
      this.$emit("changeTitle", { title: this.title, idx: this.idx });
    },
  },
    methods: {
      checkMove() {
        this.cols.tasks.forEach((el, i) => {
          el.idx = i;
        });
    },
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
