<template>
    <v-data-table
            :loading="isLoading"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="dataArray"
            sort-by="first_name"
            class="elevation-1"
            :search="search"
            :options.sync="options"
            :server-items-length="200"
    >

        <template v-slot:top>
            <v-toolbar flat>
                <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        hide-details
                ></v-text-field>
            </v-toolbar>
            <v-dialog v-model="deleteDialog" max-width="500px">
                <v-card>
                    <v-card-title class="headline">Are you sure you want to delete this item?</v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="closeDeleteDialog">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
                        <v-spacer></v-spacer>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </template>

        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>

    </v-data-table>
</template>
<script>

    export default {
        name: "CrudDataTable",
        props: {
            getDataApi: String,
            deleteApi: String,
            headers: {},
            editedItem: {},
            editedIndex: {},
        },
        data: () => ({
            search: '',
            deleteDialog: false,
            dataArray: [],
            options: {},
            isLoading: false
        }),

        watch: {
            search(val){
                this.addToOptions(val);
            },

            options: {
                handler() {
                    this.getData()
                },
            },

            /*
            * used for when user clicks outside of dialog
            */
            deleteDialog(val) {
                val || this.closeDeleteDialog();
            },
        },

        computed: {
            queryString() {
                return Object.keys(this.options)
                    .map(key => key + '=' + this.options[key]).join('&');
            },

            /*
            * returns the real api path from nested string in api.js
            * ex) "user.list" returns api.user.list
            */
            getListApi() {
                return this.editedItem.getRealPath(this.getDataApi);
            },
            getDeleteApi() {
                return this.editedItem.getRealPath(this.deleteApi);
            }
        },

        mounted() {
            this.getData();
        },

        methods: {

            getData() {
                this.isLoading = true;

                this.getListApi(this.queryString).then((res) => {

                    this.dataArray = res.items;
                    this.isLoading = false;
                });

            },

            addToOptions(val){
                this.$set(this.options,'q', val)
            },


            editItem(item) {
                this.setEditedItem(item);
                this.$emit('update:dialog', true)
            },

            deleteItem(item) {
                this.setEditedItem(item);
                this.deleteDialog = true
            },

            closeDeleteDialog() {
                this.deleteDialog = false
                this.$emit('resetItem');
            },

            deleteItemConfirm() {
                this.getDeleteApi(this.editedItem).then(() => {

                    // this.$emit('update:editedItem', this.dataArray.splice(this.editedIndex, 1))
                    this.closeDeleteDialog()
                    this.getData();

                });

            },

            setEditedItem(item) {
                this.$emit('update:editedIndex', this.dataArray.indexOf(item))
                this.$emit('update:editedItem', Object.assign(this.editedItem, item))
            },
        },
    }
</script>