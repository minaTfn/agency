<template>
    <v-stepper v-model="currentStep">
        <v-stepper-header>
            <template v-for="n in steps">
                <v-stepper-step
                        :rules="[() => false]"
                        :key="`${n}-step`"
                        :complete="currentStep > n"
                        :step="n"
                        editable>

                    <slot name="step" v-bind:current="n"></slot>

                </v-stepper-step>

                <v-divider
                        v-if="n !== steps"
                        :key="n"
                ></v-divider>

            </template>
        </v-stepper-header>

        <v-stepper-items>
            <v-stepper-content
                    v-for="n in steps"
                    :key="`${n}-content`"
                    :step="n">

                <slot v-bind:current="n"></slot>

                <v-btn
                        color="primary"
                        @click="nextStep(n)">
                    Continue
                </v-btn>

                <v-btn text>
                    Cancel
                </v-btn>
            </v-stepper-content>
        </v-stepper-items>
    </v-stepper>
</template>

<script>
    export default {
        name: "Stepper",
        props:['steps'],

        data () {
            return {
                currentStep: 1,
            }
        },

        methods: {
            nextStep (n) {
                if (n < this.steps) {
                    this.currentStep = n + 1
                }
            },
        },
    }
</script>