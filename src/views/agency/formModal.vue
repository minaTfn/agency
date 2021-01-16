<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click="newItem"
    >
      <v-icon left>
        mdi-home-plus
      </v-icon>
      New {{ formTitle }}
    </v-btn>

    <v-dialog
      v-model="isModalOpen"
      max-width="700px"
      @click:outside="close"
      @keydown.esc="close"
    >
      <v-card>
        <form @keydown="form.errors.clear($event.target.name)">
          <v-card-title>
            <span
              class="headline"
              v-html="title"
            />
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
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
                  <v-text-field
                    v-model="form.phone_number"
                    label="Phone Number"
                    name="phone_number"
                    :error-messages="form.errors.get('phone_number')"
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
                <v-col cols="12">
                  <v-textarea
                    v-model="form.address"
                    label="Address"
                    outlined
                    name="address"
                    :error-messages="form.errors.get('address')"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="close"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="saveForm"
            >
              Save
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
    import {statuses} from "../../helpers/initialData";
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import Form from "../../helpers/classes/Form";

    export default {
        name: "AgencyFormModal",

        props: ['formTitle'],

        data: () => ({
            form: new Form(),
            statuses: statuses,
        }),

        computed: {

            ...mapState('agencies',['isModalOpen']),

            ...mapGetters('agencies', ['isUpdate']),

            title() {

                return `${(this.isUpdate) ? 'Edit' : 'New'} ${this.formTitle}`;
            }
        },

        watch: {
            isModalOpen() {
                this.form = _.cloneDeep(this.$store.state.agencies.form)
            },
            form: {
                handler: _.debounce(function (form) {
                    this.updateForm(form);
                }, 500), deep: true
            }
        },

        methods: {

            ...mapActions('agencies', ['save']),

            ...mapMutations('agencies', ['resetForm', 'updateForm', 'closeModal', 'newItem']),

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