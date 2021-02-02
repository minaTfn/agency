// import {mount, createLocalVue} from '@vue/test-utils'
// import Vuex from 'vuex'
// import VuePluralize from 'vue-pluralize'
// import Vuetify from 'vuetify';
// import moment from "moment";
// import Vue from 'vue'
// import Quarters from '@/views/quarter/index'
// import FormModal from '@/views/quarter/formModal'
// import quarters from '@/store/modules/quarters'
// import {cloneDeep} from 'lodash'
// import VueRouter from 'vue-router'
// import routes from '@/router/routes'
//
// const localVue = createLocalVue()
//
// localVue.prototype.$moment = moment; // this.$moment
// localVue.use(require('vue-moment')); // moment and duration filters
// localVue.use(Vuex)
// localVue.use(VuePluralize)
// localVue.use(VueRouter)
// Vue.use(Vuetify);
//
//
// describe('Manage Quarters', () => {
//
//     const vuetify = new Vuetify()
//     const store = new Vuex.Store({modules: {quarters: cloneDeep(quarters)}})
//     const router = new VueRouter({routes})
//
//     const startDate = new Date("2023-01-28").toISOString().substr(0, 10)
//     const endDate = new Date("2023-01-28").toISOString().substr(0, 10)
//
//     const factory = (component,data,options) => {
//         return mount(component, {
//             store,
//             localVue,
//             vuetify,
//             router,
//             data() {
//                 return {
//                     ...data
//                 }
//             },
//             ...options
//         })
//     }
//
//     beforeEach(() => {
//         moxios.install()
//         document.body.setAttribute('data-app', true) // to get rid of vuetify warning of no data-app
//     })
//
//     afterEach(function () {
//         moxios.uninstall()
//     })
//
//     it('shows Quarters list', () => {
//         const wrapper = factory(Quarters)
//         const title = wrapper.find('[data-test="pageTitle"]')
//         expect(title.text()).toEqual('Quarters')
//
//         expect(wrapper.findComponent(Quarters).exists()).toBe(true)
//     })
//
//     it('shows create new Quarter form dialog', () => {
//         const wrapper = factory(Quarters)
//         // click the new quarter button
//         const createButton = wrapper.find('[data-test="createNew"]')
//         createButton.trigger('click')
//
//         expect(store.state.quarters.isModalOpen).toBeTruthy()
//         expect(store.state.quarters.actionType).toBe('create')
//
//         // expected: dialog is opened
//         const formDialog = wrapper.find('#jestFormDialog');
//         expect(formDialog.exists()).toBe(true)
//     })
//
//     it('cancels create new Quarter form dialog', async () => {
//         const wrapper = factory(Quarters)
//         // open the new Quarter form
//         await store.commit('quarters/newItem')
//
//         // click the cancel button
//         const cancelButton = wrapper.find('#jestCancelDialog')
//         cancelButton.trigger('click')
//
//         expect(store.state.quarters.isModalOpen).toBeFalsy()
//
//         // expected: dialog is closed
//         const formDialog = wrapper.find('#formDialog');
//         expect(formDialog.exists()).toBe(false)
//     })
//
//     it('syncs the form data', async () => {
//         const wrapper = factory(Quarters)
//
//         const name = 'quarter name'
//
//         const formComponent = wrapper.findComponent({name: 'quarter-form-modal'})
//
//         // open the new Quarter form
//         formComponent.find('[data-test="createNew"]').trigger('click')
//         await formComponent.vm.$nextTick();
//
//
//         // set the form inputs
//         formComponent.findComponent({ref: 'startDate'}).vm.$emit('update:value', startDate)
//         formComponent.findComponent({ref: 'endDate'}).vm.$emit('update:value', endDate)
//         formComponent.find('input[name="name"]').setValue(name)
//
//         let form = formComponent.vm.$data.form;
//
//
//         expect(form.name).toBe(name)
//         expect(form.start_date).toBe(startDate)
//         expect(form.end_date).toBe(endDate)
//
//     })
//
//     it('submit the form and get the validation errors', async ()=>{
//
//
//         const formWrapper = factory(FormModal,{form:{name: 'sss',start_date:startDate, end_date:endDate}})
//         // const saveForm = jest.fn()
//
//
//         moxios.stubRequest('/quarters', {
//             status: 401,
//             responseText: 'hello'
//         })
//
//         await formWrapper.find("form").trigger("submit.prevent")
//
//         formWrapper.vm.saveForm();
//
//
//         await formWrapper.vm.$nextTick()
//         await formWrapper.vm.$nextTick()
//         await formWrapper.vm.$nextTick()
//         console.log(formWrapper.emitted())
//
//         formWrapper.setData({form: {name:'aaa'} })
//
//         // expect(saveForm).toHaveBeenCalledTimes(1)
//         // console.log(formWrapper.find("form").find("label", { exactText: "Name" }).html());
//         // console.log(formWrapper.find('input[name="name"]').element.value)
//         // const commit = jest.fn()
//
//
//         // await store.dispatch('quarters/save',formWrapper.vm.$data.form)
//
//
//
//         // console.log(formWrapper.find('input[name="name"]').element.value)
//
//         // await store.dispatch('quarters/save',store.state.quarters.form)
//
//         // await formWrapper.vm.$nextTick();
//         // console.log(formWrapper.find("form").find("label", { exactText: "Name" }).html());
//         // console.log(formWrapper.vm.form.name)
//         // console.log(store.state.quarters.form.errors.errors)
//
//
//
//         // const commit = jest.fn()
//         // // console.log(formWrapper.find('input[name="name"]').classes())
//         // await store.dispatch('quarters/save',form)
//         // await store.commit('quarters/resetForm',form)
//         // let formWrapper1 = factory(FormModal)
//         // form = formWrapper1.vm.$data.form;
//         // console.log(formWrapper1.vm.$data)
//         // console.log(form.start_date)
//         //
//         //
//         // console.log(formWrapper.find("form").find('label').html());
//         // // console.log(formWrapper.find("form").find('input[name="name"] ~ ').html());
//         // console.log(formWrapper.find("form").find("label", { exactText: "Name" }).html());
//         // expect(formWrapper.find('.aaa_test > label').classes()).toContain('error--text')
//         // expect(formWrapper.find('label + input[name="name"]').classes('error--text'))
//         //     .toBe(true)
//
//
//         // console.log(form.errors.errors)
//         //
//         // expect(form.errors).toBe(endDate)
//         // wrapper.find(ZipCodeInput).vm.$emit('save');
//         // expect(wrapper.find(ZipCodeInput).emitted().save).toBeTruthy()
//
//
//         // const save = jest.fn();
//         // const wrapper = mount(ComponentWhichUsesListeners, {
//         //     listeners: { click: onClick}
//         // });
//         // formWrapper.find('[data-test="submit"]').trigger('click');
//         // expect(onClick).toHaveBeenCalled();
//     })
//
//     it('can specify the form title with props', async () => {
//         const wrapper = factory(Quarters,{pageTitle: 'Quarter title'})
//         const QuarterFormModal = wrapper.getComponent({name: 'QuarterFormModal'})
//
//         expect(QuarterFormModal.props('formTitle')).toBe('Quarter title')
//
//         await QuarterFormModal.setProps({formTitle: 'changed'})
//
//         expect(QuarterFormModal.props('formTitle')).toBe('changed')
//     })
// })
