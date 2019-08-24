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
                  <h5><strong>Bank Accounts</strong></h5>
                  <hr/>
        
                <form 
                  v-if="getUser.bvn.verified"
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
                                    
                    <button 
                      v-if="loading" 
                      disabled 
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

                  <button 
                      v-if="selected === account.id" disabled 
                      class="btn btn-neutral mb-sm-0 float-right">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                  </button>
                  <p>                      
                    <strong>{{account.account_name}}</strong><br/>
                    <strong>{{account.account_number}}</strong><br/>
                    <strong>{{account.bank}}</strong><br/>
                    <strong>Internet Banking: {{account.internet_banking ? 'Yes': 'No'}}</strong><br/>
                  </p>
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
      errors: {
        accountNumber: '',
        internetBanking: '',
      },
      accounts: {},
      selected: 0,
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'addAccount',
      'getAccounts', 'updateAccount'
    ]),
    accountValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.accountNumber, 'account number', 10);
      this.errors.accountNumber = error;
      this.isValid = isValid;
     console.log('ddddd', this.accountNumber);
    },
    ibValidate() {
      this.$store.commit('clearMessages');
      if(!this.internetBanking){
        this.errors.internetBanking = 'This is required for transactions notification';
      } else {
        this.errors.internetBanking = '';
      }      
     console.log('ddddd', this.internetBanking);
    },
    editAccount(id) {
      this.selected = id;
      this.updateAccount(id)
      .then(() => this.getAccounts()
        .then((res) => {
          this.selected = 0;
          this.accounts = res.data.accounts;
          })
        ).catch(() => this.selected = 0);

    },
    initialState(){
      this.accountNumber = '';
      this.internetBanking = true;
      this.loading = false;
      this.isValid = false;
      this.errors = {
        accountNumber: '',
        internetBanking: ''
      }
    },
    processForm(){
      this.loading = true;
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
        this.addAccount(body)
        .then(() => {
          this.initialState();
          this.getAccounts()
          .then((res) => this.accounts = res.data.accounts);
        }).catch(() => this.initialState());
      }

    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
  },
  created(){
    this.getProfile()
    .then((res) => this.accounts = 
    res.data.user.bankAccounts ? 
    res.data.user.bankAccounts : {} );
    
  }
    
};

</script>
<style>
</style>
