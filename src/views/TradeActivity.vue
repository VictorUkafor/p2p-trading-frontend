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
                <button @click="changeTrans('in-progress')"
                :class="trans === 'in-progress'? 'btn-basic': 'btn-default'" 
                class="btn w-100">In Progress
                </button>
                <button @click="changeTrans('done')" 
                :class="trans === 'done'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Done
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

              <div v-if="trans === 'done'  && trade.clients.length
              && trade.clients[trade.clients.length - 1].status === 'completed'"
               v-for="trade in trades" :key="trade.id" class="text-left">
               <hr/>

                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                  {{trade.referenceNo}} - {{trade.type}}ing {{trade.coin}} 
                  </span><br/>
                {{trade.type}}ing {{trade.clients[trade.clients.length - 1].transaction.amount_in_coin}}
                {{trade.coin}} 
                for N{{trade.clients[trade.clients.length - 1].transaction.amount_in_cash}}<br/>
                <b>{{trade.type === 'Buy'? 'Sell': 'Buy'}}er:</b> 
                {{trade.clients[trade.clients.length - 1].user.email}}<br/>
                <b>Transaction status:</b> {{trade.clients[trade.clients.length - 1].status}}<br/>
                </strong></p>

              </div>  


              <div v-if="trans === 'in-progress'  && trade.clients.length
              && trade.clients[trade.clients.length - 1].status !== 'completed'"
               v-for="trade in trades" :key="trade.id" class="text-left">
               <hr/>

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

                <div class="btn-group d-flex  float-right" role="group">
                <button v-if="trade.clients[trade.clients.length - 1].status === 'pending' && 
                target.id !== trade.id && !loading" @click="approve(trade)"
                class="btn btn-default">
                Approve 
                </button>

                <button v-if="trade.clients[trade.clients.length - 1].status === 'pending' && 
                target.id !== trade.id && !loading" @click="cancel(trade)" 
                class="btn btn-outline-default">
                Cancel
                </button>
                </div>

                <div class="btn-group d-flex  float-right" role="group">             
                <button v-if="trade.clients[trade.clients.length - 1].status === 'paid' && 
                target.id !== trade.id && !loading" @click="confirmTrade(trade)"
                class="btn btn-default">
                Accept
                </button>

                <button v-if="trade.clients[trade.clients.length - 1].status === 'paid' && 
                target.id !== trade.id && !loading" @click="declineTrade(trade)"
                class="btn btn-outline-default">
                Reject
                </button>
                </div>

                <div class="btn-group d-flex  float-right" role="group"> 
                <button v-if="trade.clients[trade.clients.length - 1].status === 'approved' && 
                trade.user_id === getUser.id" 
                class="btn btn-default" disabled>
                Awaiting {{trade.type === 'Buy'? 'Seller\'s Deposit': 'Buyer\'s Payment'}}
                </button>
                </div>


                <span v-if="loading && target.id === trade.id && ((trade.type === 'Buy' &&
                trade.clients[trade.clients.length - 1].status === 'paid') ||
                (trade.type === 'Buy' && rejection) ||
                trade.clients[trade.clients.length - 1].status === 'pending')"
                class="spinner-border spinner-border-sm float-right" 
                role="status" aria-hidden="true">
                </span>


                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                  {{trade.referenceNo}} - {{trade.type}}ing {{trade.coin}} 
                  </span><br/>
                {{trade.type}}ing {{trade.clients[trade.clients.length - 1].transaction.amount_in_coin}}
                {{trade.coin}} 
                for N{{trade.clients[trade.clients.length - 1].transaction.amount_in_cash}}<br/>
                <b>Intending {{trade.type === 'Buy'? 'sell': 'buy'}}er:</b> 
                {{trade.clients[trade.clients.length - 1].user.email}}<br/>
                <b>Transaction status:</b> {{trade.clients[trade.clients.length - 1].status}}<br/>
                </strong></p>


                <form 
                  v-if="trade.clients[trade.clients.length - 1].status === 'paid'
                  && (trade.type === 'Sell' || (trade.type === 'Buy' && rejection)) && 
                  target.id === trade.id"
                  role="form" 
                  method="post" 
                  @submit.prevent="processPay">  

                  <div 
                    v-if="error || getError" 
                    class="alert alert-danger" 
                    role="alert">{{ error || getError }}
                  </div>

                  <div 
                    v-if="getMessage" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}
                  </div>
                                
                  <div class="form-group input-group-alternative">
                    <input 
                      v-if="!loading"
                      v-model="cardNumber"
                      class="form-control"
                      type="text"
                      placeholder="Enter your card number and hit Enter"
                      name="cardNumber"
                      aria-describedby="addon-right addon-left"
                      @keyup="cardValidate()">                                        
                  </div>
                                    
                  <div class="text-center">              
                    <span v-if="loading" 
                    class="spinner-border spinner-border-sm" 
                    role="status" aria-hidden="true">
                    </span>
                  </div>

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


