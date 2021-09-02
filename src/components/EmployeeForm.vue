<template>
  <div class="m-0 employeeFormWrapper">
		<h2 class="d-flex p-3">Add Employee</h2>
    <b-card class="w-50 m-4">
			<b-form @submit="onAddEmployee">
				<div
          class="px-4"
          :class="{ 'hasError': $v.form.employeeName.$error }">
					<label class="d-flex mt-2">Employee Name:</label>
					<b-form-input
						id="input-1"
						v-model="form.employeeName"
						type="text"
						placeholder="Enter name"
					></b-form-input>
					<div v-if="$v.form.employeeName.$dirty" class="d-flex">
						<span class="hasError" v-if="!$v.form.employeeName.required">Employee name is required</span>
						</div>
				</div> 
				
				<div
          class="px-4"
          :class="{ 'hasError': $v.form.employeeEmail.$error }">
					<label class="d-flex mt-2">Email:</label>
					<b-form-input
						id="input-2"
						v-model="form.employeeEmail"
						type="email"
						placeholder="Enter email"
					></b-form-input>
					<div v-if="$v.form.employeeEmail.$dirty" class="d-flex">
						<span class="hasError" v-if="!$v.form.employeeEmail.required">Employee email is required</span>
						<span class="hasError" v-if="!$v.form.employeeEmail.email">Please enter a valid email</span>
						</div>
				</div>
				<div
          class="px-4"
          :class="{ 'hasError': $v.form.department.$error }">
					<label class="d-flex mt-2">Department:</label>
					<b-form-select
						id="input-3"
						v-model="form.department"
						:options="departmentOptions"
					></b-form-select>
					<div v-if="$v.form.department.$dirty" class="d-flex">
						<span class="hasError" v-if="!$v.form.department.required">Please select the department</span>
						</div>
				</div>
				<div class="px-4">
					<label class="d-flex mt-2">Languages:</label>
					<b-form-checkbox-group
						id="checkbox-group-1"
						v-model="form.languages"
						:options="languageOptions"
						name="languages"
					></b-form-checkbox-group>
				</div>
				<div
          class="px-4"
          :class="{ 'hasError': $v.form.contactNumber.$error }">
					<label class="d-flex mt-2">Contact No:</label>
					<b-form-input
						id="input-4"
						v-model="form.contactNumber"
						type="tel"
						placeholder="Enter contact number"
					></b-form-input>
					<div v-if="$v.form.contactNumber.$dirty" class="d-flex">
						<span class="hasError" v-if="!$v.form.contactNumber.required">Contact Number is required</span>
						<span class="hasError" v-if="!$v.form.contactNumber.numeric">Please enter digits only</span>
						<span class="hasError" v-if="$v.form.contactNumber.numeric && !$v.form.contactNumber.minLength">Please enter 10 digits only</span>
						<span class="hasError" v-if="$v.form.contactNumber.numeric && !$v.form.contactNumber.maxLength">Please enter 10 digits only</span>
						</div>
				</div>

				<div class="d-flex float-right mt-2">
					<b-button class="m-2" type="submit" variant="primary">
						<span v-if="!form.id">Save</span><span v-else>Update</span>
					</b-button>
					<b-button class="m-2" type="reset" variant="danger" @click="cancelAddOrUpdateEmployee">
						<span>Cancel</span>
					</b-button>
				</div>
    </b-form>
		</b-card>
	</div>
</template>

<script>
import { required, email, minLength, maxLength, numeric } from 'vuelidate/lib/validators';
export default {
	name: 'EmployeeForm',
	props: {
		formData: {
			type: Object,
			default: () => {},
		},
	},
  data() {
    return {
      form: {
				employeeName: '',
        employeeEmail: '',
        department: null,
				languages: [],
				contactNumber:null
			},
    };
	},
	validations: {
		form: {
      employeeName: {
        required,
			},
			employeeEmail: {
				required, email
			},
			department: {
				required
			},
			contactNumber: {
				required,
				numeric,
				minLength: minLength(10),
				maxLength: maxLength(10),
			},
    }
	},
	mounted() {
    if (this.formData && Object.keys(this.formData).length) {
      this.form = {...this.formData}
    }
  },
	computed: {
		// Convert options to b-form-select options format
		departmentOptions() {
			let options = this.$store.getters.departments.map(el => {
			let { id: value, name: text } = el;
			return { value, text };
			});
			options.splice(0,0,{value:null, text:'select department...'});
			return options;
		},
		// Convert options to b-form-checkbox options format
		languageOptions() {
			let options = this.$store.getters.languages.map(el => {
			let { id: value, text } = el;
			return { value, text };
			});
			return options;
		},
	},
  methods: {
		// Called on click of add employee details
		onAddEmployee(event) {
			event.preventDefault();
			this.$v.form.$touch();
			if(this.$v.form.$error) return
			if (!this.form.id) {
				this.$store.dispatch('addEmployee',this.form);
			} else {
				this.$store.dispatch('updateEmployee',this.form);
			}
			this.$router.push('/employees');
		},
		// Called on click of reset employee details
    onResetEmployee(event) {
			event.preventDefault();
			this.form.employeeName = '';
			this.form.employeeEmail = '';
			this.form.department = null;
			this.form.languages = [];
			this.form.contactNumber = null;
		},
		cancelAddOrUpdateEmployee() {
			this.$router.push('/employees')
		}
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 #checkbox-group-1 {
	display: flex;
 }
 span.hasError {
	color:	red
 }
 .hasError select {
	border: 1px solid red;
 }
 .hasError input{
  border: 1px solid red;
 }

</style>