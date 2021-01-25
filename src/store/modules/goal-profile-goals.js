import api from "../../helpers/api";
import Form from "../../helpers/classes/Form";

const state = () => ({

    all: [],
    actionType: 'create',
    form: new Form({
        goal_id: '',
        percentage: '',
        id: '',
        goal_profile_id: 0
    }),
    goalProfileID: 0,
    goals: [],
})

const getters = {
    isUpdate(state) {
        return state.actionType == 'update'
    },
}

const actions = {

    getAllGoalProfileGoals({commit, state}) {
        api.goalProfile.view(state.goalProfileID).then(({goalProfileGoals}) => {
            commit('fetchAll', goalProfileGoals);
        });
    },

    getGoals({commit}) {
        api.goal.list().then(response => {
            commit('fetchGoals', response.items);
        });
    },

    deleteGoalProfileGoal({dispatch, state}) {

        api.goalProfileGoal.delete(state.form).then(() => {

            dispatch('getAllGoalProfileGoals');

            this._vm.$snackbar.showMessage({message: 'Item deleted successfully'})
        }).catch(error => {
            this._vm.$snackbar.showMessage({message: error.response.data.message, color: 'error'})
        })

    },

    updateGoalProfileGoal({}, data) {
        return api.goalProfileGoal.update(data)
    },

    createGoalProfileGoal({}, data) {
        return api.goalProfileGoal.create(data)
    },

    save({dispatch, getters, commit, state}, data) {

        const action = getters.isUpdate ? 'updateGoalProfileGoal' : 'createGoalProfileGoal'

        const message = getters.isUpdate ? 'Item updated' : 'Item created'

        return new Promise((resolve,reject) => {
            dispatch(action, data).then(() => {

                dispatch('getAllGoalProfileGoals');

                this._vm.$snackbar.showMessage({message: `${message} successfully`})

                resolve();

            }).catch(error => {
                if (error.response.status == 422) { // validation failed
                    commit('getErrors', error.response.data)

                    reject();
                } else {
                    this._vm.$snackbar.showMessage({message: error.response.data.message, color: 'error'})
                }
            });
        })

    },

}

const mutations = {

    updatePercentage(state, item) {
        state.form.percentage = item;
    },

    setGoalProfileId(state, ID) {
        state.form.goal_profile_id = ID
        state.goalProfileID = ID
    },

    fetchGoals(state, goals) {
        state.goals = goals
    },

    fetchAll(state, items) {
        state.all = items
    },

    newItem(state) {
        state.actionType = 'create';
    },

    editItem(state, item) {
        state.actionType = 'update';
        state.form = Object.assign(state.form, item)
    },

    deleteItem(state, item) {
        state.actionType = 'delete';
        state.form = Object.assign(state.form, item)
    },

    resetForm(state) {
        state.form.reset();
        state.form.goal_profile_id = state.goalProfileID
    },
    updateForm(state, item) {
        Object.assign(state.form, item);
    },
    getErrors(state, error) {
        state.form.errors.record(error)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}