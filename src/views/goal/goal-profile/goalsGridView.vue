<template>
  <div class="mt-8">
    <crud-data-table
      v-if="this.currentStep == 'addGoals'"
      :data="data"
      disable-pagination
      :is-search-active="false"
      :total-count="totalCount"
      :per-page="perPage"
      :headers="headers"
      @getData="getAllGoalProfileGoals"
      @deleteItem="deleteGoalProfileGoal"
      @edit="editItem"
      @delete="deleteItem"
      @resetForm="resetForm"
    />
  </div>
</template>
<script>
    import CrudDataTable from "../../../components/common/CrudDataTable";
    import {mapActions, mapMutations, mapState} from "vuex";


    export default {
        name: "GoalsGridView",
        components: {CrudDataTable},

        data: () => ({

            headers: [
                {text: 'Goal', value: 'goal_id', sortable: false},
                {text: 'Percentage', value: 'percentage', sortable: false},
                {text: 'Delete', value: 'actions', sortable: false, width: 80},
            ],
        }),

        computed: {
            ...mapState('goalProfiles',['currentStep']),
            ...mapState({
                data: state => state.goalProfileGoals.all,
                totalCount: state => state.goalProfileGoals.meta.totalCount,
                perPage: state => state.goalProfileGoals.meta.perPage,
            }),
        },

        methods: {

            ...mapActions('goalProfileGoals', ['getAllGoalProfileGoals', 'deleteGoalProfileGoal']),

            ...mapMutations('goalProfileGoals', ['editItem', 'deleteItem', 'resetForm']),

        },

    }
</script>