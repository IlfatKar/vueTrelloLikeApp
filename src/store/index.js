import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/database'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    columns: [],
  },
  mutations: {
    columns: (s, value) => {
      s.columns = value
    }
  },
  actions: {
    async saveTasks(_, tasks) {
      const ref = await firebase.database().ref('/tasks').push()
      await ref.set(tasks)
      return ref.key
    },
    async getTasks({commit}, id) {
      const data = (await firebase.database().ref(`/tasks/${id}`).once('value')).val()
      commit('columns', data)
    },
  },
  getters: {
    columns: s => s.columns,
  },
  modules: {},
})
