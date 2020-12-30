<template>
    <div>
        <v-btn color="primary" dark class="mb-2" @click="formModal=true">
            New User
        </v-btn>

        <user-form-modal
                buttonTitle="New User"
                @edited="onFormItemEdit"
                @saved="onModalSave"
                :item="editedItem"
                formTitle="User"
                :dialog="formModal"
                :isUpdate="isUpdate"
                @resetItem="resetEditedItem"/>

        <crud-data-table
                :dataArray="dataArray"
                :headers="headers"
                :editedItem.sync="editedItem"
                :editedIndex.sync="editedIndex"
                @resetItem="resetEditedItem"
                :dialog.sync="formModal"
                :isLoading="isLoading"/>
    </div>

</template>
<script>
    import CrudDataTable from "../components/common/CrudDataTable";
    import api from "../helpers/api";
    import UserFormModal from "../components/UserFormModal";

    export default {
        name: "Users",
        components: {UserFormModal, CrudDataTable},
        data: () => ({
            formModal: false,
            search: '',
            isLoading: false,
            headers: [],
            dataArray: [],
            editedIndex: -1,
            editedItem: {
                first_name: '',
                last_name: '',
                phone_number: '',
                status: 0,
                agency_id: '',
                id: ''
            },
            errors: {}
        }),

        created() {
            this.getData();
            this.setHeaders();
        },

        computed: {
            isUpdate() {
                return this.editedIndex > -1;
            }
        },

        methods: {

            getData() {
                this.isLoading = true;

                api.user.list().then((res) => {

                    this.dataArray = res.items;
                    this.isLoading = false;
                });

            },

            setHeaders() {
                this.headers = [
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Phone Number', value: 'phone_number'},
                    {text: 'Status', value: 'status'},
                    {text: 'Agency', value: 'agency_id'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ]
            },

            resetEditedItem() {
                this.formModal = false
                this.editedItem = Object.assign({}, this.$options.data()['editedItem'])
                this.errors = {};
                this.editedIndex = -1
            },

            onFormItemEdit(item) {
                this.editedItem[item.field] = item.value
            },

            onModalSave: async function () {

                if (this.isUpdate) {
                    await api.user.update(this.editedItem.id, this.editedItem)
                        .catch(error => {
                            this.errors = error.response.data;
                        })

                } else {
                    await api.user.create(this.editedItem)
                        .catch(error => {
                            this.errors = error.response.data;
                        })
                }

                this.$nextTick(function () {
                    this.formModal = false;
                    this.getData();
                })

            },

        },
    }
</script>