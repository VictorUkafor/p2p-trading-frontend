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

                <div v-if="verified" class="text-center mb-10">
                  <div class="btn-group d-flex" role="group">
                    <button @click="changeCoin('BTC')" :class="coin === 'BTC'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">BTC</button>
                    <button @click="changeCoin('LTC')" :class="coin === 'LTC'? 'btn-basic': 'btn-default'" 
                    class="btn w-100">LTC</button>
                    <button @click="changeCoin('ETH')" :class="coin === 'ETH'? 'btn-basic': 'btn-default'"
                    class="btn w-100">ETH</button>
                  </div>
                  
                  <div>
                    <hr/>
                  <div class="text-center">
                    <h5><strong :style="{ color: '#000' }">{{wallet[coin]}} {{coin}}</strong></h5>
                  </div>
                  </div>
                </div>

                <div v-if="!verified" class="text mb-10">
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

  </section>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';


export default {
  name: "Wallet",
  data() {
    return {
      coin: 'BTC'
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut',
      'getWallet'
    ]),
    changeCoin(coin){
      this.coin = coin;
    }
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
    wallet(){
      return this.getUser.wallet || {}
    },
  },
  created(){
    this.$store.commit('clearMessages');
    this.getWallet();
    this.getProfile();
  }   
};

</script>
<style>
</style>
