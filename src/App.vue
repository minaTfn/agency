
<template>
    <v-app id="inspire">

        <v-navigation-drawer v-model="drawer" app>
            <sidebar/>
        </v-navigation-drawer>

        <Snackbar></Snackbar>

        <v-app-bar app>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Application</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <div class="container py-10 px-md-2 px-lg-14">
                <transition :duration="{ enter: 800, leave: 1 }"
                             enter-active-class="animated fadeIn"
                             leave-active-class="animated slideOut">
                    <router-view></router-view>
                </transition>
            </div>
        </v-main>

    </v-app>
</template>
<script>
    import Sidebar from "./components/common/Sidebar";
    import Snackbar from './components/common/Snackbar'

    export default {
        components: {Sidebar, Snackbar },
        data() {
            return {
                drawer: false,
            }
        },
    }
</script>
