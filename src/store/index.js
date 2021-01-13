import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import agencies from './modules/agencies'
import goals from './modules/goals'
import snackbar from './modules/snackbar'
import goalProfiles from './modules/goal-profiles'

Vue.use(Vuex)

Vue.config.devtools = process.env.NODE_ENV === 'development'

const debug = process.env.NODE_ENV !== 'production'
export default new Vuex.Store({
    modules: {
        users,
        agencies,
        goals,
        goalProfiles,
        snackbar,
    },
    strict: debug,
})
