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
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>Verify Identity</strong></h5>
                  <div v-if="getUser.bvn && !bvnNumber.verified" class="text-center text-muted mb-4">
                  <small>To change or edit your BVN number, just enter the new one
                    in the field below</small><br/>
                    <small>OR</small><br/>
                  <small>
                    Click on the "SEND OTP" 
                    button to receive OTP for BVN verification</small>
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

                  <div v-if="!getUser.bvn" class="form-group input-group-alternative">
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
                                
                  <div v-if="getUser.bvn && !bvnNumber.verified" 
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
                        :placeholder=bvnNumber.bvn_number
                        name="bvn"
                        aria-describedby="addon-right addon-left"
                        @keyup="bvnValidate()">
                    </div>
                                        
                  </div>

                  <div v-if="!bvn && getUser.bvn && !bvnNumber.verified"
                   class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-mobile-button"/>
                        </slot>
                      </span>
              
                      <input 
                        class="form-control"
                        type="text"
                        disabled
                        :value="formatPhone"
                        aria-describedby="addon-right addon-left"
                        >
                    </div>
                                        
                  </div>

                  <div class="text-center" >
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">Loading . . .</button>

                      <button 
                      v-if="!loading && getUser.bvn && !bvnNumber.verified && bvn" 
                      :disabled="noErrors" 
                      class="btn btn-default my-4">Edit BVN</button>

                      <button 
                      v-if="!loading && getUser.bvn && !bvnNumber.verified && !bvn" 
                      class="btn btn-default my-4">Send OTP</button>

                    <button 
                      v-if="!loading && !getUser.bvn" 
                      :disabled="noErrors" 
                      class="btn btn-default my-4">Add BVN</button>

                  </div>
                </form>

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
      bvnNumber: {
        verified: false,
        bvn_number: '',
      },
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'addBVN', 'editBVN', 'sendOTP'
    ]),
    bvnValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateNumber(this.bvn, 'BVN', 10);
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

      if(!this.getUser.bvn){
        this.processAdd();
      }

      if(this.bvn && this.getUser.bvn && !this.bvnNumber.verified){
        this.processEdit();
      }

      if(!this.bvn && this.getUser.bvn && !this.bvnNumber.verified){
        this.processSend();
      }

    },
    processAdd() {
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

      this.addBVN(body)
      .then(() => {
        this.initialState();
        return this.$router.go('/verify-identity');
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
      .then(() => {
        this.initialState();
        return this.$router.go('/verify-identity');
        }).catch(() => this.initialState());

    },
    processSend() {
      this.sendOTP()
      .then(() => {
        this.initialState();
        return this.$router.go('/verify-identity');
        }).catch(() => this.initialState());

    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
    formatPhone(){
      return `XXXXXXX${this.getUser.phone.substr(-4, 4)}`;
    },
    noErrors(){
      return !this.bvn || !this.isValid;
    },
  },
  mounted(){
    this.bvnNumber = this.getUser.bvn ? this.getUser.bvn : {
      verified: false,
      bvn_number: '',
    };
    console.log('eeeeeeee', this.bvnNumber);
  },
  created(){
    this.$store.commit('setPage', 'verify-identity');
    this.getProfile();
  }
    
};

</script>
<style>
</style>
