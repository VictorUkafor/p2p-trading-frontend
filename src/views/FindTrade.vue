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
              
              <div class="btn-group d-flex" role="group">
                <button @click="changeTrans('Buy')"
                :class="trans === 'Buy'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Buy Coin
                </button>
                <button @click="changeTrans('Sell')" 
                :class="trans === 'Sell'? 'btn-basic': 'btn-default'" 
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

              <div v-if="trans !== trade.type" 
              v-for="trade in trades" :key="trade.id" class="text-left">


                 <div 
                    v-if="getError && target.id === trade.id" 
                    class="alert alert-danger" 
                    role="alert">{{ getError }}
                  </div>

                  <div 
                    v-if="getMessage && target.id === trade.id" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}
                  </div>

                <button @click="engageAd(trade)" 
                v-if="target.id !== trade.id && trade.user_id !== getUser.id"
                class="btn btn-outline-default mb-sm-0 float-right">
                  {{trade.type === 'Buy' ? 'Sell' : 'Buy'}}
                </button>

                <span v-if="loading && trade.min === trade.max && 
                target.id === trade.id" 
                class="spinner-border spinner-border-sm float-right" 
                role="status" aria-hidden="true">
                </span>

                <p><strong>
                  <span v-if="trade.min !== trade.max"
                  :style="{ fontWeight: 'bold' }">
                    {{trade.type === 'Buy' ? 'Sell' : 'Buy'}} at {{trade.price}}NGN/{{trade.coin}}<br/>
                  </span>
                
                  <span v-if="trade.min === trade.max" 
                  :style="{ fontWeight: 'bold' }">
                    {{trade.type === 'Buy' ? 'Sell' : 'Buy'}} {{trade.max}}{{trade.coin}} 
                    for N{{(trade.price * trade.min)}}<br/>
                  </span>

                <span v-if="trade.min !== trade.max">{{trade.min}} - {{trade.max}} {{trade.coin}}<br/></span> 
                @{{trade.creator.email === getUser.email ? 'You' : trade.creator.email}}<br/>
                {{trade.referenceNo}}<br/>
                </strong></p>

                <form 
                  v-if="target.id === trade.id && trade.min !== trade.max"
                  role="form" 
                  method="post" 
                  @submit.prevent="processEngage">  

                  <div 
                    v-if="error || getError.errorMessage" 
                    class="alert alert-danger" 
                    role="alert">{{ error || getError.errorMessage }}
                  </div>

                  <div 
                    v-if="getMessage" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}
                  </div>
                                
                  <div class="form-group input-group-alternative">
                    <input 
                      v-if="!loading"
                      v-model="coinNumber"
                      class="form-control"
                      type="text"
                      placeholder="Enter the number of coin and hit Enter"
                      name="coinNumber"
                      aria-describedby="addon-right addon-left"
                      @keyup="coinValidate()">                                        
                  </div>
                                    
                  <div class="text-center">              
                    <span v-if="loading" 
                    class="spinner-border spinner-border-sm" 
                    role="status" aria-hidden="true">
                    </span>
                  </div>

                </form>


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
import { validateAmount } from '../lib/validations';


export default {
  name: "FindTrade",
  data() {
    return {
      trans: 'Buy',
      coinNumber: '',
      trades: [],
      isValid: false,
      error: '',
      loading: false,
      target: '',
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'getWallet', 
      'getTradeAds', 'engageTradeAd'
    ]),
    coinValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateAmount(this.coinNumber, 'value');      
      this.error = error;
      this.isValid = isValid;
    },
    setState(){
      this.coinNumber = '';
      this.isValid = false;
      this.error = '';
      this.loading = false;
    },
    changeTrans(trans){
      this.$store.commit('clearMessages');
      this.setState();
      this.trans = null;
      this.trans = trans;
    },
    engageAd(trade){
      this.$store.commit('clearMessages');
      this.target = trade;
      this.coinNumber = ''

      if(this.target.min === this.target.max){
        
        const body = {
          id: this.target.id,
          amount_in_coin: this.target.max,
          amount_in_cash: (this.target.price * this.target.max),
        } 

        this.loading = true;
        this.engageTradeAd(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);        

      }
    },
    processEngage(){
      let status = true;

      if(status){
        this.coinValidate();
        status = this.isValid;
      }

      const body = {
        id: this.target.id,
        amount_in_coin: this.coinNumber.trim(),
        amount_in_cash: this.coinNumber.trim() * this.target.price,
      }  
      
      
      if(status){
        this.loading = true;
        this.engageTradeAd(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);
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
  },
  created(){
    this.getWallet();
    this.$store.commit('clearMessages');
    this.getProfile();
    this.getTradeAds().then(res => {
      this.trades = res.data.trades ? 
      res.data.trades : [];
    });
  }
    
};

</script>
<style>
</style>
