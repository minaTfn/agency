<template>
  <div>
    <div class="d-flex justify-space-between mb-7 ">
      <div class="text-h5" id="jestPageTitle">
        {{ pageTitle | pluralize }}
      </div>
      <goal-form-modal :form-title="pageTitle" />
    </div>

    <crud-data-table
      :data="data"
      :actions="actions"
      :custom-values="customValues"
      :total-count="totalCount"
      :per-page="perPage"
      :headers="headers"
      @getData="getAllGoals"
      @deleteItem="deleteGoal"
      @edit="editItem"
      @delete="deleteItem"
      @resetForm="resetForm"
    />
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

            ...mapMutations('goals', ['editItem', 'deleteItem', 'resetForm',]),


        },
    }
</script>