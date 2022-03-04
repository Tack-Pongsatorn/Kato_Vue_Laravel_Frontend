import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth: {
      state: () => ({
        user: null,
        drawer: null,
      }),
      getters: {
        user: state => state.user,
        authenticaticated: state => state.user != null
      },
      mutations: {
        SET_USER(state, user) {
          state.user = user
        },
        SET_DRAWER(state, payload) {
          state.drawer = payload
        },
        DEFAULT() { }
      },
      actions: {
      
      }
    }
  }
})

