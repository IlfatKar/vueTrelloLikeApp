<template>
  <div class="modal">
    <h3>Где сохранить?</h3>
    <div class="btns">
      <button class="button" @click="saveLocal">Локально</button>
      <button class="button" @click="saveOnline">Удаленно</button>
      <button class="button" @click="saveFile">Сохранить как</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SaveModalWindow",
  methods: {
    saveLocal() {
      this.$emit("saveLocal");
    },
    saveOnline() {
      this.$emit("saveOnline");
    },
    saveFile() {
      this.$emit("saveFile");
    }
  },
};
</script>
