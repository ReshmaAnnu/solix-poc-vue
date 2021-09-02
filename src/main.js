import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-vue/dist/bootstrap-vue.min.css';

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuelidate);

import { store } from './store';
import EmployeeList from './components/EmployeeList.vue';
import EmployeeForm from './components/EmployeeForm.vue';

Vue.component(EmployeeList);
Vue.component(EmployeeForm);

const routes = [
	{
		path: '/',
		redirect: '/employees',
		component: EmployeeList,
		children: [{
			path: '/employees',
			component: EmployeeList,
		}]
	}, {
		path: '/employee/add',
		component: EmployeeForm
	}, {
		path: '/employee/edit',
		name: 'edit',
		component: EmployeeForm,
		props: true
	}
]

const router = new VueRouter({
	routes
});

Vue.config.productionTip = false;

new Vue({
	store,
	router,
  render: h => h(App),
}).$mount('#app')
