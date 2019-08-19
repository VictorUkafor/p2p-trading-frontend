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
                                    
                  <div class="text-center">
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-primary my-4">Loading . . .</button>
                    <button 
                      v-if="!loading" 
                      :disabled="!isValid" 
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
import { validateEmail } from '../lib/validations';

const api = process.env.VUE_APP_BACKEND_API;

export default {
  data() {
    return {
        email: '',
        error: '',
        message: '',
        isValid: false,
        loading: false,
    };
  },
  methods: {
        emailValidate() {
            this.message = '';
            this.error = '';
            const { error, isValid } = validateEmail(this.email);
            this.error = error;
            this.isValid = isValid;
        },
        submit() {
            this.loading = true;
            const body = { email: this.email.trim() };

            axios.post(`${api}/auth/password-reset/request`,
            body).then(res => {
                this.loading = false;
                this.email = '';
                this.isValid = false;
                this.message = res.data.successMessage;
            }).catch(e => {
                this.loading = false;
                this.isValid = false;
                this.error = e.response.data.errorMessage ||
                e.response.data.errors.email[0] || 
                'Your request could not be process at this time, please try again later';
            });
        },
        processForm() {
            let status = true;

            if(status){
                this.emailValidate();
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
