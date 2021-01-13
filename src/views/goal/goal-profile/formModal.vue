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
                <form @keydown="form.errors.clear($event.target.name)">

                    <v-card-title>
                        <span class="headline" v-html="title"></span>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                            label="Name"
                                            v-model="form.name"
                                            name="name"
                                            autofocus
                                            :error-messages="form.errors.get('name')"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-autocomplete
                                            v-model="form.agency_id"
                                            label="Agency"
                                            name="agency_id"
                                            :items="agencies"
                                            item-text="name"
                                            item-value="id"
                                            :error-messages="form.errors.get('agency_id')"
                                            clearable
                                            :disabled="isUpdate"
                                            flat
                                    ></v-autocomplete>

                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-text-field
                                            label="Type"
                                            v-model="form.type"
                                            name="type"
                                            autofocus
                                            :error-messages="form.errors.get('type')"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <v-autocomplete
                                            v-model="form.status"
                                            label="Status"
                                            name="status"
                                            :items="statuses"
                                            item-text="name"
                                            item-value="id"
                                            :error-messages="form.errors.get('status')"
                                            flat
                                    ></v-autocomplete>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="saveForm">
                            Save
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>

        </v-dialog>
    </div>
</template>

<script>
    import {statuses, roles} from "../../../helpers/initialData";
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import Form from "../../../helpers/classes/Form";

    export default {
        name: "GoalProfileFormModal",
        props: ['formTitle'],

        data: () => ({
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