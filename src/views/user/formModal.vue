<template>
  <div>
    <v-btn
      color="primary"
      dark
      @click="newItem"
    >
      <v-icon left>
        mdi-account-plus
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
                <Fragment v-if=" ! isChangePassword">
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.first_name"
                      label="First Name"
                      name="first_name"
                      autofocus
                      :error-messages="form.errors.get('first_name')"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.last_name"
                      label="Last Name"
                      name="last_name"
                      :error-messages="form.errors.get('last_name')"
                    />
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-text-field
                      v-model="form.email"
                      label="Email"
                      name="email"
                      :error-messages="form.errors.get('email')"
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
                    v-if=" ! isUpdate"
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
                  <v-col
                    cols="12"
                    sm="6"
                  >
                    <v-autocomplete
                      v-model="form.role"
                      label="Role"
                      name="role"
                      :items="roles"
                      :error-messages="form.errors.get('role')"
                      flat
                    />
                  </v-col>
                </Fragment>

                <v-col
                  v-if=" ! isUpdate"
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="form.password"
                    :label="isChangePassword ? `New password` : `Password`"
                    name="password"
                    type="password"
                    :error-messages="form.errors.get('password')"
                  />
                </v-col>
                <v-col
                  v-if=" ! isUpdate"
                  cols="12"
                  sm="6"
                >
                  <v-text-field
                    v-model="form.verify_password"
                    :label="isChangePassword ? `Verify new password` : `Verify password`"
                    name="verify_password"
                    type="password"
                    :error-messages="form.errors.get('verify_password')"
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
    import {statuses, roles} from "../../helpers/initialData";
    import {mapActions, mapState, mapMutations, mapGetters} from "vuex";
    import _ from 'lodash'
    import {Fragment} from 'vue-fragment'
    import Form from "../../helpers/classes/Form";

    export default {
        name: "UserFormModal",
        components:{ Fragment },

        props: ['formTitle'],

        data: () => ({
            form: new Form(),
            statuses: statuses,
            roles: roles,
        }),

        computed: {

            ...mapState('users',['isModalOpen', 'agencies']),

            ...mapGetters('users', ['isUpdate', 'isChangePassword']),

            title() {

                return this.isChangePassword ? 'Change password' :
                    `${(this.isUpdate) ? 'Edit' : 'New'} ${this.formTitle}`;
            }
        },

        watch: {
            isModalOpen() {
                this.form = _.cloneDeep(this.$store.state.users.form)
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

            ...mapActions('users', ['save','getAgencies']),

            ...mapMutations('users', ['resetForm', 'updateForm', 'closeModal', 'newItem']),

            saveForm() {

                this.$nextTick(()=>{
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