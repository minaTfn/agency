import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import {mixinMutations, mixinStates} from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        name: '',
        start_date: '',
        end_date: '',
        id: ''
    }),
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    getAllQuarters({commit}, params) {

        api.quarter.list(params).then(({items, _meta}) => {
            commit('fetchAll', items);
            commit('setMeta', _meta);
        });
    },

    deleteQuarter({dispatch, state}) {

        api.quarter.delete(state.form).then(() => {
            dispatch('getAllQuarters');

            this._vm.$snackbar.showMessage({message: 'Item deleted successfully'})
        }).catch(error => {
            this._vm.$snackbar.showMessage({message: error.response.data.name, color: 'error'})
        })

    },

    updateQuarter({}, data) {
        return api.quarter.update(data)
    },

    createQuarter({}, data) {
        return api.quarter.create(data)
    },

    async save({dispatch, getters, commit}, data) {

        const action = getters.isUpdate ? 'updateQuarter' : 'createQuarter'

        const message = getters.isUpdate ? 'Item updated' : 'Item created'

        await dispatch(action, data).then(() => {
            commit('resetForm');
            commit('closeModal');
            dispatch('getAllQuarters');
            this._vm.$snackbar.showMessage({message: `${message} successfully`})
            console.log('response','res')
        }).catch(error => {
            console.log('error',error.response.data)
            commit('getErrors', error.response.data)
        });

    },

}

const mutations = {

    ...mixinMutations(),

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}