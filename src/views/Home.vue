<template>
  <div class="home">
    <h1>Добро пожаловать</h1>
    <div>
      <img src="../assets/img/book.svg" />
    </div>
    <div class="nav">
      <div>
        <router-link to="/workplace" class="button  button-outline">Продолжить локально</router-link>
      </div>
      <div>
        <router-link to="/workplace/new" class="button  button-outline">Новый файл</router-link>
      </div>
      <div>
        <p @click="showModal = true" class="button  button-outline" data-noclose="true">Открыть по ID</p>
      </div>
      <div>
        <p @click="loadFile" class="button button-outline">Загрузить файл</p>
      </div>
    </div>
    <transition name="fade">
      <InputModal v-click-outside="close" @loadById="loadById" v-show="showModal" />
    </transition>
  </div>
</template>

<script>
import InputModal from '../components/InputModal'
import ClickOutside from 'vue-click-outside'
const { ipcRenderer } = window.require('electron')

export default {
  name: "Home",
  data(){
    return{
      showModal: false,
    }
  },
  components: {InputModal},
  methods: {
    loadById(id){
      if(id.trim()){
        this.$router.push(`/workplace/${id}`)
      } else {
        this.$toast.open({
          message: "Введите ID",
          position: 'top-right',
          type: 'info',
        })
      }
    },
    close(e) {
      if (e && this.showModal && !e.target.dataset.noclose) {
        this.showModal = false;
      }
    },
    loadFile() {
      const data = ipcRenderer.sendSync("loadFile");
      if(data.status !== 'error'){
        this.$store.commit('columns', data.res)
        this.$router.push('/workplace')
      } else {
        this.$toast.open({
          message:"ошибка",
          type: 'error',
          position: 'top-right',
        })
      }

    },
  },
  directives: {
    ClickOutside,
  },
};
</script>
<style>
  h1{
    text-align: center;
  }
</style>