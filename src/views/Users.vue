<template>
    <div>
        <v-btn color="primary" dark class="mb-2" @click="formModal=true">
            New User
        </v-btn>

        <user-form-modal
                buttonTitle="New User"
                @edited="onFormItemEdit"
                @saved="onModalSave"
                :item="form"
                formTitle="User"
                :dialog="formModal"
                :isUpdate="isUpdate"
                @resetItem="resetEditedItem"/>

        <crud-data-table
                :dataArray="dataArray"
                :headers="headers"
                :editedItem.sync="form"
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
    import Form from "../helpers/classes/Form";

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
            form: new Form({
                first_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                status: 0,
                agency_id: '',
                password: '',
                verify_password: '',
                id: ''
            }),
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
                this.form = Object.assign(this.form, this.$options.data()['form'])
                this.editedIndex = -1
            },

            onFormItemEdit(item) {
                this.form[item.field] = item.value
            },

            onSuccess() {
                this.formModal = false;
                this.getData();
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