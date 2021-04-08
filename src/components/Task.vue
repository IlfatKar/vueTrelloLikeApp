<template>
  <div>
    <transition name="fade">
      <div @click="changeColor" :style="{background: bgColor, color:textColor}" class="task" contenteditable="false">
        {{ value }}
        <div @click="delTask" class="del" contenteditable="false">&times;</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Task",
  data(){
    return{
      colors: [['lightsteelblue', '#606c76'], ['#9b4dca', 'white'], ['red', 'black'], ['black', 'white']],
      colorIdx: 0,
      bgColor: this.bg,
      textColor: this.text,
      forward: true,
    }
  },
  props: ["value", "idx", "col", "bg", "text"],
  methods: {
    delTask() {
      this.$emit("delTask", { idx: this.idx, col: this.col });
    },
    changeColor(){
      if(this.forward){
        this.colorIdx++
      } else {
        this.colorIdx--
      }
      this.bgColor = this.colors[this.colorIdx][0]
      this.textColor = this.colors[this.colorIdx][1]
      if(this.colorIdx === 0 || this.colorIdx === this.colors.length - 1){
        this.forward = !this.forward
      }
      this.$emit('changeColors', {bg: this.colors[this.colorIdx][0], text: this.colors[this.colorIdx][1], idx: this.idx, col:this.col})
    },
  },
};
</script>

