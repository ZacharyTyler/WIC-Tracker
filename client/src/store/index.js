import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'
import AuthService from '../AuthService'

Vue.use(Vuex)

let base = window.location.host.includes('localhost:8080') ? '//localhost:3000/' : '/'

let api = axios.create({
  baseURL: base + 'api/',
  timeout: 3000,
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    user: {},
    listItems: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    resetState(state) {
      //clear the entire state object of user data
      state.user = {}
    },
    setListItems(state, data) {
      state.listItems = data
    }
  },
  actions: {
    //SECTION Login

    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds)
        commit('setUser', user)
        router.push({ name: "listView" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        debugger
        let user = await AuthService.Login(creds)
        commit('setUser', user)
        router.push({ name: "listView" })
      } catch (e) {
        console.warn(e.message)
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout()
        if (!success) { }
        commit('resetState')
        router.push({ name: "login" })
      } catch (error) {
        console.error(error)
      }
    },
    //!SECTION

    async getAllListItemsById({ commit }, userId) {
      try {
        let list = await api.get(`/list/${userId}`)
        commit('setListItems', list.data)
      } catch (error) {
        console.error(error)
      }
    },

    async createListItem({ commit, dispatch }, payload) {
      try {
        let item = await api.post(`/list`, payload)
        dispatch('getAllListItemsById', payload)
      } catch (error) {
        console.error(error)
      }

    }

  }
})
