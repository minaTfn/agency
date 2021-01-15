<template>
    <div>
        <v-btn color="primary" dark @click="newItem">
            <v-icon left>
                mdi-plus
            </v-icon>
            New {{formTitle}}
        </v-btn>

        <v-dialog
                @click:outside="close"
                @keydown.esc="close"
                v-model="isModalOpen"
                max-width="1000px">
            <v-card>

                <v-stepper v-model="currentStep" @change="changeStep">
                    <v-stepper-header>
                        <template v-for="stepNum in stepsCount">
                            <v-stepper-step
                                    :key="`${stepNum}-step`"
                                    :complete="currentStep > stepNum"
                                    :step="stepNum"
                                    :editable="stepNum==1">

                                <span v-for="(step, index) in steps"
                                      :key="step"
                                      v-show="stepNum == index">
                            {{ title(step) }}
                        </span>

                            </v-stepper-step>

                            <v-divider
                                    v-if="stepNum !== stepsCount"
                                    :key="stepNum"
                            ></v-divider>

                        </template>
                    </v-stepper-header>

                    <v-stepper-items>
                        <v-stepper-content
                                v-for="n in stepsCount"
                                :key="`${n}-content`"
                                :step="n">

                            <goal-profile-form v-if="n == 1"
                                               :isActive="isModalOpen"
                                               @next="nextStep(n)"
                                               @close="close">

                            </goal-profile-form>

                            <div v-if="n == 2">

                                <goal-profile-goal-form />

                                <goals-grid-view />

                                <v-card-actions class="mt-6 justify-end">
                                    <v-btn color="primary" class="px-6" @click="close">
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
        }),

        computed: {

            ...mapState('goalProfiles', ['isModalOpen', 'agencies']),

            ...mapGetters('goalProfiles', ['isUpdate']),

            stepsCount() {
                return Object.entries(this.steps).length
            }
        },

        methods: {

            ...mapActions('goalProfiles', ['save']),

            ...mapMutations('goalProfiles', ['changeStep','resetForm', 'updateForm', 'closeModal', 'newItem']),

            title(step) {
                return `${(this.isUpdate) ? 'Edit' : 'Add'} ${step}`;
            },

            nextStep(n) {
                if (n < this.stepsCount) {
                    this.currentStep = n + 1
                }
            },

            changeStep(step){
                if(step == 1)
                    this.changeStep('goalProfile');
                else if(step == 2)
                    this.changeStep('addGoals');

            },

            close() {

                this.closeModal();
                this.resetForm();
            },
        }
    }
</script>