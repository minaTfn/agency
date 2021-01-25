<template>
    <div>
        <v-btn color="primary"
               dark
               @click="newItem">

            <v-icon left>
                mdi-plus
            </v-icon>

            New {{ formTitle }}
        </v-btn>

        <v-dialog
                :value="isModalOpen"
                max-width="1000px"
                @click:outside="close"

                @keydown.esc="close">
            <v-card>
                <v-stepper v-model="currentStep">
                    <v-stepper-header>
                        <template v-for="stepNum in stepsCount">
                            <v-stepper-step :key="`${stepNum}-step`"
                                            :complete="currentStep > stepNum"
                                            :step="stepNum"
                                            :editable="stepNum==1"
                            >

                                <span v-for="(step, index) in steps"
                                      v-show="stepNum == index"
                                      :key="step"
                                >
                                  {{ stepTitle(step) }}
                                </span>
                            </v-stepper-step>

                            <v-divider
                                    v-if="stepNum !== stepsCount"
                                    :key="stepNum"
                            />
                        </template>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content
                                v-for="step in stepsCount"
                                :key="`${step}-content`"
                                :step="step"
                        >
                            <goal-profile-form
                                    v-if="step == 1"
                                    :is-active="isModalOpen"
                                    @next="nextStep(step)"
                                    @close="close"
                            />

                            <div v-if="step == 2">
                                <goal-profile-goal-form/>

                                <goals-grid-view :key="forceRenderKey"/>

                                <v-card-actions class="mt-6 justify-end">

                                    <v-btn color="primary"
                                           class="px-6"
                                           @click="close"
                                    >
                                        Done
                                    </v-btn>
                                </v-card-actions>
                            </div>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";

    import GoalProfileForm from "./goalProfileForm";
    import GoalProfileGoalForm from "./goalProfileGoalForm";
    import GoalsGridView from "./goalsGridView";

    export default {
        name: "StepperModal",
        components: {GoalProfileForm, GoalProfileGoalForm, GoalsGridView},
        props: ['formTitle'],

        data: () => ({
            steps: {1: 'Goal Profile', 2: 'Goals'},
            currentStep: 1,
            forceRenderKey: 1
        }),

        computed: {

            ...mapState('goalProfiles', ['isModalOpen', 'agencies']),

            ...mapGetters('goalProfiles', ['isUpdate']),

            ...mapGetters('goalProfileGoals', {
                goalGridViewUpdate: 'isUpdate',
            }),

            stepsCount() {
                return Object.entries(this.steps).length
            }
        },

        watch: {
            currentStep(step) {
                this.setStepTo(step)
            },
            goalGridViewUpdate() {
                this.forceRenderKey = this.goalGridViewUpdate ? this.forceRenderKey : this.forceRenderKey + 1
            }
        },

        methods: {

            ...mapMutations('goalProfiles', ['changeStep', 'resetForm', 'closeModal', 'newItem', 'editItem']),

            stepTitle(step) {
                return `${(this.isUpdate) ? 'Edit' : 'Add'} ${step}`;
            },

            nextStep(n) {
                if (n < this.stepsCount) {
                    this.currentStep = n + 1
                }
            },

            setStepTo(step) {

                if (step == 1) {
                    this.changeStep('goalProfile');

                    this.editItem(this.$store.state.goalProfiles.form)
                } else if (step == 2){

                    this.changeStep('addGoals');
                }
            },

            close() {
                this.currentStep = 1;
                this.$nextTick(() => {
                    this.closeModal();
                    this.resetForm();
                })

            },
        }
    }
</script>