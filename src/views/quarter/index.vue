<template>
    <div>
        <div class="d-flex justify-space-between mb-7 ">
            <div class="text-h5" data-test="pageTitle">
                {{ pageTitle | pluralize }}
            </div>
            <quarter-form-modal :form-title="pageTitle"/>
        </div>

        <crud-data-table
                :data="data"
                :actions="actions"
                :total-count="totalCount"
                :per-page="perPage"
                :headers="headers"
                @getData="getAllQuarters"
                @deleteItem="deleteQuarter"
                @edit="editItem"
                @delete="deleteItem"
                @resetForm="resetForm"
        />
    </div>
</template>
<script>
    import CrudDataTable from "../../components/common/CrudDataTable";
    import QuarterFormModal from "./formModal";
    import {mapActions, mapMutations, mapState} from "vuex";


    export default {
        name: "Quarters",
        components: {QuarterFormModal, CrudDataTable},

        data: () => ({
            pageTitle: 'Quarter',
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'Start Date', value: 'start_date'},
                {text: 'End Date', value: 'end_date'},
                {text: 'Actions', value: 'actions', sortable: false, width: 80},
            ],
            actions: [
                {name: 'edit', event: 'edit', icon: 'mdi-pencil'},
            ],
            date:'09-28-2020',
            isLoading: false
        }),

        computed: {
            ...mapState({
                data: state => state.quarters.all,
                totalCount: state => state.quarters.meta.totalCount,
                perPage: state => state.quarters.meta.perPage,
            }),
        },

        methods: {

            ...mapActions('quarters', ['getAllQuarters', 'deleteQuarter']),

            ...mapMutations('quarters', ['editItem', 'deleteItem', 'resetForm',]),


        },
    }
</script>