import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		departments: [
			{ id: 1, name: 'Sales', },
			{ id: 2, name: 'Engineering', },
			{ id: 3, name: 'Marketing', },
			{ id: 4, name: 'Finance' },
			{ id: 5, name: 'Devops' },
			{ id: 6, name: 'Quality Analyst', },
			{ id: 7, name: 'Customer Support'},
		],
		languages: [
			{ id: 1, text: 'Lang1', },
			{ id: 2, text: 'Lang2', },
			{ id: 3, text: 'Lang3', },
			{ id: 4, text: 'Lang4' },
		],
		employees: [
			{
				id: 1,
				employeeName: 'Jhon',
				employeeEmail: 'Jhon@gmail.com',
				department: 2,
				languages: [1,2],
				contactNumber: '9898989898',
			},{
				id: 2,
				employeeName: 'Albert',
				employeeEmail: 'Albert@gmail.com',
				department: 2,
				languages: [2,4],
				contactNumber: '9898989898',
			},{
				id: 3,
				employeeName: 'Larsen',
				employeeEmail: 'Larsen@gmail.com',
				department: 2,
				languages: [1,4],
				contactNumber: '9898989898',
			},{
				id: 4,
				employeeName: 'Ronaldo',
				employeeEmail: 'Ronaldo@gmail.com',
				department: 4,
				languages: [1,3],
				contactNumber: '9898989898',
			},{
				id: 5,
				employeeName: 'Daniel',
				employeeEmail: 'Daniel@gmail.com',
				department: 6,
				languages: [2,4],
				contactNumber: '9898989898',
			},{
				id: 6,
				employeeName: 'Ishanth',
				employeeEmail: 'Ishanth@gmail.com',
				department: 7,
				languages: [3,4],
				contactNumber: '9898989898',
			},{
				id: 7,
				employeeName: 'Nirvan',
				employeeEmail: 'Nirvan@gmail.com',
				department: 5,
				languages: [1,2],
				contactNumber: '9898989898',
			}
		]
	},
	mutations: {
		addEmployee(state, employee) {
			state.employees.splice(0, 0, employee)
		},
		updateEmployee(state, updatedEmployeeData) {
			state.employees[updatedEmployeeData.index] = updatedEmployeeData.employeeData;
		},
		deleteEmployee(state, deletedEmployeeData) {
			state.employees.splice(deletedEmployeeData.index, 1);
		}
	},
	actions: {
		addEmployee(context, employeeData) {
			employeeData["id"] = context.state.employees.length + 1;
			context.commit("addEmployee", employeeData)
		},
		updateEmployee(context, employeeData) {
			let index = context.state.employees.findIndex(obj => {
				return obj.id === employeeData.id
			});
			context.commit("updateEmployee", {
				employeeData,
				index
			});
		},
		deleteEmployee(context, employeeData) {
			let index = context.state.employees.findIndex(obj => {
				return obj.id === employeeData.id
			});
			context.commit("deleteEmployee", {
				index
			});
		}
	},
	getters: {
		employees(state) {
			return state.employees;
		},
		languages(state) {
			return state.languages;
		},
		departments(state) {
			return state.departments;
		}
	}
});