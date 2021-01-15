import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import {mixinMutations, mixinStates} from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        goal_id: '',
        percentage: '',
        id: ''
    }),
    goalProfileId: 0,
    goals: [],
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    getAllGoalProfileGoals({commit,state}) {

        api.goalProfile.goals(state.goalProfileId).then(({items}) => {
            commit('fetchAll', items);
        });
    },

    getGoals({commit}) {
        api.goal.list().then(response => {
            commit('fetchGoals', response.items);
        });
    },

    deleteGoalProfileGoal({dispatch, state}) {

        api.goalProfile.delete(state.form).then(() => {

            dispatch('getAllGoalProfileGoals');

            this._vm.$snackbar.showMessage({message: 'Item deleted successfully'})
        }).catch(error => {
            this._vm.$snackbar.showMessage({message: error.response.data.name, color: 'error'})
        })

    },

    updateGoalProfile({}, data) {
        return api.goalProfile.update(data)
    },

    createGoalProfile({}, data) {
        return api.goalProfile.create(data)
    },

    save({dispatch, getters, commit}, data) {

        const action = getters.isUpdate ? 'updateGoalProfile' : 'createGoalProfile'

        const message = getters.isUpdate ? 'Item updated' : 'Item created'

        dispatch(action, data).then(() => {

            commit('resetForm');
            dispatch('getAllGoalProfileGoals');
            this._vm.$snackbar.showMessage({message: `${message} successfully`})

        }).catch(error => {
            commit('getErrors', error.response.data)
        });

    },

}

const mutations = {

    ...mixinMutations(),

    setGoalProfileId(state, ID) {
        state.goalProfileId = ID
    },

    fetchGoals(state, goals) {
        state.goals = goals
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}