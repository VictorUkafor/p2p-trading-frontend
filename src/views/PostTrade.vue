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


    <div v-if="getUser.id" class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  
                  <div class="btn-group d-flex" role="group">
                    <button @click="changeTrans('buy')" 
                    :class="trans === 'buy'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">Buy Coin
                    </button>
                    <button @click="changeTrans('sell')" 
                    :class="trans === 'sell'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">Sell Coin
                    </button>
                  </div>

                  <hr/>

                  <div v-if="!verified" class="text mb-10">
                  <p><strong>You need to verify your identity.</strong> 
                    Visit the <strong>"Verify Identity"</strong> page and follow the instructions. 
                  </p>
                  <router-link to="/verify-identity">
                    <button class="btn btn-outline-default mb-sm-0">Verify Your Identity</button>
                  </router-link>
                    <hr/>
                  </div>

                    <div class="text-left">
                      <span><i class="fa fa-bitcoin mr-2"/></span>Bitcoin
                    <span class="float-right">
                      <div class="custom-control custom-radio mb-3">
                        <input class="custom-control-input"
                        type="radio" @click="changeCoin('BTC')"
                        id="PKQSXEU0" :checked="coin === 'BTC'"/>
                        <label for="PKQSXEU0" class="custom-control-label"></label>
                      </div>
                    </span>
                  </div><br>


                  <div class="text-left">
                      <span><i class="fa fa-bitcoin mr-2"/></span>Litecoin
                    <span class="float-right">
                      <div class="custom-control custom-radio mb-3">
                        <input class="custom-control-input"
                        type="radio" @click="changeCoin('LTC')"
                        id="PKQSXEU1" :checked="coin === 'LTC'"/>
                        <label for="PKQSXEU1" class="custom-control-label"></label>
                      </div>
                    </span>
                  </div><br>


                  <div class="text-left">
                      <span><i class="fa fa-bitcoin mr-2"/></span>Ethereum
                    <span class="float-right">
                      <div class="custom-control custom-radio mb-3">
                        <input class="custom-control-input"
                        type="radio" @click="changeCoin('ETH')"
                        id="PKQSXEU2" :checked="coin === 'ETH'"/>
                        <label for="PKQSXEU2" class="custom-control-label"></label>
                      </div>
                    </span>
                  </div>

                  <hr/>

                  <form 
                  v-if="verified" 
                  role="form" 
                  method="post" 
                  @submit.prevent="processPost">
                  
                  <div v-if="getError.errorMessage" class="alert alert-danger" 
                  role="alert">{{ getError.errorMessage }}</div>

                  <div v-if="getMessage" class="alert alert-success" 
                  role="alert">{{ getMessage }}</div>

                  <div class="text-left">
                    <span :style="{ fontWeight: 'bold' }">Price per {{coin}}</span>
                    <span class="float-right">
                      <div class="custom-contol mb-3">

                      <select class="custom-select custom-select-sm"
                      v-model="priceType" name="priceType" @click="setPrice()"
                      aria-describedby="addon-right addon-left">
                      <option value="static">Static</option>
                      <option value="dynamic">Dynamic</option>
                      </select> 
                      </div>
                    </span>
                  </div> <br>

                    <div v-if="errors.price" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.price}}
                    </div>

                  <div class="input-group mb-3">
                      <input 
                        v-model="price"
                        :disabled="priceType === 'Dynamic'"
                        class="form-control"
                        type="text"
                        :placeholder=pricePlaceholder
                        name="price"
                        aria-describedby="addon-right addon-left"
                        @keyup="priceValidate()"/> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                          NGN                           
                          </span>
                        </div>
                      </div>

                        <p v-if="price" class="text-left">
                          {{trans === 'buy'? 'Seller Price': 'Buyer Price'}}
                          <span class="float-right"><b>{{price}} NGN</b></span>
                        </p>
                  <hr/>


                  <p class="text-left" :style="{ fontWeight: 'bold' }">Min {{coin}}</p>

                    <div v-if="errors.minCoin" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.minCoin }}</div>

                    <div class="input-group mb-3">
                      <input 
                        v-model="minCoin"
                        class="form-control"
                        type="text"
                        placeholder="Enter the minimun coin"
                        name="minCoin"
                        aria-describedby="addon-right addon-left"
                        @keyup="minValidate()"/> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                            {{coin}}
                          </span>
                        </div>
                      </div>                  

                          
                  <p class="text-left" :style="{ fontWeight: 'bold' }">Max {{coin}}</p>

                    <div v-if="errors.maxCoin" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.maxCoin }}</div>

                    <div class="input-group mb-3">
                      <input 
                        v-model="maxCoin"
                        class="form-control"
                        type="text"
                        placeholder="Enter the maximiun coin"
                        name="maxCoin"
                        aria-describedby="addon-right addon-left"
                        @keyup="maxValidate()"/> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                            {{coin}}
                          </span>
                        </div>
                      </div>

                      <hr/>


                  <p class="text-left" :style="{ fontWeight: 'bold' }">Deadline</p>

                    <div v-if="errors.deadline" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.deadline }}</div>

                    <div class="input-group mb-3">
                      <input 
                        v-model="deadline"
                        class="form-control"
                        type="text"
                        placeholder="Enter the deadline"
                        name="deadline"
                        aria-describedby="addon-right addon-left"
                        @keyup="deadlineValidate()"/> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                            Days
                          </span>
                        </div>
                      </div>
                    
                    <hr/>

                  <p class="text-left" :style="{ fontWeight: 'bold' }">
                    {{trans === 'buy'? 'Debit Card Number': 'Account Number'}}</p>

                    <div v-if="errors.card" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.card }}</div>

                    <div v-if="errors.account" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.account }}</div>

                    <div v-if="trans === 'buy'" class="input-group mb-3">
                      <input 
                        v-model="card"
                        class="form-control"
                        type="text"
                        placeholder="Enter the number on your card"
                        name="deadline"
                        aria-describedby="addon-right addon-left"
                        @keyup="cardValidate()"/> 
                      </div>

                    <div v-if="trans === 'sell'" class="input-group mb-3">
                      <input 
                        v-model="account"
                        class="form-control"
                        type="text"
                        placeholder="Enter the account number"
                        name="account"
                        aria-describedby="addon-right addon-left"
                        @keyup="accountValidate()"/> 
                      </div>
                    
                    <hr/>


                    <button v-if="loading" disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                    <button v-if="!loading" :disabled="noErrors" 
                      class="btn btn-default my-4">Review Details</button>

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

