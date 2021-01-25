import {mount, createLocalVue} from '@vue/test-utils'
import Vuex from 'vuex'
import VuePluralize from 'vue-pluralize'
import Vuetify from 'vuetify';
import QuartersComponent from '@/views/quarter/index.vue'
import quarters from '@/store/modules/quarters'
import {cloneDeep} from 'lodash'
import VueRouter from 'vue-router'
import router from '@/router/index'

const localVue = createLocalVue()

localVue.use(Vuex)
localVue.use(VuePluralize)
localVue.use(VueRouter)
localVue.use(Vuetify);


describe('Manage QuartersComponent', () => {

    let store
    let vuetify

    beforeEach(() => {
        vuetify = new Vuetify()
        store = new Vuex.Store({modules: {quarters: cloneDeep(quarters)} })

    })

    it('shows QuartersComponent list', async () => {


        const wrapper = mount(QuartersComponent, {store, localVue, vuetify,router})
        const title = wrapper.find('#pageTitle')
        expect(title.text()).toEqual('Quarters')

    })

    it('shows create new Quarter form', async () => {


        // const createButton = wrapper.find('#createNew')
        // createButton.trigger('click')

        // expect(store.quarters.actions.newItem).toHaveBeenCalled()
        //
        // const formDialog = wrapper.find('#formDialog');
        // expect(formDialog.exists()).toBe(true)
    })
})
