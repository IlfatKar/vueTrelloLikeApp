<template>
  <div>
    <transition name="fade">
      <div @click="showSettings = !showSettings" :style="{background: bgColor, color:textColor}" class="task" contenteditable="false">
        {{ value }}
        <div @click="delTask" class="del" contenteditable="false">&times;</div>
      </div>
    </transition>
    <transition name="dropdown">
      <div class="settings" v-show="showSettings">
        <div>
          <label for="bg-color">bg color</label>
          <input @change="changeColor" type="color" v-model="bgColor" id="bg-color" />
        </div>
        <div>
          <label for="text-color">text color</label>
          <input @change="changeColor" type="color" v-model="textColor" id="text-color" />
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: "Task",
  data(){
    return{
      showSettings: false,
      bgColor: this.bg,
      textColor: this.text,
      forward: true,
    }
  },
  props: ["value", "idx", "col"],
  methods: {
    delTask() {
      this.$emit("delTask", { idx: this.idx, col: this.col });
    },
    changeColor() {
        this.$emit("changeColor", { bg: this.bgColor, text: this.textColor, idx: this.idx, col: this.col });
    },
  },
};
</script>