const pricePerCoin = process.env.VUE_APP_PRICE_PER_COIN;

export default {
  name: "PostTrade",
  data() {
    return {
      priceType: 'static',
      price: '',
      minCoin: '',
      maxCoin: '',
      card: '',
      deadline: '',
      account: '',
      trans: 'buy',
      coin: 'BTC',
      isValid: false,
      errors: {
        price: '',
        minCoin: '',
        maxCoin: '',
        deadline: '',
        account: '',
        card: '',
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'getWallet', 
      'postBuyTrade', 'postSellTrade'
    ]),
    priceValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.price, 'price');      
      this.errors.price = error;
      this.isValid = isValid;
    },
    minValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.minCoin, 'minimum coin');      
      this.errors.minCoin = error;
      this.isValid = isValid;
    },
    maxValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.maxCoin, 'maximum coin');      
      this.errors.maxCoin = error;
      this.isValid = isValid;
    },
    deadlineValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.deadline, 'deadline');      
      this.errors.deadline = error;
      this.isValid = isValid;
    },
    cardValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.card, 'debit card number');      
      this.errors.card = error;
      this.isValid = isValid;
    },
    accountValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.account, 'account number');      
      this.errors.account = error;
      this.isValid = isValid;
    },
    setState(){
      this.price = '';
      this.minCoin = '';
      this.maxCoin = '';
      this.deadline = '';
      this.account = '';
      this.card = '';
      this.isValid = false;
      this.errors = {
        price: '',
        minCoin: '',
        maxCoin: '',
        deadline: '',
        account: '',
        card: '',
      };
      this.loading = false;
    },
    processPost(){
      let status = true;

      if(status){
        this.priceValidate();
        status = this.isValid;
      }

      if(status){
        this.minValidate();
        status = this.isValid;
      }

      if(status){
        this.maxValidate();
        status = this.isValid;
      }

      if(status){
        this.deadlineValidate();
        status = this.isValid;
      }

      if(status && this.trans === 'buy'){
        this.cardValidate();
        status = this.isValid;
      }

      if(status && this.trans === 'sell'){
        this.accountValidate();
        status = this.isValid;
      }

      const body = {
        coin: this.coin,
        price_type: this.priceType,
        price: this.price,
        min: this.minCoin,
        max: this.maxCoin,
        deadline: (this.deadline * 24),
        account_number: this.account,
        card: this.card,
      }  
      
      if(status && this.trans === 'buy'){
        this.loading = true;
        this.postBuyTrade(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);
      }

      if(status && this.trans === 'sell'){
        this.loading = true;
        this.postSellTrade(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);
      }

    },
    changeCoin(coin){
      this.$store.commit('clearMessages');
      this.coin = coin;
      console.log('coin...', this.coin);
    },
    changeTrans(trans){
      this.$store.commit('clearMessages');
      this.setState();
      this.trans = null;
      this.trans = trans;

      console.log('trans...', this.trans);
    },
    setPrice(){
      this.$store.commit('clearMessages');
      if(this.priceType === 'dynamic'){
        this.price = pricePerCoin;
        console.log('fgfgfgfg', pricePerCoin);
      }
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
  computed: {
    ...mapGetters(['getError', 'getUser', 'getMessage']),
    pricePlaceholder(){
      if(this.priceType === 'static'){
        return `Enter your price per ${this.coin}`
      }

      if(this.priceType === 'dynamic'){
        return this.price;
      }
    },
    verified(){
      return this.getUser.bvn && this.getUser.bvn.verified;
    },
    noErrors(){
      const { 
        price, minCoin, 
        maxCoin, deadline, 
        card, account 
      } = this.errors;
      
      
      return price || minCoin || maxCoin ||
      deadline || (card || account) || !this.isValid;

    }
  },
  created(){
    this.getWallet();
    this.$store.commit('clearMessages');
    this.getProfile();
  }
    
};

</script>
<style>
</style>
