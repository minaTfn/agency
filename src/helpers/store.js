import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        count: 10
    },
    mutations: {
        alertMsg(state,payload){
            state.count = payload
        },

        increment (state) {
            state.count++
        }
    }
})

export default store