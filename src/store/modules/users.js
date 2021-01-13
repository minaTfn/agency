import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";
import {mixinMutations, mixinStates} from "../mixins.js";

const state = () => ({

    ...mixinStates(),

    form: new Form({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        status: '',
        agency_id: '',
        role: '',
        password: '',
        verify_password: '',
        id: ''
    }),
    isChangePassword: false,
    agencies: [],

})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
    isChangePassword(state) {
        return state.actionType == 'changePassword'
    }
}

const actions = {

    getAllUsers({commit}, params) {

        api.user.list(params).then(({items, _meta}) => {
            commit('fetchAll', items);
            commit('setMeta', _meta);
        });
    },

    getAgencies({commit}) {
        api.agency.list().then(response => {
            commit('fetchAgencies', response.items);
        });
    },

    deleteUser({dispatch, state}) {

        api.user.delete(state.form).then(() => {
            dispatch('getAllUsers');

            this._vm.$snackbar.showMessage({message: 'Item deleted successfully'})
        }).catch(error => {
            this._vm.$snackbar.showMessage({message: error.response.data.name, color: 'error'})
        });

    },

    changePassword({}, data) {
        return api.user.changePassword(data.id, {
            'password': data.password,
            'verify_password': data.verify_password
        })
    },

    updateUser({}, data) {
        return api.user.update(data)
    },

    createUser({}, data) {
        return api.user.create(data)
    },

    save({dispatch, getters, commit}, data) {

        const action = getters.isUpdate
            ? 'updateUser'
            : (getters.isChangePassword ? 'changePassword' : 'createUser')

        const message = getters.isUpdate
            ? 'Item updated'
            : (getters.isChangePassword ? 'Password changed' : 'Item created')


        dispatch(action, data).then(() => {

            commit('resetForm');
            commit('closeModal');
            dispatch('getAllUsers');
            this._vm.$snackbar.showMessage({message: `${message} successfully`})

        }).catch(error => {
            commit('getErrors', error.response.data)
        });

    },

}

const mutations = {

    ...mixinMutations(),

    changePassword(state, item) {
        state.isModalOpen = true
        state.actionType = 'changePassword';
        state.form = Object.assign(state.form, item)
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