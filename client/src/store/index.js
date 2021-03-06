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
    list: [],
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
    },
    setList(state, data) {
      state.list = data
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

    async getAllListItems({ commit }) {
      try {
        let list = await api.get(`/list/`)
        commit('setList', list.data)
      } catch (error) {
        console.error(error)
      }
    },

    async getListItemsById({ commit }, userId) {
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
        dispatch('getAllListItems')
      } catch (error) {
        console.error(error)
      }

    },

    async deleteListItem({ commit, dispatch }, listId) {
      try {
        await api.delete(`/list/${listId}`)
        dispatch('getAllListItems')
      } catch (error) {
        console.error(error)
      }
    },

    async toggleCheckStatus({ commit, dispatch }, list) {
      try {
        await api.put(`/list/${list._id}`, list)
        dispatch('getAllListItems')
      } catch (error) {
        console.error(error)
      }
    }

  }
})
