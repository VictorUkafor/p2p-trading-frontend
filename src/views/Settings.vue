<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
    </div>



    <div v-if="getUser.id" class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>Security & Settings</strong></h5>
                  <hr/>

                  <div class="text-left">
                    <div 
                    v-if="getError && !otpSent" 
                    class="alert alert-danger" 
                    role="alert">{{ getError }}
                  </div>
                    <p><span :style="{ fontWeight: 'bold' }">Two-Factor Authentication</span>

                    <span class="float-right">
                      <label class="custom-toggle">
                        <input type="checkbox"                       
                        :checked="user.two_fa"
                        @click="selectFa()"/>
                        <span class="custom-toggle-slider rounded-circle"></span>
                      </label> 
                      </span>
                      </p>

                    <small v-if="!user.two_fa">Your account is not protected
                       by two-factor authentication! Enable an authenticator by selecting
                        an option to get started.<br/> <br/></small>
                    

                  <form 
                  v-if="toggle && !otpSent" 
                  role="form" 
                  method="post"
                  @submit.prevent="sendOTP">


                  <div v-if="!qrCode.qrCode && !loading" 
                  class="form-group input-group-alternative" 
                  @click="createQrCode">
                      <select class="form-control"
                      v-model="faType"
                      name="faType"
                      aria-describedby="addon-right addon-left"
                      >
                      <option>SMS</option>
                      <option>Google Authenticator</option>
                      </select>                                        
                  </div>


                    <div v-if="qrCode.qrCode" >
                    <small>1. Install the Google Authenticator mobile app for 
                      <strong>IOS</strong> or <strong>Android</strong>
                    <br/>
                    </small>

                    <small>2. Open up the Google Authenticator App and scan the QR code below 
                    <br/>
                    <br/>
                    </small>

                    <img :src="qrCode.qrCode" class="rounded mx-auto d-block" alt=""/>

                    </div>


                    <button 
                      v-if="!loading && faType === 'SMS'"
                      class="btn btn-default my-4">Enable Authenticator</button>

                    <button 
                      v-if="!loading && faType === 'Google Authenticator'" disabled
                      class="btn btn-link my-4">Please the SMS option. 
                      This feature is still in development!</button>

                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                   </form>


                  <form 
                  v-if="otpSent && 
                  ((!smsSetup && faType === 'SMS') || 
                  (!googleSetup && faType === 'Google Authenticator'))" 
                  role="form" 
                  method="post"
                  @submit.prevent="processOTP">
                    <div class="text-center text-muted mb-4">
                      <small v-if="faType === 'SMS'">
                        Please enter the OTP sent to your phone</small>
                      <small v-if="faType === 'Google Authenticator'">
                        Please enter the OTP from Google Authenticator</small>
                    </div>

                    <div 
                    v-if="getMessage" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}
                    </div>

                  <div 
                    v-if="errors.otp || getError" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.otp || getError }}
                  </div>

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
                        type="text"
                        placeholder="Enter your OTP"
                        name="otp"
                        aria-describedby="addon-right addon-left"
                        @keyup="otpValidate()">
                    </div>
                                        
                  </div>

                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .
                    </button>

                    <button v-if="!loading"
                      :disabled="!otp || !isValid"
                      class="btn btn-default my-4">Submit
                    </button>

                  </form>

                  </div>
                  
                  <hr/>

                  <div class="text-left">
                    <p><span :style="{ fontWeight: 'bold' }">Notifications</span></p>
                    <small>Select how you would like to receive notifications 
                    for activity on your account such as buying, selling, 
                    transfers, and more.</small> <br/> <br/>

                    <h5>Push Notifications
                    <span class="float-right">
                      <label class="custom-toggle">
                        <input type="checkbox" 
                        :checked="user.notifications.push_notification" 
                        @click="selectPush()"/>
                        <span class="custom-toggle-slider rounded-circle"></span>
                      </label> 
                    </span>
                    </h5> <br/>

                    <h5>Email Notifications
                    <span class="float-right">
                      <label class="custom-toggle">
                        <input type="checkbox" 
                        :checked="user.notifications.email_notification" 
                        @click="selectEmail()"/>
                        <span class="custom-toggle-slider rounded-circle"></span>
                      </label> 
                    </span>
                    </h5>

                  </div>
                  <hr/>


                  <div class="text-left">
                    <p><span :style="{ fontWeight: 'bold' }">Auto Logout</span>
                    <span class="float-right">
                      <label class="custom-toggle">
                        <input type="checkbox" 
                        :checked="user.notifications.auto_logout" 
                        @click="selectAutologout()"/>
                        <span class="custom-toggle-slider rounded-circle"></span>
                      </label> 
                      </span></p>
                    <small>You currently have auto logout 
                      <strong>{{user.notifications.auto_logout ? 'enabled' : 'disabled'}}</strong>.
                     This means your account is{{user.notifications.auto_logout ? '' : ' not'}} automatically logged out when
                      you close or dismiss this app.</small>
                  </div>
                  <hr/>

                  <div class="text-left">
                    <p><span :style="{ fontWeight: 'bold' }">Close Account</span></p>
                    <small>You can close your BuyCoins accounts and delete all your 
                      personal data. <strong>This action cannot be undone</strong>. To do so, please
                       contact us using the button below.</small> <br/> <br/>

                    <router-link :to="{ name: 'mail-us', params: { type: 'close account' }}" target="_blank">
                    <button class="btn btn-default mb-sm-0">Close your account</button>
                    </router-link>

                  </div>


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
import { validateName, validateNumber } from '../lib/validations';


