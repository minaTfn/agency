<template>
    <v-dialog @click:outside="close" :value="dialog" max-width="700px">
        <v-card>
            <form @input="updateItem">

                <v-card-title>
                    <span class="headline" v-html="title"></span>
                </v-card-title>

                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="First Name"
                                        :value="item.first_name"
                                        name="first_name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Last Name"
                                        :value="item.last_name"
                                        name="last_name"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Email"
                                        :value="item.email"
                                        name="email"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Phone Number"
                                        :value="item.phone_number"
                                        name="phone_number"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Status"
                                        :value="item.status"
                                        name="status"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                        label="Agency"
                                        :value="item.agency_id"
                                        name="agency_id"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if=" ! isUpdate">
                                <v-text-field
                                        label="Password"
                                        :value="item.password"
                                        name="password"
                                        type="password"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4" v-if=" ! isUpdate">
                                <v-text-field
                                        label="Verify Password"
                                        :value="item.verify_password"
                                        name="verify_password"
                                        type="password"
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
    export default {
        name: "UserFormModal",
        props: ['dialog', 'formTitle', 'item', 'buttonTitle', 'isUpdate'],
        computed:{
          title(){
              return `${(this.isUpdate) ? 'Edit' : 'New'} ${this.formTitle}`
          }
        },
        methods: {
            updateItem(val) {
                this.$emit('edited', {
                    field: val.target.name,
                    value: val.target.value
                })
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