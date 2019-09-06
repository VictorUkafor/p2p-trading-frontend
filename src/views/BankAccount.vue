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

                <div class="text-center mb-10">
                  <h5><strong>Bank Accounts</strong></h5>
                  <hr/>
        
                <form 
                  v-if="accounts.length < 6"
                  role="form" 
                  method="post"
                  @submit.prevent="processForm">

                  <div 
                    v-if="getMessage" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}</div>
                  <div 
                    v-if="getError || errors.accountNumber" 
                    class="alert alert-danger" 
                    role="alert">{{ 
                      getError || errors.accountNumber ||
                      errors.internetBanking }}</div>

                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-credit-card"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="accountNumber"
                        class="form-control"
                        type="text"
                        placeholder="Enter Bank Account Number"
                        name="accountNumber"
                        aria-describedby="addon-right addon-left"
                        @keyup="accountValidate()">
                    </div>
                                        
                  </div>


                  <div class="custom-control custom-checkbox text-left">
                    <input 
                      id="cbId"
                      v-model="internetBanking"
                      class="custom-control-input"
                      type="checkbox"
                      name="internetBanking"
                      @change="ibValidate()"
                    >
                    <label 
                      for="cbId" 
                      class="custom-control-label">
                      <span>internet/Mobile Banking</span>
                      <slot/>
                    </label>
                  </div>

                  <div class="text-center" >
                                    
                    <button v-if="loading" disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                      <button v-if="!loading" :disabled="!isValid || !accountNumber" 
                      class="btn btn-default my-4">Add Bank Account</button>

                  </div>
                </form>
                
                <div class="text-left" v-for="account in accounts" :key="account.id">
                  <hr/>

                  <button v-if="selected != account.id"
                   @click="editAccount(account.id)" 
                  class="btn btn-default mb-sm-0 float-right">Toggle Internet Banking</button>

                    <span v-if="selected === account.id" disabled  
                    class="spinner-border spinner-border-sm float-right" 
                    role="status" aria-hidden="true"></span>
                  <p>                      
                    <strong>{{account.account_name}}</strong><br/>
                    <strong>{{account.account_number}}</strong><br/>
                    <strong>{{account.bank}}</strong><br/>
                    <strong>Internet Banking: {{account.internet_banking ? 'Yes': 'No'}}</strong><br/>
                  </p>
                </div>

                <div v-if="!verified" class="text mb-10">
                  <p><strong>You need to verify your identity.</strong> 
                    Visit the <strong>"Verify Identity"</strong> page and follow the instructions. </p>

                    <router-link to="/verify-identity">
                    <button class="btn btn-default mb-sm-0">Verify Your Identity</button>
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
  name: "BankAccount",
  data() {
    return {
      accountNumber: '',
      internetBanking: true,
      isValid: false,
      loading: false,
      accounts: [],
      errors: {
        accountNumber: '',
        internetBanking: '',
      },
      selected: 0,
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'addAccount', 'logOut',
      'getAccounts', 'updateAccount'
    ]),
    accountValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.accountNumber, 'account number');
      this.errors.accountNumber = error;
      this.isValid = isValid;
    },
    ibValidate() {
      this.$store.commit('clearMessages');
      if(!this.internetBanking){
        this.errors.internetBanking = 
        'This is required for transactions notification';
      } else {
        this.errors.internetBanking = '';
      }      
    },
    editAccount(id) {
      this.selected = id;
      this.updateAccount(id)
      .then(() => this.getProfile()
        .then(() => {
          this.initialState();
          this.accounts = this.getUser.bankAccounts;
        }))
        .catch(() => this.selected = 0);

    },
    initialState(){
      this.accountNumber = '';
      this.internetBanking = true;
      this.loading = false;
      this.isValid = false;
      this.selected = 0;
      this.errors = {
        accountNumber: '',
        internetBanking: ''
      }
    },
    processForm(){
      let status = true;

      if(status){
        this.accountValidate();
        status = this.isValid;
      }

      const body = {
        account_number: this.accountNumber.trim(),
        internet_banking: this.internetBanking,
      }


      if(status){  
        this.loading = false;    
        this.addAccount(body)
        .then(() => {
          this.getProfile()
          .then(() => {
            this.initialState();
            this.accounts = this.getUser.bankAccounts;
          })
        }).catch(() => this.initialState());
      }

    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
    verified(){
      return this.getUser.bvn && this.getUser.bvn.verified;
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
    this.getProfile()
    .then(() => this.accounts = this.getUser.bankAccounts || []);
  }
    
};

</script>
<style>
</style>
