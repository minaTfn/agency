<template>
    <div>
        <v-btn color="primary" dark class="mb-2" @click="formModal=true">
            New {{pageTitle}}
        </v-btn>

        <user-form-modal
                buttonTitle="New User"
                @saved="onModalSave"
                :item="form"
                :formTitle="pageTitle"
                :dialog="formModal"
                :isUpdate="isUpdate"
                @resetItem="resetEditedItem"/>

        <crud-data-table
                :headers="headers"
                :editedItem.sync="form"
                ref="dataTable"
                :editedIndex.sync="editedIndex"
                @resetItem="resetEditedItem"
                getDataApi="user.list"
                deleteApi="user.delete"
                :dialog.sync="formModal"/>
    </div>

</template>
<script>
    import CrudDataTable from "../components/common/CrudDataTable";
    import UserFormModal from "../components/UserFormModal";
    import Form from "../helpers/classes/Form";

    export default {
        name: "Users",
        components: {UserFormModal, CrudDataTable},
        data: () => ({
            pageTitle: 'User',
            formModal: false,
            headers: [],
            editedIndex: -1,
            form: new Form({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                status: 0,
                agency_id: '',
                role: '',
                password: '',
                verify_password: '',
                id: ''
            }),
        }),

        created() {
            this.setHeaders();
        },

        computed: {
            isUpdate() {
                return this.editedIndex > -1;
            }
        },

        methods: {

            setHeaders() {
                this.headers = [
                    {text: 'First Name', value: 'first_name'},
                    {text: 'Last Name', value: 'last_name'},
                    {text: 'Email', value: 'email'},
                    {text: 'Phone Number', value: 'phone_number', sortable: false},
                    {text: 'Status', value: 'status'},
                    {text: 'Agency', value: 'agency_id'},
                    {text: 'Actions', value: 'actions', sortable: false},
                ]
            },

            resetEditedItem() {
                this.formModal = false
                this.form.reset();
                this.editedIndex = -1
            },

            onSuccess() {
                this.resetEditedItem();
                this.$refs.dataTable.getData();
            },

            onModalSave() {

                if (this.isUpdate) {

                    this.form.submit('user.update')
                        .then(() => {
                            this.onSuccess();
                        }).catch(error => this.form.errors.record(error));

                } else {
                    this.form.submit('user.create')
                        .then(() => {
                            this.onSuccess();
                        }).catch(error => this.form.errors.record(error));

                }
            },

        },
    }
</script>