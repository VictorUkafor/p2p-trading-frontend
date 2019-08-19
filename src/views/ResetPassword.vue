<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
      <span/>
    </div>
    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-5">

          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

              <template>
                <div 
                  v-if="tokenValid" 
                  class="text-center text-muted mb-4">
                  <small>Please enter your new password twice to reset your password</small>
                </div>
                <form 
                  role="form" 
                  method="post" 
                  @submit.prevent="processForm">

                  <div 
                    v-if="successMessage" 
                    class="alert alert-success" 
                    role="alert">{{ successMessage }}</div>
                  <div 
                    v-if="errorMessage" 
                    class="alert alert-danger" 
                    role="alert">{{ errorMessage }}</div>

                  <div 
                    v-if="tokenValid" 
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
                    v-if="tokenValid" 
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
                      class="btn btn-primary my-4">Loading . . .</button>
                    <button 
                      v-if="!loading && tokenValid" 
                      :disabled="noErrors()" 
                      class="btn btn-primary my-4">Complete Registration</button>
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
import { 
    validatePassword,
    validatePassConf,
    } from '../lib/validations';

const api = process.env.VUE_APP_BACKEND_API;

export default {
  data() {
    return {
        password: '',
        passwordConfirmation: '',
        errors: {
            password: '',
            passwordConfirmation: ''
        },
        errorMessage: '',
        successMessage: '',
        isValid: false,
        loading: false,
        tokenValid: true,
    };
  },
    created() {

            axios.get(`${api}/auth/password-reset/find/${this.$route.params.token}`)
            .then(()=> {
                this.tokenValid = true;
            }).catch(e => {
                this.tokenValid = false;
                this.errorMessage = e.response.data.errorMessage;
            });

  },
  methods: {
        passwordValidate() {
            this.errorMessage = '';
            this.successMessage = '';
            const { error, isValid } = validatePassword(this.password);
            this.errors.password = error;
            this.isValid = isValid;
        },
        passConfValidate() {
            this.errorMessage = '';
            this.successMessage = '';
            const { error, isValid } = 
            validatePassConf(this.password, this.passwordConfirmation);
            this.errors.passwordConfirmation = error;
            this.isValid = isValid;
        },
        setState(){
            this.password = '';
            this.passwordConfirmation = '';
            this.loading = false;
            this.isValid = false;
            this.errorMessage = '';
            this.successMessage = '';
            this.errors = {
                password: '',
                passwordConfirmation: ''
            };
        },
        submit() {
            this.loading = true;

            const body = {
                password: this.password.trim(),
                password_confirmation: this.passwordConfirmation.trim()
            }

            axios.post(`${api}/auth/password-reset/reset/${this.$route.params.token}`, 
            body).then(res => {
                this.setState();
                this.successMessage = res.data.successMessage;
            }).catch(e => {
                this.successMessage = '';
                this.loading = false;
                this.errorMessage = e.response.data.errorMessage ||
                e.response.data.errors || 
                'Your request could not be process at this time, please try again later';
            });
        },
        processForm() {
            let status = true;

            if(status){
                this.passwordValidate();
                status = this.isValid;
            }

            if(status){
                this.passConfValidate();
                status = this.isValid;
            }
            
            if(status){
                this.submit();
            }
 
        },
        noErrors(){
            return !this.password ||
            !this.passwordConfirmation || 
            !this.isValid;
        }

    },

    
};

</script>
<style>
</style>
