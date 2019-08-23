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
                  <small>Please enter your email and password to login</small>
                </div>
                
                <form 
                  role="form" 
                  method="post" 
                  @submit.prevent="processForm">

                  <div 
                    v-if="getError" 
                    class="alert alert-danger" 
                    role="alert">{{ getError }}
                  </div>
                                
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

                  <div 
                    v-if="errors.email" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.email }}</div>
                                    
                  <div class="form-group input-group-alternative">
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

                    
                  <div class="text-center">
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">Loading . . .</button>
                    <button 
                      v-if="!loading" 
                      :disabled="noErrors()" 
                      class="btn btn-default my-4">Login</button>
                  </div>
                </form>

                <div class="row mt-3">
                  <div class="col-6">
                    <a 
                      href="/password-reset/request" 
                      class="text-light">
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div class="col-6 text-right">
                    <a 
                      href="/register" 
                      class="text-light">
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>

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
import { validateEmail, validateName } from '../lib/validations';


export default {
  data() {
    return {
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',            
        },
        isValid: false,
        loading: false,
    };
  },
  methods: {
    ...mapActions(['loginUser']),
    emailValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateEmail(this.email);
      this.errors.email = error;
      this.isValid = isValid;
    },
    passwordValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateName(this.password, 'password');
      this.errors.password = error;
      this.isValid = isValid;
    },
    initialState(){
      this.email = '';
      this.password = '';
      this.loading = false;
      this.isValid = false;
      this.errors = {
        email: '',
        password: '',
      };
    },
    processForm() {
      let status = true;

      if(status){
        this.emailValidate();
        status = this.isValid;
      }

      if(status){
        this.passwordValidate();
        status = this.isValid;
      }
            
      if(status){
      this.loading = true;

      const body = {
        email: this.email.trim(),
        password: this.password.trim()
      }

      this.loginUser(body)
      .then(() => this.$router.go('/dashboard'))
      .catch(() => this.initialState());
      }
 
    },
    noErrors(){
      return (!this.email || !this.password) || !this.isValid;
    }
    
  },
  computed: mapGetters(['getError']),
  created(){
    this.$store.commit('clearMessages');
  }

    
};

</script>
<style>
</style>