export default {
  name: "TradeActivity",
  data() {
    return {
      trans: 'in-progress',
      cardNumber: '',
      isValid: false,
      target: '',
      error: '',
      rejection: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'approveTrade',
      'cancelTrade', 'confirmPayment', 'confirmDeposit', 
      'rejectCoin', 'rejectPayment', 'refundBalance'
    ]),
    cardValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = 
      validateNumber(this.cardNumber, 'card number');      
      this.error = error;
      this.isValid = isValid;
    },
    setState(){
      this.isValid = false;
      this.error = ''
      this.loading = false;
    },
    changeTrans(trans){
      this.$store.commit('clearMessages');
      this.setState();
      this.trans = null;
      this.trans = trans;
    },
    approve(target){
      this.$store.commit('clearMessages');
      this.cardNumber = '';
      this.target = target;

      const body = {
        ad_id: this.target.id,
        client_id: this.target.clients[this.target.clients.length - 1].id,
      } 

        this.loading = true;
        this.approveTrade(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);

    },
    cancel(target){
      this.$store.commit('clearMessages');
      this.cardNumber = '';
      this.target = target;

      const body = {
        ad_id: this.target.id,
        client_id: this.target.clients[this.target.clients.length - 1].id,
      } 

        this.loading = true;
        this.cancelTrade(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);

    },
    confirmTrade(target){
      this.$store.commit('clearMessages');
      this.cardNumber = '';
      this.target = target;
      if(this.target.type === 'Buy'){

        const body = {
          ad_id: this.target.id,
          client_id: this.target.clients[this.target.clients.length - 1].id,
        } 

        this.loading = true;
        this.confirmPayment(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);

      }
    },
    declineTrade(target){
      this.$store.commit('clearMessages');
      this.cardNumber = '';
      this.target = target;

      if(this.target.type === 'Sell'){

        const body = {
          ad_id: this.target.id,
          client_id: this.target.clients[this.target.clients.length - 1].id,
        } 

        this.loading = true;
        this.rejectPayment(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);

      }
    },
    processPay(){
      let status = true;

      if(status){
        this.cardValidate();
        status = this.isValid;
      }

      const body = {
        ad_id: this.target.id,
        client_id: this.target.clients[this.target.clients.length - 1].id,
        card: this.cardNumber.trim(),
      }  
      
      if(status && this.target.type === 'Sell'){
        this.loading = true;
        this.confirmDeposit(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);
      }

      if(status && this.target.type === 'Buy' && this.rejection){
        this.loading = true;
        this.rejectCoin(body)
        .then(() => this.refundBalance(body)
        .then(() => this.setState()))
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
    trades(){
      return this.getUser.ads || [];
    },
  },
  created(){
    this.$store.commit('clearMessages');
    this.getProfile();
  }
    
};

</script>
<style>
</style>
