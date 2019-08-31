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


    <div  v-if="getUser.id" class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <div class="btn-group d-flex" role="group">
                    <button @click="changeCoin('BTC')" :class="coin === 'BTC'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">BTC</button>
                    <button @click="changeCoin('LTC')" :class="coin === 'LTC'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">LTC</button>
                    <button @click="changeCoin('ETH')" :class="coin === 'ETH'? 'btn-basic': 'btn-default'"
                    class="btn w-100">ETH</button>
                  </div>
                  <hr/>
                  <div>
                  <div class="text-center">
                    <h5><strong :style="{ color: '#000' }">{{wallet[coin]}} {{coin}}</strong></h5>
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


export default {
  name: "Wallet",
  data() {
    return {
      wallet: {
        BTC: '0.00', 
        LTC: '0.00', 
        ETH: '0.00'
      },
      coin: 'BTC'
    };
  },
  methods: {
    ...mapActions(['getProfile', 'logOut', 'getWallet']),
    changeCoin(coin){
      this.coin = coin;
    }
  },
  mounted(){
    if(this.user.notifications.auto_logout){
      window.onbeforeunload = (e) => {
        this.logOut();
      }
    }
  },
  computed: mapGetters(['getError', 'getUser']),
  created(){
    this.getWallet();
    this.getProfile().then(() => {
      this.wallet = this.getUser.wallet ? this.getUser.wallet : {
        BTC: '0.00', LTC: '0.00', ETH: '0.00'
      }
    });
  }
    
};

</script>
<style>
</style>
