<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
    </div>

    
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">

          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

              <template>
                <div 
                  v-if="getActToken" 
                  class="text-center text-muted mb-4">
                  <small>Please fill the following details to 
                  complete your registration</small>
                </div>
                <form 
                  role="form" 
                  method="post" 
                  @submit.prevent="processForm">

                  <div 
                    v-if="getMessage" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}</div>
                  <div 
                    v-if="getError" 
                    class="alert alert-danger" 
                    role="alert">{{ getError }}</div>

                  <div 
                    v-if="getActToken" 
                    class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-hat-3"/>
                        </slot>
                      </span>
                      <input 
                        v-model="firstName"
                        class="form-control"
                        type="text"
                        placeholder="First Name"
                        name="firstName"
                        aria-describedby="addon-right addon-left"
                        @keyup="firstNameValidate()">
                    </div>
                  </div>

                  <div 
                    v-if="errors.firstName" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.firstName }}</div>

                  <div 
                    v-if="getActToken" 
                    class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-hat-3"/>
                        </slot>
                      </span>
                      <input 
                        v-model="lastName"
                        class="form-control"
                        type="text"
                        placeholder="Last Name"
                        name="lastName"
                        aria-describedby="addon-right addon-left"
                        @keyup="lastNameValidate()">
                    </div>
                                        
                  </div>

                  <div 
                    v-if="errors.lastName" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.lastName }}</div>

                  <div 
                    v-if="getActToken" 
                    class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-calendar-grid-58"/>
                        </slot>
                      </span>
                      <input 
                        v-model="dateOfBirth"
                        class="form-control"
                        type="text"
                        placeholder="Date of Birth"
                        name="dateOfBirth"
                        aria-describedby="addon-right addon-left"
                        @keyup="dobValidate()">
                    </div>
                                        
                  </div>

                  <div 
                    v-if="errors.dateOfBirth" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.dateOfBirth }}</div>

                  <div 
                    v-if="getActToken" 
                    class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-lock-circle-open"/>
                        </slot>
                      </span>
                      <input 
                        v-model="password"
                        class="form-control"
                        type="password"
                        placeholder="Password"
                        name="password"
                        aria-describedby="addon-right addon-left"
                        @keyup="passwordValidate()">
                    </div>
                                        
                  </div>

                  <div 
                    v-if="errors.password" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.password }}</div>


                  <div 
                    v-if="getActToken" 
                    class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-lock-circle-open"/>
                        </slot>
                      </span>
                      <input 
                        v-model="passwordConfirmation"
                        class="form-control"
                        type="password"
                        placeholder="Password Confirmation"
                        name="passwordConfirmation"
                        aria-describedby="addon-right addon-left"
                        @keyup="passConfValidate()">
                    </div>
                                        
                  </div>

                  <div 
                    v-if="errors.passwordConfirmation" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.passwordConfirmation }}</div>
                                    

                  <div class="text-center">
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>


                    <button 
                      v-if="!loading && getActToken" 
                      :disabled="noErrors()" 
                      class="btn btn-default my-4">Complete Registration</button>
                  </div>
                </form>
              </template>
            
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapActions } from 'vuex';
import { 
    validateName, 
    validateDate,
    validatePassword,
    validatePassConf,
  } from '../lib/validations';


export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      password: '',
      passwordConfirmation: '',
      errors: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        password: '',
        passwordConfirmation: ''
      },
      isValid: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(['activateAccount', 'findActivationToken']),
    firstNameValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateName(this.firstName, 'First Name');
      this.errors.firstName = error;
      this.isValid = isValid;
    },
    lastNameValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateName(this.lastName, 'Last Name');
      this.errors.lastName = error;
      this.isValid = isValid;
    },
    dobValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateDate(this.dateOfBirth);
      this.errors.dateOfBirth = error;
      this.isValid = isValid;
    },
    passwordValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validatePassword(this.password);
      this.errors.password = error;
      this.isValid = isValid;
    },
    passConfValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validatePassConf(this.password, this.passwordConfirmation);
      this.errors.passwordConfirmation = error;
      this.isValid = isValid;
    },
    initialState(){
      this.firstName = '';
      this.lastName = '';
      this.dateOfBirth = '';
      this.password = '';
      this.passwordConfirmation = '';
      this.loading = false;
      this.isValid = false;
      this.errors = {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        password: '',
        passwordConfirmation: ''
      };
    },
    formatDOB(date){
      const split = date.split('/');
      return `${split[2]}-${split[1]}-${split[0]}`;
    },
    processForm() {
      let status = true;

      if(status){
        this.firstNameValidate();
        status = this.isValid;
      }

      if(status){
        this.lastNameValidate();
        status = this.isValid;
      }

      if(status){
        this.dobValidate();
        status = this.isValid;
      }

      if(status){
        this.passwordValidate();
        status = this.isValid;
      }

      if(status){
        this.passConfValidate();
        status = this.isValid;
      }
            
      if(status){
        this.loading = true;

        const body = {
          first_name: this.firstName.trim(),
          last_name: this.lastName.trim(),
          date_of_birth: this.formatDOB(this.dateOfBirth.trim()),
          password: this.password.trim(),
          password_confirmation: this.passwordConfirmation.trim(),
          token: this.$route.params.token,
        }
        
        this.activateAccount(body)
        .then(() => this.initialState())
        .catch(() => this.initialState());
      }
      
    },
    noErrors(){
      return (!this.firstName || !this.lastName &&
        !this.dateOfBirth || !this.password ||
        !this.passwordConfirmation) || !this.isValid;
    }
  },
  computed: mapGetters([
    'getError', 'getMessage', 'getActToken'
  ]),
  created() {
    this.findActivationToken(this.$route.params.token);
  },
    
};

</script>
<style>
</style>
