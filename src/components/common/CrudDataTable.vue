<template>
  <v-data-table


    :loading="isLoading"
    loading-text="Loading..."
    :headers="headers"
    :items="data"
    class="elevation-1"
    :search="search"
    :options.sync="options"
    :hide-default-footer="disablePagination"
    :items-per-page="perPage"
    :server-items-length="totalCount"
    :footer-props="{
      itemsPerPageOptions: [ 10, 15,20, -1 ],
    }"
  >
    <template v-slot:top>
      <v-toolbar
        v-if="isSearchActive"
        flat
      >
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          hide-details
        />
      </v-toolbar>
      <v-dialog
        v-model="deleteDialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title class="headline">
            Are you sure you want to delete this item?
          </v-card-title>
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="blue darken-1"
              text
              @click="closeDeleteDialog"
            >
              Cancel
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="deleteItemConfirm"
            >
              OK
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>

    <template
      v-for="customValue in customValues"
      :slot="`item.${customValue.name}`"
      slot-scope="{item}"
    >
      {{ customValue.values[item[customValue.name]] }}
    </template>

    <template v-slot:item.actions="{ item }">
      <fragment v-if="actions">
        <v-icon
          v-for="action in actions"
          :key="action.name"
          small
          class="mr-2"
          @click="$emit(action.event, item)"
        >
          {{ action.icon }}
        </v-icon>
      </fragment>


      <v-icon
        v-if="!disableDelete"
        small
        class="mr-2"
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>
<script>
    import {Fragment} from 'vue-fragment'

    export default {
        name: "CrudDataTable",
        components: {Fragment},
        props: {
            headers: {},
            data: {},
            actions: {},
            customValues: {},
            isSearchActive: {default: true, type: Boolean},
            disablePagination: {default: false, type: Boolean},
            totalCount: Number,
            perPage: {default: 20, type: Number},
            disableDelete: {default: false, type: Boolean}
        },
        data: () => ({
            search: '',
            deleteDialog: false,
            options: {},
            isLoading: false,
        }),

        watch: {
            search(val) {
                this.addToOptions(val);
            },

            options: {
                handler() {
                    this.getData()
                },
                deep: true
            },

            /*
            * used for when user clicks outside of dialog
            */
            deleteDialog(val) {
                val || this.closeDeleteDialog();
            },
        },

        mounted() {
            this.getData();
        },

        methods: {
            getData() {
                this.isLoading = true;

                this.$emit('getData', this.convertToYiiQueryString());
                this.$nextTick(() => {
                    this.isLoading = false
                });
            },

            convertToYiiQueryString() {
                let options = [];
                options['page'] = this.options.page;
                if (this.options.q)
                    options['q'] = this.options.q;
                options['per-page'] = this.options.itemsPerPage;
                options['sort'] = (this.options.sortDesc[0] ? '-' : '') + this.options.sortBy;

                return Object.keys(options)
                    .map(key => key + '=' + options[key]).join('&');
            },

            addToOptions(val) {
                this.$set(this.options, 'q', val)
            },

            deleteItem(item) {

                this.$emit('delete', item);
                this.deleteDialog = true
            },

            closeDeleteDialog() {

                this.$emit('resetForm');
                this.deleteDialog = false
            },

            deleteItemConfirm() {

                this.$emit('deleteItem');

                this.closeDeleteDialog()
            },
        },
    }
</script>