import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import {mixinMutations, mixinStates} from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        name: '',
        phone_number: '',
        status: '',
        address: '',
        id: ''
    }),
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    getAllAgencies({commit}, params) {
        api.agency.list(params).then(({items, _meta}) => {
            commit('fetchAll', items);
            commit('setMeta', _meta);
        });
    },

    deleteAgency({dispatch, state}) {

        api.agency.delete(state.form).then(() => {
            dispatch('getAllAgencies');

            this._vm.$snackbar.showMessage({message: 'Item deleted successfully'})
        }).catch(error => {
            this._vm.$snackbar.showMessage({message: error.response.data.name, color: 'error'})
        });

    },

    updateAgency({}, data) {
        return api.agency.update(data)
    },

    createAgency({}, data) {
        return api.agency.create(data)
    },

    save({dispatch, getters, commit}, data) {

        const action = getters.isUpdate ? 'updateAgency' : 'createAgency'
        const message = getters.isUpdate ? 'Item updated' : 'Item created'

        dispatch(action, data).then(() => {

            commit('resetForm');
            commit('closeModal');
            dispatch('getAllAgencies');

            this._vm.$snackbar.showMessage({message: `${message} successfully`})

        }).catch(error => {
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