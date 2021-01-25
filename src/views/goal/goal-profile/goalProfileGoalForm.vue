<template>
    <form @keydown.enter.prevent="saveForm" @keydown="form.errors.clear($event.target.name)">
        <v-container>
            <v-row>
                <v-col cols="12" sm="7">
                    <v-autocomplete
                            v-model="form.goal_id"
                            label="Goal"
                            name="goal_id"
                            :items="goals"
                            item-text="name"
                            item-value="id"
                            :error-messages=" ! isUpdate ? form.errors.get('goal_id') : ''"
                            clearable
                            autofocus
                            flat/>
                </v-col>
                <v-col cols="12" sm="2">
                    <v-text-field
                            v-model="form.percentage"
                            label="Percentage"
                            type="number"
                            name="percentage"
                            :error-messages=" ! isUpdate ? form.errors.get('percentage') : ''"/>
                </v-col>
                <v-col cols="12" sm="3">

                    <v-btn class="mt-3"
                           color="success"
                           @click="saveForm">
                        Add
                    </v-btn>

                </v-col>
            </v-row>
        </v-container>
    </form>
</template>

<script>
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import Form from "../../../helpers/classes/Form";

    export default {
        name: "GoalProfileGoalForm",

        data: () => ({
            form: new Form(),
        }),

        computed: {

            ...mapState('goalProfileGoals', ['actionType', 'goals']),

            ...mapGetters('goalProfileGoals', ['isUpdate']),

            ...mapState('goalProfiles', ['currentStep']),

        },

        watch: {

            actionType() {
                if (this.actionType == 'create') {
                    this.setFormData()
                }
            },
            currentStep() {
                if (this.currentStep == 'addGoals') {
                    this.resetForm();
                    this.setFormData()
                }
            },
            form: {
                handler: _.debounce(function (form) {
                    if (!this.isUpdate) {
                        this.updateForm(form);
                    }
                }, 500), deep: true
            }
        },

        mounted() {
            this.getGoals()
        },

        methods: {

            ...mapActions('goalProfileGoals', ['save', 'getGoals']),

            ...mapMutations('goalProfileGoals', ['updateForm', 'resetForm']),

            saveForm() {

                this.$nextTick(() => {

                    this.save(this.form).then(() => {
                        this.resetForm()
                        this.setFormData()
                    });

                })

            },

            setFormData() {
                if (!this.isUpdate) {
                    this.form = _.cloneDeep(this.$store.state.goalProfileGoals.form)
                }
            },

        }
    }
</script>