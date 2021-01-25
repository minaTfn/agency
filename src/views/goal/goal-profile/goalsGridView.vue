<template>
    <div class="mt-8">
        <crud-data-table
                v-if="this.currentStep == 'addGoals'"
                :data="data"
                disable-pagination
                :is-search-active="false"
                :headers="headers"
                :bodyAppends="bodyAppends"
                :editableItems="editableItems"
                @getData="getAllGoalProfileGoals"
                @deleteItem="deleteGoalProfileGoal"
                @edit="editItem"
                :errors="errors"
                @delete="deleteItem"
                @cancelEdit="cancelEdit"
                :isUpdate="isUpdate"
                @saveEditable="saveEditable"
                @openEditable="openEditable"
                @changeEditable="changeEditable"
        />
    </div>
</template>
<script>
    import CrudDataTable from "../../../components/common/CrudDataTable";
    import {mapActions, mapGetters, mapMutations, mapState} from "vuex";


    export default {
        name: "GoalsGridView",
        components: {CrudDataTable},

        data: () => ({
            headers: [
                {text: 'Goal', value: 'goal.name', sortable: false},
                {text: 'Percentage', value: 'percentage', sortable: false},
                {text: 'Delete', value: 'actions', sortable: false, width: 80},
            ],
            editableItems: [
                {title: 'Percentage', name: 'percentage'},
            ],
            bodyAppends: [
                {title: '', place: '2', function: 'sumPercentage'}
            ],
            errors: {
                percentage: ''
            }
        }),

        computed: {
            ...mapState('goalProfiles', ['currentStep']),
            ...mapGetters('goalProfileGoals', ['isUpdate']),
            ...mapState({
                data: state => state.goalProfileGoals.all,
                form: state => state.goalProfileGoals.form,
            }),
        },

        methods: {

            ...mapActions('goalProfileGoals',
                ['getAllGoalProfileGoals', 'deleteGoalProfileGoal', 'save']
            ),

            ...mapMutations('goalProfileGoals',
                ['editItem', 'deleteItem', 'resetForm', 'updatePercentage', 'newItem']
            ),

            changeEditable(value) {
                this.updatePercentage(value);
            },
            openEditable(item) {
                this.editItem(item);
            },
            saveEditable() {

                this.save(this.form).then(() => {
                    this.cancelEdit()
                    vm.$forceUpdate();
                }).catch(() => {
                    this.errors.percentage = this.form.errors.get('percentage')
                });

            },

            cancelEdit() {
                this.resetForm();
                this.newItem();
            },

            sumPercentage(key = 'percentage') {
                const value = this.data.reduce((a, b) => a + (b[key] || 0), 0)
                const className = value == 100 ? 'green--text' : 'pink--text'

                return `<span class="${className}">${value}</span>`
            }

        },

    }
</script>