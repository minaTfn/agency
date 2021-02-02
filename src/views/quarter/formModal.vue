<template>
    <div>
        <v-btn color="primary" data-test="createNew" dark @click="newItem">
            <v-icon left> mdi-plus</v-icon>
            New {{ formTitle }}
        </v-btn>

        <v-dialog id="jestFormDialog"
                  v-model="isModalOpen"
                  max-width="700px"
                  @click:outside="close"
                  @keydown.esc="close"
        >
            <v-card>
                <form @keydown="form.errors.clear($event.target.name)" @submit.prevent="saveForm">
                    <v-card-title>
                        <span class="headline" v-html="title"/>
                    </v-card-title>

                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="form.name"
                                                  label="Name"
                                                  name="name"
                                                  autofocus
                                                  :error-messages="form.errors.get('name')"
                                    />
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <date-picker name="start_date"
                                                 ref="startDate"
                                                 :value.sync="form.start_date"
                                                 :error="form.errors.get('start_date')"
                                                 label="Start Date"
                                    ></date-picker>
                                </v-col>
                                <v-col cols="12" sm="6">
                                    <date-picker name="end_date"
                                                 ref="endDate"
                                                 :value.sync="form.end_date"
                                                 :error="form.errors.get('end_date')"
                                                 label="End Date"
                                    ></date-picker>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn id="jestCancelDialog" color="blue darken-1" text @click="close">
                            Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" type="submit" text>
                            Save
                        </v-btn>
                    </v-card-actions>
                </form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import Form from "../../helpers/classes/Form";
    import DatePicker from "../../components/common/DatePicker";

    export default {
        name: "QuarterFormModal",

        components: {DatePicker},

        props: ['formTitle'],

        data: () => ({
            form: new Form(),
        }),

        computed: {
            ...mapState('quarters', ['isModalOpen']),

            ...mapGetters('quarters', ['isUpdate']),

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
                this.form = _.cloneDeep(this.$store.state.quarters.form)
            },
            form: {
                handler: _.debounce(function (form) {
                    this.updateForm(form);
                }, 500), deep: true
            }
        },

        methods: {

            ...mapActions('quarters', ['save']),

            ...mapMutations('quarters', ['resetForm', 'updateForm', 'closeModal', 'newItem']),

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