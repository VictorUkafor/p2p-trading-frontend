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
                  <small>Please enter the OTP sent to your phone</small>
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
                    v-if="error || getError" 
                    class="alert alert-danger" 
                    role="alert">{{ error || getError }}</div>
                    
                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-lock-circle-open"/>
                        </slot>
                      </span>
                      <input 
                        v-model="otp"
                        class="form-control"
                        type="password"
                        placeholder="Enter your OTP"
                        name="otp"
                        aria-describedby="addon-right addon-left"
                        @keyup="otpValidate()">
                    </div>
                                        
                  </div>
                                    

                  <div class="text-center">
                                    
                    <button v-if="loading" disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span> Loading . . .</button>

                    <button v-if="!loading" :disabled="!isValid" 
                      class="btn btn-default my-4">Two Factor Login</button>
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
import { validateNumber } from '../lib/validations';

export default {
  data() {
    return {
      otp: '',
      error: '',
      isValid: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(['registerUser', 'googleLogin', 'smsLogin']),
    otpValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateNumber(this.otp, 'OTP', 6);
      this.error = error;
      this.isValid = isValid;
    },
    initialState(){
      this.loading = false;
      this.otp = '';
      this.error = '';
      this.isValid = false;
    },
    processForm() {
      let status = true;

      if(status){
        this.otpValidate();
        status = this.isValid;
      }

      const type = this.$route.params.type;
      const body = { otp: this.otp.trim() };
            
      if(status && type === 'google'){
        this.loading = true;
        this.googleLogin(body)
        .then(() => this.initialState());
      }

      if(status && type === 'sms'){
        this.loading = true;
        this.smsLogin(body)
        .then(() => this.initialState());
      }
 
    },

  },
  computed: mapGetters(['getError', 'getMessage']),
  created(){
    this.$store.commit('clearMessages');
  }
    
};

</script>
<style>
</style>
