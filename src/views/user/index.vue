<template>
    <div>

        <div class="d-flex justify-space-between mb-7 ">
            <div class="text-h5" >
                {{pageTitle | pluralize }}
            </div>
            <user-form-modal :formTitle="pageTitle"/>
        </div>

        <crud-data-table
                @getData="getAllUsers"
                @deleteItem="deleteUser"
                :data="data"
                @edit="onEdit"
                @changePassword="onChangePassword"
                @delete="onDelete"
                @resetForm="onResetForm"
                :actions="actions"
                :customValues="customValues"
                :totalCount="totalCount"
                :perPage="perPage"
                :headers="headers"/>

    </div>

</template>
<script>
    import CrudDataTable from "../../components/common/CrudDataTable";
    import UserFormModal from "./formModal";
    import {mapActions, mapMutations, mapState} from "vuex";


    export default {
        name: "Users",
        components: {UserFormModal, CrudDataTable},

        data: () => ({
            pageTitle: 'User',
            headers: [
                {text: 'Full name', value: 'fullName'},
                {text: 'Email', value: 'email'},
                {text: 'Phone Number', value: 'phone_number', sortable: false},
                {text: 'Status', value: 'status'},
                {text: 'Agency', value: 'agency.name'},
                {text: 'Role', value: 'role'},
                {text: 'Actions', value: 'actions', sortable: false, width: 105},
            ],
            actions: [
                {name: 'edit', event: 'edit', icon: 'mdi-pencil'},
                {name: 'changePassword', event: 'changePassword', icon: 'mdi-lock'},
            ],
            customValues: [{
                name: 'item.status',
                values: {10: 'Active', 9: 'Inactive'}
            }],
            isLoading: false
        }),

        computed: {
            ...mapState({
                data: state => state.users.all,
                totalCount: state => state.users.meta.totalCount,
                perPage: state => state.users.meta.perPage,
                agencies: state => state.users.agencies,
            }),
        },

        methods: {

            ...mapActions('users', ['getAllUsers','deleteUser']),

            ...mapMutations('users', {
                onEdit: 'edit',
                onChangePassword:'changePassword',
                onDelete: 'delete',
                onResetForm: 'resetForm',
            }),


        },
    }
</script>