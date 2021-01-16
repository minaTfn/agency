<template>
  <form @keydown="form.errors.clear($event.target.name)">
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="form.name"
            label="Name"
            name="name"
            autofocus
            :error-messages="form.errors.get('name')"
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
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
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-autocomplete
            v-model="form.type"
            label="Type"
            name="type"
            :items="types"
            item-text="name"
            item-value="id"
            :error-messages="form.errors.get('type')"
            flat
          />
        </v-col>
        <v-col
          cols="12"
          sm="6"
        >
          <v-autocomplete
            v-model="form.status"
            label="Status"
            name="status"
            :items="statuses"
            item-text="name"
            item-value="id"
            :error-messages="form.errors.get('status')"
            flat
          />
        </v-col>

        <v-card-actions class="mt-6 ml-auto">
          <v-btn
            text
            @click="cancel"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            @click="saveForm"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-row>
    </v-container>
  </form>
</template>

<script>
    import {statuses, types} from "../../../helpers/initialData";
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import Form from "../../../helpers/classes/Form";

    export default {
        name: "GoalProfileForm",

        data: () => ({
            form: new Form(),
            statuses: statuses,
            types: types,
        }),

        computed: {

            ...mapState('goalProfiles', ['agencies', 'isModalOpen']),

            ...mapGetters('goalProfiles', ['isUpdate']),
        },

        watch: {
            isModalOpen() {
                this.setFormData()
            },
            form: {
                handler: _.debounce(function (form) {
                    this.updateForm(form);
                }, 500), deep: true
            }
        },

        mounted() {
            this.changeStep('addGoalProfileStep');
            this.getAgencies();
            this.setFormData()
        },

        methods: {

            ...mapActions('goalProfiles', ['save', 'getAgencies']),

            ...mapMutations('goalProfiles', ['resetForm', 'updateForm', 'changeStep']),
            ...mapMutations('goalProfileGoals', ['setGoalProfileId']),

            saveForm() {

                this.$nextTick(() => {

                    this.save(this.form).then((goalProfile) => {
                        this.setGoalProfileId(goalProfile.id);
                        this.form.id = goalProfile.id;
                        this.changeStep('addGoals');
                        this.$emit('next')
                    }).catch((error) => {

                    });

                })
            },

            setFormData() {
                this.form = _.cloneDeep(this.$store.state.goalProfiles.form)
            },

            cancel() {
                this.$emit('close')
            },
        }
    }
</script>