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


                  <p class="text-left" :style="{ fontWeight: 'bold' }">Amount</p>

                    <div v-if="errors.amountInCash || errors.amountInCoin" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.amountInCash || errors.amountInCoin }}</div>

                    <div class="input-group mb-3">
                      <input 
                        v-model="amountInCoin"
                        class="form-control"
                        type="text"
                        :placeholder=amountInCash
                        name="amountInCoin"
                        aria-describedby="addon-right addon-left"
                        @keyup="coinValidate()"/> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                            {{coin}}
                          </span>
                        </div>
                      </div> 


                    <div class="input-group mb-3">
                      <input 
                        v-model="amountInCash"
                        class="form-control"
                        type="text"
                        disabled
                        :placeholder=amountInCoin
                        name="amountInCash"
                        aria-describedby="addon-right addon-left"
                        /> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                            NGN
                          </span>
                        </div>
                      </div> 

                      <div class="text-left">
                        <span>Price per Coin</span>
                        <span class="float-right" :style="{ fontWeight: 'bold' }">
                          {{rate[coin][trans]}}/{{coin}}
                        </span>
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
                      class="btn btn-default my-4">Submit</button>

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
import { validateNumber, validateAmount } from '../lib/validations';

const btcSelling = process.env.VUE_APP_BTC_SELLING_PRICE;
const btcBuying = process.env.VUE_APP_BTC_BUYING_PRICE;
const ltcSelling = process.env.VUE_APP_LTC_SELLING_PRICE;
const ltcBuying = process.env.VUE_APP_LTC_BUYING_PRICE;
const ethSelling = process.env.VUE_APP_ETH_SELLING_PRICE;
const ethBuying = process.env.VUE_APP_ETH_BUYING_PRICE;

export default {
  name: "BuyCoin",
  data() {
    return {
      amountInCash: '',
      amountInCoin: '',
      card: '',
      account: '',
      trans: 'buy',
      coin: 'BTC',
      isValid: false,
      errors: {
        amountInCash: '',
        amountInCoin: '',
        account: '',
        card: '',
      },
      loading: false,
      rate: {
        BTC: {
          buy: btcBuying,
          sell: btcSelling
        },
        LTC: {
          buy: ltcBuying,
          sell: ltcSelling
        },
        ETH: {
          buy: ethBuying,
          sell: ethSelling
        }
      },
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'getWallet', 
      'postBuyTrade', 'postSellTrade'
    ]),
    coinValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateAmount(this.amountInCoin, 'amount in coin');      
      this.errors.amountInCoin = error;
      this.isValid = isValid;

      if(!error){
        this.amountInCash = this.amountInCoin * this.rate[this.coin][this.trans];
      }

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
      this.amountInCash = '';
      this.amountInCoin = '';
      this.account = '';
      this.card = '';
      this.isValid = false;
      this.errors = {
        amountInCash: '',
        amountInCoin: '',
        account: '',
        card: '',
      };
      this.loading = false;
    },
    processPost(){
      let status = true;

      if(status){
        this.coinValidate();
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
        price_type: 'dynamic',
        price: this.rate[this.coin][this.trans],
        min: this.amountInCoin,
        max: this.amountInCoin,
        deadline: (7 * 24 * 60),
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
      this.setState();
      this.coin = coin;
    },
    changeTrans(trans){
      this.$store.commit('clearMessages');
      this.setState();
      this.trans = null;
      this.trans = trans;
    },
    setPrice(){
      this.$store.commit('clearMessages');
      if(this.priceType === 'dynamic'){
        this.price = pricePerCoin;
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
    verified(){
      return this.getUser.bvn && this.getUser.bvn.verified;
    },
    noErrors(){
      const { 
        amountInCash, amountInCoin, 
        card, account 
      } = this.errors;
      
      return amountInCash || amountInCoin ||
       (card || account) || !this.isValid;

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
