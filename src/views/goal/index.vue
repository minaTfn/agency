<template>
    <div>

        <div class="d-flex justify-space-between mb-7 ">
            <div class="text-h5">
                {{pageTitle | pluralize }}
            </div>
            <goal-form-modal :formTitle="pageTitle"/>
        </div>

        <crud-data-table
                @getData="getAllGoals"
                @deleteItem="deleteGoal"
                :data="data"
                @edit="onEdit"
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
    import GoalFormModal from "./formModal";
    import {mapActions, mapMutations, mapState} from "vuex";


    export default {
        name: "Goals",
        components: {GoalFormModal, CrudDataTable},

        data: () => ({
            pageTitle: 'Goal',
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'Type', value: 'static'},
                {text: 'Agency', value: 'agency.name'},
                {text: 'Status', value: 'status'},
                {text: 'Actions', value: 'actions', sortable: false, width:80},
            ],
            actions: [
                {name: 'edit', event: 'edit', icon: 'mdi-pencil'},
            ],
            customValues: [
                {
                    name: 'status',
                    values: {10: 'Active', 9: 'Inactive'}
                },
                {
                    name: 'static',
                    values: {0: 'Normal', 1: 'Static'}
                },
            ],
            isLoading: false
        }),

        computed: {
            ...mapState({
                data: state => state.goals.all,
                totalCount: state => state.goals.meta.totalCount,
                perPage: state => state.goals.meta.perPage,
                agencies: state => state.goals.agencies,
            }),
        },

        methods: {

            ...mapActions('goals', ['getAllGoals', 'deleteGoal']),

            ...mapMutations('goals', {
                onEdit: 'edit',
                onDelete: 'delete',
                onResetForm: 'resetForm',
            }),


        },
    }
</script>