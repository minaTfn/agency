<template>
    <div>

        <div class="d-flex justify-space-between mb-7 ">
            <div class="text-h5">
                {{pageTitle | pluralize }}
            </div>
            <goal-profile-stepper-modal :formTitle="pageTitle"/>
        </div>

        <crud-data-table
                @getData="getAllGoalProfiles"
                @deleteItem="deleteGoalProfile"
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
    import CrudDataTable from "../../../components/common/CrudDataTable";
    import GoalProfileStepperModal from "./stepperModal";
    import {mapActions, mapMutations, mapState} from "vuex";


    export default {
        name: "GoalProfiles",
        components: {GoalProfileStepperModal, CrudDataTable},

        data: () => ({
            pageTitle: 'Goal Profile',
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'Type', value: 'type'},
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
                    name: 'type',
                    values: {1: 'Sales', 2: 'Service'}
                },
            ],
            isLoading: false
        }),

        computed: {
            ...mapState({
                data: state => state.goalProfiles.all,
                totalCount: state => state.goalProfiles.meta.totalCount,
                perPage: state => state.goalProfiles.meta.perPage,
                agencies: state => state.goalProfiles.agencies,
            }),
        },

        methods: {

            ...mapActions('goalProfiles', ['getAllGoalProfiles', 'deleteGoalProfile']),

            ...mapMutations('goalProfiles', {
                onEdit: 'edit',
                onDelete: 'delete',
                onResetForm: 'resetForm',
            }),


        },
    }
</script>