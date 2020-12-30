<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <sidebar/>
        </v-navigation-drawer>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <div class="container py-10 px-10">
                <router-view></router-view>
            </div>
        </v-main>
    </v-app>
</template>
<script>
    import Sidebar from "./components/common/Sidebar";

    export default {
        components: {Sidebar},
        data() {
            return {
                drawer: false,
            }
        },
    }
</script>
