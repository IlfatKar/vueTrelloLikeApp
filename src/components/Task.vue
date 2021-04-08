<template>
  <div>
    <div class="task" contenteditable="false">
      {{ value }}
      <div class="del" contenteditable="false">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["value"],
};
</script>

<style scoped></style>
