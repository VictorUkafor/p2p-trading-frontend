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
                  <h5><strong>Create Mock Account</strong></h5>
                  <hr/>
        
                <form 
                v-if="accounts.length < 5"
                  role="form" 
                  method="post"
                  @submit.prevent="processForm">

                  <div 
                    v-if="getMessage && !amount" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}
                  </div>

                  <div 
                    v-if="getError && !amount" 
                    class="alert alert-danger" 
                    role="alert">{{ getError  }}
                  </div>

                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-credit-card"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="bankName"
                        class="form-control"
                        type="text"
                        placeholder="Enter Bank Name"
                        name="bankName"
                        aria-describedby="addon-right addon-left"
                        @keyup="nameValidate()">
                    </div>
                                        
                  </div>

                  <div 
                    v-if="errors.bankName && !amount" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.bankName }}
                  </div>


                  <div v-if="!accounts.length" class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-mobile-button"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="phone"
                        class="form-control"
                        type="text"
                        placeholder="Enter your Phone Number"
                        name="phone"
                        aria-describedby="addon-right addon-left"
                        @keyup="phoneValidate()">
                    </div>
                                        
                  </div>


                  <div 
                    v-if="errors.phone" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.phone }}
                  </div>


                  <div class="text-center" >
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                      <button v-if="!loading" :disabled="!isValid || !bankName" 
                      class="btn btn-default my-4">Create Account</button>

                  </div>
                </form>
                
                <div class="text-left" v-for="account in accounts" :key="account.id">
                  <hr/>

                  <div>                      
                    <p>
                      <span :style="{ fontWeight: 'bold' }">
                      Account Name: </span>{{account.account_name}}
                    </p>
                    <p>
                      <span :style="{ fontWeight: 'bold' }">
                      Account Number: </span>{{account.account_number}}
                    </p>
                    <p>
                      <span :style="{ fontWeight: 'bold' }">
                      Bank:</span> {{account.bank}}
                    </p>
                    <p>
                      <span :style="{ fontWeight: 'bold' }">
                      BVN: </span> {{account.bvn}}
                      </p>
                    <p>
                      <span :style="{ fontWeight: 'bold' }">
                      Card Number: </span>{{account.card}}
                    </p>
                    <p>
                    <span :style="{ fontWeight: 'bold' }">
                      Balance:  </span> N{{account.balance}}
                    </p>
                    <p>
                    <span :style="{ fontWeight: 'bold' }">
                      Found Account  </span> 
                    <span class="float-right">
                      <label class="custom-toggle">
                        <input type="checkbox"  
                        :checked="selected === account.id"                     
                        @click="fundNow(account.id)"/>
                        <span class="custom-toggle-slider rounded-circle"></span>
                      </label> 
                      </span>
                      </p>

                      <div v-if="selected === account.id">
                      <form role="form" method="post" 
                      @submit.prevent="fundAccount(account.account_number)">
                      <div v-if="!loading" class="form-group input-group-alternative">

                      <div v-if="(errors.amount || getError) && selected === account.id" 
                      class="alert alert-danger" 
                      role="alert">{{ errors.amount || getError }}
                      </div>

                      <div v-if="getMessage && selected === account.id" 
                      class="alert alert-success" 
                      role="alert">{{ getMessage }}
                      </div>

                      <input 
                        v-model="amount"
                        class="form-control"
                        type="text"
                        placeholder="Enter amount"
                        name="amount"
                        aria-describedby="addon-right addon-left"
                        @keyup="amountValidate()">
                       </div>

                      <button 
                       v-if="loading && selected" 
                       disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      </button>

                       </form>
                       </div>
                                        
                  </div>
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
      bankName: '',
      phone: '',
      isValid: false,
      loading: false,
      amount: '',
      errors: {
        bankName: '',
        phone: '',
      },
      accounts: [],
      selected: 0,
      user: {
        notifications: {},
      }
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'createMockAccount',
      'getMockAccounts', 'fundMock'
    ]),
    nameValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateName(this.bankName, 'bank name');
      this.errors.bankName = error;
      this.isValid = isValid;
    },
    phoneValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.phone, 'phone', 11);
      this.errors.phone = error;
      this.isValid = isValid;
    },
    amountValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.amount, 'amount');
      this.errors.amount = error;
      this.isValid = isValid;
     console.log('ddddd', this.amount);
    },
    fundNow(id) {
      this.$store.commit('clearMessages');
      this.selected = this.selected ? 0 : id;
      this.amount = '';
    },
    initialState(){
      this.bankName = '';
      this.phone = '';
      this.loading = false;
      this.isValid = false;
      this.errors = {
        bankName: '',
        phone: ''
      }
    },
    processForm(){
      let status = true;

      console.log('accounts', this.accounts);

      if(status){
        this.nameValidate();
        status = this.isValid;
      }

      if(status && !this.accounts.length){
        this.phoneValidate();
        status = this.isValid;
      }

      const body = {
        bank: this.bankName.trim(),
        phone: this.phone.trim(),
      }


      if(status){  
        this.loading = true;    
        this.createMockAccount(body)
        .then(() => {
          this.getMockAccounts()
          .then((res) => {
            this.accounts = res.data.accounts;
            console.log('inside componnents', res.data);
            this.initialState();
            });
        }).catch(() => this.initialState());
      }

    },
    fundAccount(accountNumber){
      let status = true;

      if(status){
        this.amountValidate();
        status = this.isValid;
      }

      const body = {
        amount: this.amount.trim(),
        account_number: accountNumber
      }


      if(status){  
        this.loading = true;    
        this.fundMock(body)
        .then(() => {
          this.getMockAccounts()
          .then((res) => {
            this.accounts = res.data.accounts;
            console.log('inside componnents', res.data);
            this.initialState();
            });
        }).catch(() => this.initialState());
      }

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
    this.$store.commit('clearMessages');
    this.getProfile().then((res) => {
      this.accounts = res.data.user.mockAccounts ? 
      res.data.user.mockAccounts : [];
    });
    this.user = this.getUser;
    
  }
    
};

</script>
<style>
</style>
