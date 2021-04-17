<template>
  <div>
    <transition name="fade">
      <div
        :style="{ background: bgColor, color: textColor }"
        @click="showSettings = !showSettings"
        class="task"
        contenteditable="false"
      >
        {{ value }}
        <div @click="delTask" class="del" contenteditable="false">&times;</div>
      </div>
    </transition>
    <transition name="dropdown">
      <div class="settings" v-show="showSettings">
        <div>
          <label for="bg-color">Цвет фона</label>
          <input
            @change="changeColor"
            id="bg-color"
            type="color"
            v-model="bgColor"
          />
        </div>
        <div>
          <label for="text-color">Цвет текста</label>
          <input
            @change="changeColor"
            id="text-color"
            type="color"
            v-model="textColor"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Task",
  data() {
    return {
      showSettings: false,
      bgColor: this.bg,
      textColor: this.text,
      forward: true,
    };
  },
  props: ["value", "idx", "col", "bg", "text"],
  methods: {
    delTask() {
      this.$emit("delTask", { idx: this.idx, col: this.col });
    },
    changeColor() {
      this.$emit("changeColors", {
        bg: this.bgColor,
        text: this.textColor,
        idx: this.idx,
        col: this.col,
      });
    },
  },
};
</script>
