<template>
    <v-data-table
            :loading="isLoading"
            loading-text="Loading... Please wait"
            :headers="headers"
            :items="dataArray"
            sort-by="calories"
            class="elevation-1"
            :search="search"
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
        </template>

        <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
            </v-icon>
            <v-icon small @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>

        <template v-slot:top>
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

    </v-data-table>
</template>
<script>


    export default {
        name: "CrudDataTable",
        props: {
            dataArray: {default: {}},
            headers: {},
            isLoading: {default: false},
            editedItem: {},
            editedIndex: {},
        },
        data: () => ({
            search: '',
            deleteDialog: false,
            data: [],
        }),

        watch: {
            /*
            * used for when user clicks outside of dialog
            */
            deleteDialog(val) {
                val || this.closeDeleteDialog()
            },
        },

        methods: {

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
                this.$emit('update:editedItem', this.dataArray.splice(this.editedIndex, 1))
                this.closeDeleteDialog()
            },

            setEditedItem(item) {
                this.$emit('update:editedIndex', this.dataArray.indexOf(item))
                this.$emit('update:editedItem', Object.assign(this.editedItem, item))
            },
        },
    }
</script>