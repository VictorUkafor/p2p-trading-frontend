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
                <button @click="changeTrans('active')"
                :class="trans === 'active'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Active
                </button>
                <button @click="changeTrans('inactive')" 
                :class="trans === 'inactive'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Inactive
                </button>
               
              </div>
                
              <div v-if="!verified" class="text mb-10">
                <hr/>
                <p><strong>You need to verify your identity.</strong> 
                  Visit the <strong>"Verify Identity"</strong> page and follow the instructions. 
                </p>
                <router-link to="/verify-identity">
                  <button class="btn btn-outline-default mb-sm-0">Verify Your Identity</button>
                </router-link> 
              </div>  

              <div v-if="trans === 'active' && trade.state !== 'public'" 
              v-for="trade in trades" :key="trade.id" class="text-left">
              <hr/>
                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                    {{trade.referenceNo}} - {{trade.type}} Trade
                  </span><br/>
                <span v-if="trade.min !== trade.max">{{trade.min}} - {{trade.max}}</span>
                <span v-if="trade.min === trade.max">{{trade.min}}</span>
                 {{trade.coin}}
                for {{trade.price}} NGN/{{trade.coin}}<br/>
                
                </strong></p>
              </div>

              <div v-if="trans === 'inactive' && trade.state === 'public'" 
              v-for="trade in trades" :key="trade.id" class="text-left">
              <hr/>
                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                    {{trade.referenceNo}} - {{trade.type}} Trade
                  </span><br/>
                {{trade.min}} - {{trade.max}} {{trade.coin}}
                for {{trade.price}} NGN/{{trade.coin}}<br/>
                </strong></p>
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
  name: "MyTrade",
  data() {
    return {
      trans: 'active',
      trades: [],
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut',
    ]),
    changeTrans(trans){
      this.$store.commit('clearMessages');
      this.trans = null;
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
    ...mapGetters(['getError', 'getUser', 'getMessage']),
    verified(){
      return this.getUser.bvn && this.getUser.bvn.verified;
    },
  },
  created(){
    this.$store.commit('clearMessages');
    this.getProfile()
    .then((res) => {
      this.trades = res.data.user.ads || [];
      });
  }
    
};

</script>
<style>
</style>
