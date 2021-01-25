import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import store from './store'
import VuePluralize from 'vue-pluralize'
import moment from "moment";
import snackbarPlugin from './plugins/snackbar';

Vue.use(snackbarPlugin, { store })
Vue.use(VuePluralize)

Vue.prototype.$moment = moment; // this.$moment
Vue.use(require('vue-moment')); // moment and duration filters

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
    vuetify,
    store,
    router,
    render: h => h(App),
}).$mount('#app')
