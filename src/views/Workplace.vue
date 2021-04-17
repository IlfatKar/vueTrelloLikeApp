<template>
  <div>
    <h1 class="main-h1">Система управления задачами и проектами</h1>
    <div class="workplace row">
      <Card
        @changeColors="changeColors"
        @delTask="delTask"
        @addTask="addTask"
        @changeTitle="changeTitle"
        :col="col"
        :idx="i"
        @delCol="delCol"
        :key="i"
        v-for="(col, i) in columns"
      />
      <CreateInput @added="addColumn" v-show="add" />
      <button class="button addBtn" @click="add = true">
        Добавить колонку
      </button>
      <button class="button saveBtn" data-saveBtn="true" @click="save">
        Сохранить
      </button>
      <button class="button saveBtn backBtn" data-saveBtn="true">
        <router-link to="/">Назад</router-link>
      </button>
    </div>
    <transition name="fade">
      <SaveModalWindow
        v-click-outside="close"
        @saveLocal="saveLocal"
        @saveOnline="saveOnline"
        @saveFile="saveFile"
        v-show="needSave"
      />
    </transition>
  </div>
</template>

<script>
import ClickOutside from "vue-click-outside";
import Card from "../components/Card";
import CreateInput from "../components/CreateInput";
import SaveModalWindow from "../components/SaveModalWindow";
const { ipcRenderer } = window.require("electron");

export default {
  name: "Workplace",
  data() {
    return {
      columns: [],
      add: false,
      needSave: false,
    };
  },
  components: { SaveModalWindow, CreateInput, Card },
  async mounted() {
    const key = this.$route.params.id;
    if (key === "new") {
      this.columns = [];
    } else {
      if (key) {
        try {
          await this.$store.dispatch("getTasks", key);
          this.columns = this.$store.getters.columns;
        } catch (e) {
          this.$toast.open({
            message: e.message,
            type: "error",
            position: "top-right",
          });
        }
      } else {
        this.columns = this.$store.getters.columns;
        if (!this.columns || !this.columns.length) {
          this.columns = JSON.parse(localStorage.getItem("columns")) || [];
        }
      }
    }
  },
  methods: {
    addTask({ task, col, bg, text }) {
      const idx = this.columns[col].tasks.length;
      this.columns[col].tasks.push({
        value: task,
        bg,
        text,
        idx,
      });
    },
    addColumn(title) {
      this.add = false;
      this.columns.push({
        title,
        tasks: [],
      });
    },
    delCol(idx) {
      this.columns.splice(+idx, 1);
    },
    save() {
      this.needSave = true;
    },
    saveLocal() {
      localStorage.setItem("columns", JSON.stringify(this.columns));
      this.$toast.open({
        message: "Сохранено локально",
        position: "top-right",
      });
      this.needSave = false;
    },
    async saveOnline() {
      const key = await this.$store.dispatch("saveTasks", this.columns);
      this.$toast.open({
        message: `Сохранено по ссылке: ${document.location.origin}/workplace/${key}`,
        position: "top-right",
      });
      this.needSave = false;
    },
    close(e) {
      if (e && this.needSave && !e.target.dataset.savebtn) {
        this.needSave = false;
      }
    },
    delTask({ col, idx }) {
      this.columns[col].tasks.splice(+idx, 1);
    },
    saveFile() {
      const res = ipcRenderer.sendSync("saveFile", this.columns);
      if (res.status !== "error") {
        this.$toast.open({
          message: "Сохранено",
          position: "top-right",
        });
      } else {
        this.$toast.open({
          message: "Ошибка",
          position: "top-right",
          type: "error",
        });
      }
      this.needSave = false;
    },
    changeTitle({ title, idx }) {
      this.columns[idx].title = title;
    },
    changeColors({ bg, text, idx, col }) {
      this.columns[col].tasks[idx].bg = bg;
      this.columns[col].tasks[idx].text = text;
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
