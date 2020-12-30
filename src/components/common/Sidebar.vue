<template>
    <div>
        <span class="light-blue d-block text-h6 py-4 white--text accent-4 text-center">
                Agency Accountability
            </span>
        <v-list class="pt-0">
            <template v-for="item in items">
                <v-list-item
                        :key="item.title"
                        :to="item.link"
                        v-if="item.type == 'link'"
                        link
                >
                    <v-list-item-icon>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-group
                        :key="item.title"
                        v-else
                        :value="false"
                        :prepend-icon="item.icon"
                        no-action
                >
                    <template v-slot:activator>
                        <v-list-item-content>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                            :key="dropDownItem.title"
                            v-for="dropDownItem in item.dropDownItems"
                            :to="dropDownItem.link">
                        <v-list-item-content>
                            <v-list-item-title>{{dropDownItem.title}}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>

            </template>
        </v-list>
    </div>

</template>

<script>
    import sidebar from "../../helpers/sidebar";

    export default {
        name: "Sidebar",
        data() {
            return {
                items: sidebar,
            }
        }
    }
</script>

<style>
    .v-application--is-ltr .v-list-item__action:first-child,
    .v-application--is-ltr .v-list-item__icon:first-child{
        margin-right: 15px !important;
    }
    .v-application--is-ltr .v-list-group--no-action > .v-list-group__items > .v-list-item {
        padding-left: 56px;
    }
</style>