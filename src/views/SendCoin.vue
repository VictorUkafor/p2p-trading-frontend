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
                    <button @click="changeTrans('send')" 
                    :class="trans === 'send'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">Send Coin
                    </button>
                    <button @click="changeTrans('receive')" 
                    :class="trans === 'receive'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">Receive Coin
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

                  <div v-if="trans === 'send'">

                  <form role="form" method="post" @submit.prevent="processSend">
                  
                  <div v-if="getError.errorMessage" class="alert alert-danger" 
                  role="alert">{{ getError.errorMessage }}</div>

                  <div v-if="getMessage" class="alert alert-success" 
                  role="alert">{{ getMessage }}</div>

                  <div v-if="trans === 'send' && verified" class="text-left">
                    <span :style="{ fontWeight: 'bold' }">Reciever</span>
                    <span class="float-right">
                      <div class="custom-contol mb-3">

                      <select class="custom-select custom-select-sm"
                      v-model="sendMethod" name="sendMethod"
                      aria-describedby="addon-right addon-left">
                      <option>Username</option>
                      <option>Wallet Address</option>
                      </select> 
                      </div>
                    </span>
                  </div> <br>

                    <div v-if="errors.method || methodError" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.method || methodError }}</div>


                  <div class="form-group input-group-alternative">
                      <input 
                        v-model="method"
                        class="form-control"
                        type="text"
                        :placeholder=methodPlaceholder
                        name="method"
                        aria-describedby="addon-right addon-left"
                        @keyup="methodValidate()"/> 
                  </div><br/>


                  <p class="text-left" :style="{ fontWeight: 'bold' }">Amount</p>

                    <div v-if="errors.amount  || amountError" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.amount || amountError }}</div>

                  
                  <div class="input-group mb-3">
                      <input 
                        v-model="amount"
                        class="form-control"
                        type="text"
                        placeholder="Enter amount"
                        name="amount"
                        aria-describedby="addon-right addon-left"
                        @keyup="amountValidate()"/> 
                        
                        <div class="input-group-append">
                          <span class="input-group-text" id="basic-addon2">
                            {{coin}}
                          </span>
                          </div>
                          </div>                  
                          
                    <div class="text-left">
                      <small><span :style="{ fontWeight: 'bold' }">Current balance</span>
                        <span class="float-right">0.00 {{coin}}</span></small><br>
                      <small><span :style="{ fontWeight: 'bold' }">Est. transfer fee</span>
                        <span class="float-right">0.00 {{coin}}</span></small><br>
                      <small><span :style="{ fontWeight: 'bold' }">Balance after send</span>
                        <span class="float-right">0.00 {{coin}}</span></small>
                    </div>
                    <hr/>



                    <button v-if="loading" disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                    <button v-if="!loading" :disabled="!isValid" 
                      class="btn btn-default my-4">Review Details</button>



                  </form>

                  </div>

                  <div v-if="trans === 'receive' && verified">
                    <p class="text-left" :style="{ fontWeight: 'bold' }">{{cryptos[coin]}} Wallet Address</p>
                    <small class="float-left">Generate a new wallet address for each transaction.</small><br/> <br/>

                    <span v-if="loading" class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span><br>

                    <button 
                    v-if="!loading" 
                    disabled 
                    class="btn btn-outline-link btn-block"
                    id="wallet_address"
                    :style="{ 
                      color: '#000', 
                      textTransform: 'none', 
                      fontSize: '1.6em' }">{{address.address}}</button>


                    <button 
                    v-if="!loading" 
                    class="btn btn-outline-default btn-block"
                    v-clipboard:copy="address.address"
                    v-clipboard:success="copy()"
                    >
                    Copy Wallet Address
                    </button>

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
import { 
  validateEmail, 
  validateName, 
  validateNumber 
} from '../lib/validations';


export default {
  name: "SendCoin",
  data() {
    return {
      sendMethod: 'Wallet Address',
      method: '',
      amount: '',
      verified: false,
      trans: 'send',
      coin: 'BTC',
      isValid: false,
      errors: {
        method: '',
        amount: ''
      },
      loading: false,
      user: {
        notifications: {},
      },
      cryptos: {
        BTC: 'Bitcoin', 
        LTC: 'Litecoin', 
        ETH: 'Ethereum'
      },
      address: {},
      copied: false,
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'generateAddress',
      'getWallet', 'sendViaAddress', 'sendViaEmail'
    ]),
    methodValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateName(this.method, this.sendMethod);      
      this.errors.method = error;
      this.isValid = isValid;
    },
    amountValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateNumber(this.amount, 'amount');      
      this.errors.amount = error;
      this.isValid = isValid;
    },
    processSend(){
      let status = true;

      if(status){
        this.methodValidate();
        status = this.isValid;
      }

      if(status){
        this.amountValidate();
        status = this.isValid;
      }


      const body = {
        address: this.method.trim(),
        username: this.method.trim(),
        coin: this.coin,
        amount: this.amount.trim(),
      }  
      
      
      if(status && this.sendMethod === 'Username'){
        this.loading = true;
        this.sendViaEmail(body)
        .then(() => this.loading = false)
        .catch(() => this.loading = false);
      }

      if(status && this.sendMethod === 'Wallet Address'){
        this.loading = true;
        this.sendViaAddress(body)
        .then(() => this.loading = false)
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
      this.trans = null;
      this.trans = trans;

      if(this.trans === 'receive'){
        this.loading = true;
        const body = { coin: this.coin };

        this.generateAddress(body).then((res) => {
          this.loading = false;
          this.address = res.data.wallet_address;
        }).catch(() => this.loading = false)
      }
      console.log('trans...', this.trans);
    },
    copy(){
      this.copied = true;
    },
    check(coin){
      if(this.coin === coin){
        return true;
      }
    }
  },
  mounted(){
    if(this.user.notifications.auto_logout){
      window.onbeforeunload = (e) => {
        this.logOut();
      }
    }
  },
  computed: {
    ...mapGetters(['getError', 'getUser', 'getMessage']),
    methodPlaceholder(){
      return `Enter the receiver's ${this.sendMethod === 'Wallet Address' ? 
      this.cryptos[this.coin] : 'P2P'} ${this.sendMethod}`;
    },
    methodError(){
      if(this.getError.errors && this.getError.errors.username){
        return this.getError.errors.username[0];
      }

      if(this.getError.errors && this.getError.errors.address){
        return this.getError.errors.address[0];
      }
    },
    amountError(){
      if(this.getError.errors && this.getError.errors.amount){
        return this.getError.errors.amount[0];
      }
    }
  },
  created(){
    this.getWallet();
    this.$store.commit('clearMessages');
    this.getProfile().then(() => {
      this.user = this.getUser;
      this.user = this.user.notifications ? this.user.notifications : {};
      this.verified = this.getUser.bvn ? this.getUser.bvn.verified : false;
    });
  }
    
};

</script>
<style>
</style>
