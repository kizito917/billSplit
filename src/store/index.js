import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: 'User',
    billRecipents: []
  },
  getters: {
    userName(state) {
      return state.userName
    },
    billRecipents(state) {
      return state.billRecipents
    }
  },
  mutations: {
    getName: (state, payload) => {
      state.userName = payload
    },
    getBillList: (state, payload) => {
      state.billRecipents = payload
    }
  },
  actions: {
    //action to get name from local storage to mutate
    getName: (context) => {
      context.commit('getName', localStorage.getItem('bearer_name'))
    },
    //action to get bills created by a user
    getBillList: (context) => {
        const bearerAccId = localStorage.getItem('bearer_accountId')
        const config = {
          headers: {
              'authorization': localStorage.getItem('bearerToken'),
          }     
      }
      //making a get request to fetch bill from API Endpoint
      axios({
        method: "get",
        url: "https://billsplitapi.herokuapp.com/bills/list",
        params: {
          user_account_id: bearerAccId
        },
        config})
        .then((res) => {
          console.log(res.data.message[0].title)
          context.commit('getBillList', res.data.message[0].bill_recipients)
        })
        .catch((err) => console.log(err))
    }
  }
})
