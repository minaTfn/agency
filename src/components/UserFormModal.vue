<template>
    <v-dialog @click:outside="close" v-model="dialog" max-width="700px">
        <v-card>
            <form>

                <v-card-title>
                    <span class="headline" v-html="title"></span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="First Name"
                                        v-model="item.first_name"
                                        name="first_name"
                                        autofocus
                                        :error-messages="item.errors.get('first_name')"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Last Name"
                                        v-model="item.last_name"
                                        name="last_name"
                                        :error-messages="item.errors.get('last_name')"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Email"
                                        v-model="item.email"
                                        name="email"
                                        :error-messages="item.errors.get('email')"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Phone Number"
                                        v-model="item.phone_number"
                                        name="phone_number"
                                        :error-messages="item.errors.get('phone_number')"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                        v-model="item.agency_id"
                                        label="Agency"
                                        name="agency_id"
                                        :items="agencies"
                                        item-text="name"
                                        item-value="id"
                                        :error-messages="item.errors.get('agency_id')"
                                        clearable
                                        flat
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                        v-model="item.status"
                                        label="Status"
                                        name="status"
                                        :items="statuses"
                                        item-text="name"
                                        item-value="id"
                                        :error-messages="item.errors.get('status')"
                                        clearable
                                        flat
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-autocomplete
                                        v-model="item.role"
                                        label="Role"
                                        name="role"
                                        :items="roles"
                                        :error-messages="item.errors.get('role')"
                                        clearable
                                        flat
                                ></v-autocomplete>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if=" ! isUpdate">
                                <v-text-field
                                        label="Password"
                                        v-model="item.password"
                                        name="password"
                                        type="password"
                                        :error-messages="item.errors.get('password')"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if=" ! isUpdate">
                                <v-text-field
                                        label="Verify Password"
                                        v-model="item.verify_password"
                                        name="verify_password"
                                        type="password"
                                        :error-messages="item.errors.get('verify_password')"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="close">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save">
                        Save
                    </v-btn>
                </v-card-actions>
            </form>
        </v-card>

    </v-dialog>
</template>

<script>
    import api from "../helpers/api";
    import {statuses, roles} from "../helpers/initialData";

    export default {
        name: "UserFormModal",

        props: ['dialog', 'formTitle', 'item', 'buttonTitle', 'isUpdate'],

        data: () => ({
            agencies: [],
            statuses: statuses,
            roles: roles,
        }),

        computed: {
            title() {
                return `${(this.isUpdate) ? 'Edit' : 'New'} ${this.formTitle}`
            }
        },
        mounted() {
            this.initializer();
        },
        methods: {
            initializer() {
                api.agency.list().then(response => {
                    this.agencies = response
                });
            },

            save() {
                this.$emit('saved');
            },
            close() {
                this.$emit('resetItem');
            },
        }
    }
</script>