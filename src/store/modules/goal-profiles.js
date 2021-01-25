import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import {mixinMutations, mixinStates} from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        name: '',
        status: '',
        agency_id: '',
        type: '',
        id: ''
    }),
    currentStep:'',
    agencies: [],
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    getAllGoalProfiles({commit}, params) {

        api.goalProfile.list(params).then(({items, _meta}) => {
            commit('fetchAll', items);
            commit('setMeta', _meta);
        });
    },

    getAgencies({commit}) {
        api.agency.list().then(response => {
            commit('fetchAgencies', response.items);
        });
    },

    deleteGoalProfile({commit, dispatch, state}) {

        api.goalProfile.delete(state.form).then(() => {

            dispatch('getAllGoalProfiles');

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

        return new Promise((resolve,reject)=>{
            dispatch(action, data).then((response) => {

                dispatch('getAllGoalProfiles');
                this._vm.$snackbar.showMessage({message: `${message} successfully`})

                resolve(response);

            }).catch(error => {
                commit('getErrors', error.response.data)

                reject(error.response.data);
            });
        })
    },

}

const mutations = {

    ...mixinMutations(),

    changeStep(state,step){
        state.currentStep = step
    },

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