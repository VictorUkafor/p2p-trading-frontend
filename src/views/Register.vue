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
                <div class="text-center text-muted mb-4">
                  <small>Please enter your email to get started</small>
                </div>
                <form 
                  role="form" 
                  method="post" 
                  @submit.prevent="processForm">

                  <div 
                    v-if="message" 
                    class="alert alert-success" 
                    role="alert">{{ message }}</div>
                  <div 
                    v-if="error" 
                    class="alert alert-danger" 
                    role="alert">{{ error }}</div>
                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-email-83"/>
                        </slot>
                      </span>
                      <input 
                        v-model="email"
                        class="form-control"
                        type="text"
                        placeholder="Email"
                        name="email"
                        aria-describedby="addon-right addon-left"
                        @keyup="emailValidate()">
                    </div>
                                        
                  </div>
                                    
                  <div class="custom-control custom-checkbox">
                    <input 
                      id="cbId"
                      v-model="term"
                      class="custom-control-input"
                      type="checkbox"
                      name="term"
                      @change="termValidate()"
                    >
                    <label 
                      for="cbId" 
                      class="custom-control-label">
                      <span>I agree with the
                        <a href="#">Privacy Policy</a>
                      </span>
                      <slot/>
                    </label>
                  </div>

                  <div class="text-center">
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-primary my-4">Loading . . .</button>
                    <button 
                      v-if="!loading" 
                      :disabled="!isValid || !term" 
                      class="btn btn-primary my-4">Submit</button>
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
import { validateEmail, validateTerm } from '../lib/validations';



export default {
  data() {
    return {
        email: '',
        term: true,
        error: '',
        message: '',
        isValid: false,
        loading: false,
    };
  },
  methods: {
        emailValidate() {
            this.message = '';
            const { error, isValid } = validateEmail(this.email);
            this.error = error;
            this.isValid = isValid;
        },
        termValidate() {
            this.message = '';
            const { error, isValid } = validateTerm(this.term);
            this.error = error;
            this.isValid = isValid;
        },
        submit() {
            this.loading = true;
            const body = { email: this.email.trim() };

            axios.post(`${process.env.VUE_APP_BACKEND_API}/auth/register`,
            body).then(res => {
                this.loading = false;
                this.email = '';
                this.term = false;
                this.isValid = false;
                this.message = res.data.successMessage;
            }).catch(e => {
                this.loading = false;
                this.email = '';
                this.term = false;
                this.isValid = false;
                this.error = e.response.data.errorMessage ||
                 e.response.data.errors.email[0];
            })
        },
        processForm() {
            let status = true;

            if(status){
                this.emailValidate();
                status = this.isValid;
            }

            if(status){
                this.termValidate();
                status = this.isValid;
            }
            
            if(status){
                this.submit();
            }
 
        },

    },
    
};

</script>
<style>
</style>
