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


    <div v-if="getUser.id">

    <div v-if="!verified" class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-8">

          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text mb-10">
                  <p><strong>You need to verify your identity.</strong> 
                    Visit the <strong>"Verify Identity"</strong> page and follow the instructions. </p>

                    <router-link to="/verify-identity">
                    <button class="btn btn-outline-default mb-sm-0">Verify Your Identity</button>
                    </router-link>
                </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>Buy & Sell Now</strong></h5>
                  <hr/>
                  <div class="btn-group d-flex" role="group">
                    <button @click="changeCoin('BTC')"
                    :class="coin === 'BTC'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">BTC
                    </button>
                    <button @click="changeCoin('LTC')"
                    :class="coin === 'LTC'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">LTC
                    </button>
                    <button @click="changeCoin('ETH')"
                    :class="coin === 'ETH'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">ETH
                    </button>
                  </div>
                  <hr/>
                  <div>
                  <router-link to="/buy-and-sell-coin">
                  <div class="text-left">
                    <small><strong>
                      <span>
                        <i class="fa fa-bitcoin mr-2"/>
                      </span>Buy Price</strong></small>
                    <h5><strong>{{rate[coin].buy}}</strong>/{{coin}} <span class="float-right">></span></h5>
                  </div>
                  </router-link>
                  <hr/>
                  <router-link to="/buy-and-sell-coin">
                  <div class="text-left">
                    <small><strong>
                      <span>
                        <i class="fa fa-bitcoin mr-2"/>
                      </span>Sell Price</strong></small>
                    <h5><strong>{{rate[coin].sell}}</strong>/{{coin}} <span class="float-right">></span></h5>
                  </div>
                  </router-link>
                  </div>
                </div>
            
            </div>
          </div>


        </div>
      </div>
    </div>


    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-8">
        
         <router-link to="/buy-and-sell-coin">
          <button class="btn btn-neutral btn-lg col-sm-5">
            <h5><strong>Buy</strong> Coins<br/>              
            <span><i class="fa fa-cart-plus mr-2"/></span>
            </h5>
          </button>
          </router-link>
          <router-link to="/buy-and-sell-coin">
          <button class="btn btn-neutral btn-lg col-sm-5 float-right">
            <h5><strong>Sell</strong> Coins<br/>              
            <span><i class="fa fa-bitcoin mr-2"/></span>
            </h5>
          </button>
          </router-link>
        </div>
      </div>
    </div>


    <div class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>Trade Bitcoin peer-to-peer</strong></h5>
                  <hr/>
                    <div class="btn-group d-flex" role="group">
                    <button @click="changeTrans('Buy')"
                    :class="trans === 'Buy'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">Buy BTC</button>
                    <button @click="changeTrans('Sell')"
                    :class="trans === 'Sell'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">Sell BTC</button>
                    </div>
                  
              <div v-if="trans === trade.type && trades.indexOf(trade) < 5"
              v-for="trade in trades" :key="trade.id" class="text-left">
              <hr/>

                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                    {{trade.type}} at {{trade.price}} NGN/{{trade.coin}}
                  </span><br/>
                {{trade.min}} - {{trade.max}} {{trade.coin}} <br/>
                @{{trade.creator.email}}<br/>
                {{trade.referenceNo}}<br/>
                </strong></p>
                  </div>

                  <div v-if="trades.length">
                    <hr/>
                    <small>
                      <router-link to="/find-trade-ads">View all {{trans}} ads</router-link>
                    </small>
                  </div>

                </div>
            
            </div>
          </div>


        </div>
      </div>
    </div>


    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-8">
        
        <router-link to="/find-trade-ads">
          <button class="btn btn-neutral btn-lg col-sm-5">
            <h5><strong>View</strong> All Ads<br/>              
            <span><i class="fa fa-search mr-2"/></span>
            </h5>
          </button>
        </router-link>
        <router-link to="/post-trade-ads">
          <button class="btn btn-neutral btn-lg col-sm-5 float-right">
            <h5><strong>Post</strong> New Ad<br/>              
            <span><i class="fa fa-plus-square mr-2"/></span>
            </h5>
          </button>
        </router-link>
        </div>
      </div>
    </div>


    <div class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>My Wallet</strong></h5>
                  <hr/>
                  <div>
                  <router-link to="/my-wallet">
                  <div class="text-left">
                    <small><strong>
                      <span>
                        <i class="fa fa-bitcoin mr-2"/>
                      </span>Bitcoin Wallet</strong></small>
                    <h5><strong>{{wallet.BTC}}</strong>BTC<span class="float-right">></span></h5>
                  </div>
                  </router-link>
                  <hr/>
                  <router-link to="/my-wallet">
                  <div class="text-left">
                    <small><strong>
                      <span>
                        <i class="fa fa-bitcoin mr-2"/>
                      </span>Litecoin Wallet</strong></small>
                    <h5><strong>{{wallet.LTC}}</strong>LTC<span class="float-right">></span></h5>
                  </div>
                  </router-link>
                  <hr/>
                  <router-link to="/my-wallet">
                  <div class="text-left">
                    <small><strong>
                      <span>
                        <i class="fa fa-bitcoin mr-2"/>
                      </span>Ethereum Wallet</strong></small>
                    <h5><strong>{{wallet.ETH}}</strong>ETH<span class="float-right">></span></h5>
                  </div>
                  </router-link>

                  </div>
                </div>
            
            </div>
          </div>


        </div>
      </div>
    </div>


    <div class="container pt-lg-md">
      <div class="row justify-content-center">
        <div class="col-lg-8">
        
        <router-link to="/send-and-receive-coin">
          <button class="btn btn-neutral btn-lg col-sm-5">
            <h5><strong>Send</strong> Coins<br/>              
            <span><i class="fa fa-paper-plane mr-2"/></span>
            </h5>
          </button>
          </router-link>
          <router-link to="/send-and-receive-coin">
          <button class="btn btn-neutral btn-lg col-sm-5 float-right">
            <h5><strong>Receive</strong> Coins<br/>              
            <span><i class="fa fa-arrow-down mr-2"/></span>
            </h5>
          </button>
          </router-link>
        </div>
      </div>
    </div>

    </div>



  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

const btcSelling = process.env.VUE_APP_BTC_SELLING_PRICE;
const btcBuying = process.env.VUE_APP_BTC_BUYING_PRICE;
const ltcSelling = process.env.VUE_APP_LTC_SELLING_PRICE;
const ltcBuying = process.env.VUE_APP_LTC_BUYING_PRICE;
const ethSelling = process.env.VUE_APP_ETH_SELLING_PRICE;
const ethBuying = process.env.VUE_APP_ETH_BUYING_PRICE;

export default {
  name: "Dashboard",
  data() {
    return {
      coin: 'BTC',
      trans: 'Buy',
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
      wallet: {},
      trades: [],
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'getWallet',
      'getTradeAds', ]),
    changeCoin(coin){
      this.$store.commit('clearMessages');
      this.coin = coin;
    },
    changeTrans(trans){
      this.$store.commit('clearMessages');
      this.trans = trans;
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
    ...mapGetters(['getError', 'getUser']),
    verified(){
      return this.getUser.bvn && this.getUser.bvn.verified;
    },  
  },
  created(){
    this.getWallet();
    this.getProfile().then(() => {
      this.wallet = this.getUser.wallet || {
        BTC: '0.00', LTC: '0.00', ETH: '0.00'
      }
    });
    this.getTradeAds().then(res => {
      this.trades = res.data.trades || [];
    });
    this.$store.commit('clearMessages');
  }
    
};

</script>
<style>
</style>
