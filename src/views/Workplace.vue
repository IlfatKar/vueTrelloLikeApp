<template>
  <div>
    <h1 class="main-h1">Система управления задачами и проектами</h1>
    <div class="workplace row">
      <Card :col="col" :idx="i"  @delCol="delCol" :key="i" v-for="(col, i) in columns"/>
      <CreateInput @added="addTask" v-show="add"/>
      <button class="button addBtn" @click="add = true">Добавить колонку</button>
      <button class="button saveBtn" data-saveBtn="true" @click="save">Сохранить</button>
    </div>
    <transition name="fade">
      <SaveModalWindow v-click-outside="close" @saveLocal="saveLocal" @saveOnline="saveOnline" v-show="needSave"/>
    </transition>

  </div>
</template>

<script>
  import ClickOutside from 'vue-click-outside'
  import Card from '../components/Card'
  import CreateInput from '../components/CreateInput'
  import SaveModalWindow from '../components/SaveModalWindow'

  export default {
    name: 'Workplace',
    data() {
      return {
        columns: [],
        add: false,
        needSave: false,
      }
    },
    components: {SaveModalWindow, CreateInput, Card},
    async mounted() {
      const key = this.$route.params.id
      if(key){
        try {
          await this.$store.dispatch('getTasks', key)
          this.columns = this.$store.getters.columns || []
        } catch (e) {
          this.$toast.open({
            message: e.message,
            type: 'error',
            position: 'top-right'
          })
        }
      } else {
        this.columns = JSON.parse(localStorage.getItem('columns'))
      }
    },
    methods:{
      addTask(title) {
        if (!this.columns) this.columns = []
        this.add = false
        this.columns.push({
          title,
          tasks: [],
        })
      },
      delCol(idx){
        this.columns.splice(+idx,1)
      },
      save(){
        this.needSave = true
      },
      saveLocal(){
        localStorage.setItem('columns', JSON.stringify(this.columns))
        this.$toast.open({
        message:"Сохранено локально",
        position: 'top-right',
        })
        this.close()
      },
      async saveOnline(){
        const key = await this.$store.dispatch('saveTasks', this.columns)
        this.$toast.open({
          message:`Сохранено по ссылке: ${document.location.origin}/workplace/${key}`,
          position: 'top-right',
        })
        this.close()
      },
      close(e){
        if(e && this.needSave && !e.target.dataset.savebtn){
          this.needSave = false
        }
      },
    },
    directives: {
      ClickOutside
    },
  }
</script>
