<template>
    <div>
        <v-btn color="primary" dark @click="newGoalProfile">
            <v-icon left>
                mdi-plus
            </v-icon>
            New {{formTitle}}
        </v-btn>

        <v-dialog
                @click:outside="close"
                @keydown.esc="close"
                v-model="isModalOpen"
                max-width="700px">
            <v-card>
                <v-card-title>
                    <span class="headline" v-html="title"></span>
                </v-card-title>

                <stepper :steps="Object.entries(steps).length">

                    <template v-slot:step="stepper">
                        <span v-for="(step, index) in steps"
                              :key="step"
                              v-show="stepper.current == index">
                            {{ step }}
                        </span>
                    </template>
                    <template v-slot:default="stepper">
                        <div v-if="stepper.current == 1">
                            <v-card

                                    class="mb-12"
                                    color="grey lighten-1"
                                    height="400px"
                            >step 1
                            </v-card>
                        </div>

                        <div v-if="stepper.current == 2">
                            <v-card

                                    class="mb-12"
                                    color="grey lighten-1"
                                    height="400px"
                            >step 2
                            </v-card>
                        </div>
                        <div v-if="stepper.current == 3">
                            <v-card

                                    class="mb-12"
                                    color="grey lighten-1"
                                    height="400px"
                            >step 3
                            </v-card>
                        </div>

                    </template>
                </stepper>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {statuses, roles} from "../../../helpers/initialData";
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import Form from "../../../helpers/classes/Form";
    import Stepper from '../../../components/Stepper'

    export default {
        name: "GoalProfileFormModal",
        components: {Stepper},
        props: ['formTitle'],

        data: () => ({
            steps: {1: 'Goal Profile', 2: 'Goal profile goals'},
            form: new Form(),
            statuses: statuses,
        }),

        computed: {

            ...mapState({
                isModalOpen: state => state.goalProfiles.isModalOpen,
                agencies: state => state.goalProfiles.agencies,
            }),

            ...mapGetters('goalProfiles', ['isUpdate']),

            title() {

                return `${(this.isUpdate) ? 'Edit' : 'New'} ${this.formTitle}`;
            }
        },

        filters: {
            toNumber(data) {
                return +data;
            }
        },

        watch: {
            isModalOpen() {
                this.form = _.cloneDeep(this.$store.state.goalProfiles.form)
            },
            form: {
                handler: _.debounce(function (form) {
                    this.updateForm(form);
                }, 500), deep: true
            }
        },

        mounted() {
            this.getAgencies();
        },

        methods: {

            ...mapActions('goalProfiles', ['save', 'getAgencies']),

            ...mapMutations('goalProfiles', {
                resetForm: 'resetForm',
                updateForm: 'updateForm',
                closeModal: 'closeModal',
                newGoalProfile: 'new'
            }),

            saveForm() {

                this.$nextTick(() => {
                    this.save(this.form);
                })
            },

            close() {

                this.closeModal();
                this.resetForm();
            },
        }
    }
</script>