<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
    </div>
          
    <div v-if="!getUser.id" class="shape-style-1"
    :style="{ 
      marginLeft: '40%',
      marginTop: '5em',
      marginBottom: '5em'}" >
      <span 
      class="spinner-border spinner-border-sm" 
      role="status" 
      aria-hidden="true">
      </span>    
    </div>


    <div v-if="getUser.id" class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div v-if="!verified" class="text-center mb-10">
                  <h5><strong>Verify Identity</strong></h5>
                  <div v-if="getUser.bvn && !verified && !otpSent" 
                  class="text-center text-muted mb-4">
                  <small>To change or edit your BVN number, just enter the new one
                    in the field below</small><br/>
                    <small>OR</small><br/>
                  <small>
                    Click on the "SEND OTP" 
                    button to receive OTP for BVN verification</small>
                  </div>
                  <div v-if="otpSent" class="text-center text-muted mb-4">
                  <small>Please enter the OTP sent to your phone</small>
                  </div>
                  <hr/>
        
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

                  <div v-if="!getUser.bvn && !otpSent" 
                  class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-circle-08"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="bvn"
                        class="form-control"
                        type="text"
                        placeholder="Enter your BVN number"
                        name="bvn"
                        aria-describedby="addon-right addon-left"
                        @keyup="bvnValidate()">
                    </div>
                                        
                  </div>
                                
                  <div v-if="getUser.bvn && !verified && !otpSent" 
                  class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-circle-08"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="bvn"
                        class="form-control"
                        type="text"
                        :placeholder=getUser.bvn.bvn_number
                        name="bvn"
                        aria-describedby="addon-right addon-left"
                        @keyup="bvnValidate()">
                    </div>
                                        
                  </div>

                  <div v-if="!bvn && getUser.bvn && !verified && !otpSent"
                   class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-mobile-button"/>
                        </slot>
                      </span>
              
                      <input class="form-control" type="text"
                        disabled :value="formatPhone"
                        aria-describedby="addon-right addon-left"
                        >
                    </div>
                                        
                  </div>

                  <div v-if="otpSent"
                   class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-lock-circle-open"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="otp"
                        class="form-control"
                        type="text"
                        placeholder="Enter the your OTP"
                        name="otp"
                        aria-describedby="addon-right addon-left"
                        @keyup="otpValidate()"
                        >
                    </div>
                                        
                  </div>

                  <div class="text-center" >
                                    
                    <button v-if="loading" disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                      <button 
                      v-if="!loading && getUser.bvn && !verified && !otpSent" 
                      :disabled="noErrors" 
                      class="btn btn-default my-4">Edit BVN</button>

                    <button 
                      v-if="!loading && !getUser.bvn && !otpSent" 
                      :disabled="noErrors" 
                      class="btn btn-default my-4">Add BVN</button>                      
                      
                    <button 
                      v-if="!loading && getUser.bvn && !verified && !bvn && !otpSent" 
                      class="btn btn-default my-4">Send OTP</button>

                    <button 
                      v-if="!loading && otpSent" 
                      :disabled="!otp || !isValid" 
                      class="btn btn-default my-4">Verify BVN</button>

                  </div>
                </form>

                </div>

                <div v-if="verified" class="text-center mb-10">
                  <h5><strong>Identity Verified</strong></h5>
                  <div class="text-center text-muted mb-4">
                  <small>Your Bank Verification Number has 
                    been verified successfully at {{ getUser.bvn.updated_at }}</small>
                  </div>
                  <hr/>

                </div>

            
            </div>
          </div>


        </div>
      </div>
    </div>



  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import { validateNumber } from '../lib/validations';


export default {
  name: "VerifyIdentity",
  data() {
    return {
      bvn: '',
      error:'',
      isValid: false,
      loading: false,
      otpSent: false,
      otp: '',
    };
  },
  methods: {
    ...mapActions([
      'addBVN', 'editBVN', 'sendOTP', 
      'getProfile', 'verifyOTP', 'logOut'
    ]),
    bvnValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateNumber(this.bvn, 'BVN');
      this.error = error;
      this.isValid = isValid;

    },
    otpValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateNumber(this.otp, 'OTP', false);
      this.error = error;
      this.isValid = isValid;
    },
    initialState(){
      this.bvn = '';
      this.loading = false;
      this.isValid = false;
      this.error = ''
    },
    processForm(){
      this.loading = true;

      if(!this.getUser.bvn && !this.otpSent){
        this.processAdd()
      }

      if(this.bvn && this.getUser.bvn && 
      !this.verified && !this.otpSent){
        this.processEdit();
      }

      if(!this.bvn && this.getUser.bvn && 
      !this.verified && !this.otpSent){
        this.processSend();
      }

      if(this.otp && this.otpSent){
        this.processOTP();
      }

    },
    processAdd() {
      let status = true;

      if(status){
        this.bvnValidate();
        status = this.isValid;
      }

      const body = {
        bvn_number: this.bvn.trim(),
      }

      this.addBVN(body)
      .then((res) => {
        this.getProfile()
        .then(() => this.initialState());
        }).catch(() => this.initialState());

    },
    processEdit() {
      let status = true;

      if(status){
        this.bvnValidate();
        status = this.isValid;
      }
   
      if(status){
      this.loading = true;
      }

      const body = {
        bvn_number: this.bvn.trim(),
      }


      this.editBVN(body)
      .then((res) => {
        this.getProfile()
        .then(() => this.initialState());
      }).catch(() => this.initialState());

    },
    processSend() {
      this.sendOTP().then(() => { 
        this.getProfile().then(() => {
          this.otpSent = true;
          this.loading = false;          
        });
      });
    },
    processOTP() {
      let status = true;

      if(status){
        this.otpValidate();
        status = this.isValid;
      }
   
      if(status){
      this.loading = true;
      }

      const body = {
        otp: this.otp.trim(),
      }

      this.verifyOTP(body)
      .then((res) => {
        this.getProfile()
        .then(() => this.initialState());
      }).catch(() => this.initialState());

    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
    verified(){
      return this.getUser.bvn && this.getUser.bvn.verified;
    },
    formatPhone(){
      return `XXXXXXX${this.getUser.phone.substr(-4, 4)}`;
    },
    noErrors(){
      return !this.bvn || !this.isValid;
    },
  },
  mounted(){
    if(this.getUser.notifications &&
    this.getUser.notifications.auto_logout){
      window.onbeforeunload = (e) => {
        this.logOut();
      }
    }
  },
  created(){
    this.$store.commit('clearMessages');
    this.getProfile();
  }
    
};

</script>
<style>
</style>
