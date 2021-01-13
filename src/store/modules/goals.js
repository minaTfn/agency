import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import {mixinMutations, mixinStates} from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        name: '',
        status: '',
        agency_id: '',
        static: {default: 0, type: Number},
        id: ''
    }),
    agencies: [],
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    getAllGoals({commit}, params) {

        api.goal.list(params).then(({items, _meta}) => {
            commit('fetchAll', items);
            commit('setMeta', _meta);
        });
    },

    getAgencies({commit}) {
        api.agency.list().then(response => {
            commit('fetchAgencies', response.items);
        });
    },

    deleteGoal({dispatch, state}) {

        api.goal.delete(state.form).then(() => {
            dispatch('getAllGoals');

            this._vm.$snackbar.showMessage({message: 'Item deleted successfully'})
        }).catch(error => {
            this._vm.$snackbar.showMessage({message: error.response.data.name, color: 'error'})
        })

    },

    updateGoal({}, data) {
        return api.goal.update(data)
    },

    createGoal({}, data) {
        return api.goal.create(data)
    },

    save({dispatch, getters, commit}, data) {

        const action = getters.isUpdate ? 'updateGoal' : 'createGoal'

        const message = getters.isUpdate ? 'Item updated' : 'Item created'

        dispatch(action, data).then(() => {

            commit('resetForm');
            commit('closeModal');
            dispatch('getAllGoals');
            this._vm.$snackbar.showMessage({message: `${message} successfully`})

        }).catch(error => {
            commit('getErrors', error.response.data)
        });

    },

}

const mutations = {

    ...mixinMutations(),

    fetchAgencies(state, agencies) {
        state.agencies = agencies
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}