export default {
  name: "Settings",
  data() {
    return {
      faType: 'SMS',
      fa: false,
      toggle: false,
      smsSetup: false,
      googleSetup: false,
      otp: '',
      qrCode: {},
      qrSet: false,
      errors: {
        otp: '',
      },
      otpSent: false,
      isValid: false,
      loading: false,
      user: {
        notifications: {
        }
      },
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'remove2Fa', 'sms2Fa', 'setSMS2fa',
      'emailNotification', 'pushNotification', 'autoLogout',
      'google2Fa', 'setGoogle2fa'
    ]),
    otpValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateNumber(this.otp, 'OTP', 6);
      this.errors.otp = error;
      this.isValid = isValid;
    },
    selectFa(){
      this.$store.commit('clearMessages');
      this.fa = !this.fa;
      this.toggle = this.fa ? true : false;
      this.otpSent = false;
      this.faType = 'SMS'
      this.qrCode = { qrCode: false };
      

      if(!this.fa && this.user.two_fa){ 
        this.remove2Fa()
        .then(() => this.changeState()); 
      }
    },
    selectEmail(){
      this.emailNotification()
      .then(() => {
        this.user.notifications.email_notification = 
        !this.user.notifications.email_notification
      }); 
    },
    selectPush(){
      this.pushNotification()
      .then(() => {
        this.user.notifications.push_notification = 
        !this.user.notifications.push_notification
      }); 
    },
    selectAutologout(){
      this.autoLogout()
      .then(() => {
        this.user.notifications.auto_logout = 
        !this.user.notifications.auto_logout
      }); 
    },
    sendOTP(){
      this.loading = true

      if(this.faType === 'SMS'){
        this.$store.commit('clearMessages');
        this.sms2Fa().then((res) => {
          this.initialState();           
          this.otpSent = !res.data.set;
          this.loading = false;
          this.toggle = false;
        }).catch((e) => this.loading = false);
      }
      
      if(this.faType === 'Google Authenticator'){     
        this.$store.commit('clearMessages');     
        this.otpSent = true;
        this.loading = false;
      }

    },
    createQrCode(){
      if(this.faType === 'Google Authenticator'){
        this.loading = true;
        this.google2Fa().then((res) => {
          this.initialState();  
          this.otpSent = res.data.set;  
          this.qrCode = res.data;       
          this.loading = false;
        }).catch((e) => this.loading = false);
      }
    },
    processOTP(){
      let status = true;

      if(status){
        this.otpValidate();
        status = this.isValid;
      }
      

      const body = {
        otp: this.otp
      }

      if(status && this.faType === 'SMS'){
        this.loading = true;
        this.setSMS2fa(body).then(() => {
          this.initialState(); 
          this.otpSent = false;
        }).catch((e) => {
          this.loading = false;
          this.otpSent = true;
          this.fa = false;
          });
      }

      if(status && this.faType === 'Google Authenticator'){
        this.loading = true;
        this.setGoogle2fa(body).then(() => {
          this.initialState(); 
          this.otpSent = false;
        }).catch((e) => {
          this.loading = false;
        });
      }

    },
    initialState(){
      this.faType = 'SMS';
      this.otp = '';
      this.errors = {
        otp: '',
      };
      this.isValid = false;
      this.loading = false;
    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
  },
  mounted(){
    if(this.user.notifications.auto_logout){
      window.onbeforeunload = (e) => {
        this.logOut();
      }
    }  
  },
  created(){
    this.getProfile().then(() => {
    this.user = this.getUser;
    this.fa = this.user.two_fa;

    if(this.user.two_fa === 'sms'){
      this.faType = 'SMS';
    }

    if(this.user.two_fa === 'google'){
      this.faType = 'Google Authenticator';
    }

    if(this.user.sms2fa){
      this.smsSetup = true; 
    }

    if(this.user.google2fa_secret){
      this.googleSetup = true; 
    }    
  }); 
 }
    
};

</script>
<style>
</style>
