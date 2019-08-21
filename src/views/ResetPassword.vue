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
                  v-if="getResetToken" 
                  class="text-center text-muted mb-4">
                  <small>Please enter your new password twice to reset your password</small>
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
                    v-if="getResetToken" 
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
                    v-if="getResetToken" 
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
                      class="btn btn-neutral my-4">Loading . . .</button>
                    <button 
                      v-if="!loading && getResetToken" 
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
        isValid: false,
        loading: false,
    };
  },
  created() {
    this.setResetToken(this.$route.params.token);
  },
  methods: {
    ...mapActions(['setResetToken', 'resetPassword']),
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
      this.password = '';
      this.passwordConfirmation = '';
      this.loading = false;
      this.isValid = false;
      this.errors = {
        password: '',
        passwordConfirmation: ''
      };
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
        this.loading = true;

        const body = {
          password: this.password.trim(),
          password_confirmation: this.passwordConfirmation.trim()
        }

        this.resetPassword(body, this.$route.params.token)
        .then(() => this.initialState())
        .catch(() => this.initialState());
      }

    },
    noErrors(){
      return !this.password ||
      !this.passwordConfirmation || 
      !this.isValid;
    }

  },
  computed: mapGetters([
    'getError', 'getMessage', 'getResetToken'
  ]),
  
};

</script>

