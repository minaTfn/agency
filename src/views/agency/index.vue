<template>
  <div>
    <div class="d-flex justify-space-between mb-7 ">
      <div class="text-h5">
        {{ pageTitle | pluralize }}
      </div>
      <agency-form-modal :form-title="pageTitle" />
    </div>

    <crud-data-table
      :data="data"
      :actions="actions"
      :custom-values="customValues"
      :total-count="totalCount"
      :per-page="perPage"
      :headers="headers"
      @getData="getAllAgencies"
      @deleteItem="deleteAgency"
      @edit="editItem"
      @delete="deleteItem"
      @resetForm="resetForm"
    />
  </div>
</template>
<script>
    import CrudDataTable from "../../components/common/CrudDataTable";
    import AgencyFormModal from "./formModal";
    import {mapActions, mapMutations, mapState} from "vuex";


    export default {
        name: "Agencies",
        components: {AgencyFormModal, CrudDataTable},

        data: () => ({
            pageTitle: 'Agency',
            headers: [
                {text: 'Name', value: 'name'},
                {text: 'address', value: 'address'},
                {text: 'Phone Number', value: 'phone_number', sortable: false},
                {text: 'Status', value: 'status'},
                {text: 'Actions', value: 'actions', sortable: false, width: 105},
            ],
            actions: [
                {name: 'edit', event: 'edit', icon: 'mdi-pencil'},
            ],
            customValues: [{
                name: 'item.status',
                values: {10: 'Active', 9: 'Inactive'}
            }],
            isLoading: false
        }),

        computed: {
            ...mapState({
                data: state => state.agencies.all,
                totalCount: state => state.agencies.meta.totalCount,
                perPage: state => state.agencies.meta.perPage,
            }),
        },

        methods: {

            ...mapActions('agencies', ['getAllAgencies','deleteAgency']),

            ...mapMutations('agencies', ['editItem', 'deleteItem', 'resetForm',]),

        },
    }
</script>