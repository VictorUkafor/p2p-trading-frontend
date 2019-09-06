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
                <button @click="changeTrans('pending')"
                :class="trans === 'pending'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Pending
                </button>
                <button @click="changeTrans('completed')" 
                :class="trans === 'completed'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Completed
                </button>
                <button @click="changeTrans('failed')" 
                :class="trans === 'failed'? 'btn-basic': 'btn-default'" 
                class="btn w-100">Failed
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

              <div v-if="trans === 'completed' && order.status === 'completed'"
               v-for="order in orders" :key="order.id" class="text-left">
               <hr/>
                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                  {{order.ad.referenceNo}} - {{order.ad.type === 'Buy' ? 'Sell': 'Buy'}}ing 
                  {{order.transaction.coin}} 
                  </span><br/>
                {{order.ad.type}}ing {{order.transaction.amount_in_coin}}{{order.transaction.coin}} 
                for N{{order.transaction.amount_in_cash}}<br/>
                <b>Creator:</b> {{order.ad.creator.email}}<br/>
                <b>Transaction status:</b> {{order.status}}<br/>
                </strong></p>                
              </div>  

              <div v-if="trans === 'pending' && (order.status === 'pending' || 
              order.status === 'approved' || order.status === 'paid')"
               v-for="order in orders" :key="order.id" class="text-left">
             <hr/>


                  <div 
                    v-if="getError && target.id === order.id" 
                    class="alert alert-danger" 
                    role="alert">{{ getError }}
                  </div>

                  <div 
                    v-if="getMessage && target.id === order.id" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}
                  </div>

                <button v-if="order.status === 'approved' && 
                target.id !== order.id" @click="approvedAction(order)" 
                class="btn btn-default mb-sm-0 float-right">
                {{order.ad.type === 'Buy' ? 'Transfer Coin': 'Make Payment'}}
                </button>

                <button v-if="order.status === 'paid' && 
                getUser.id === order.user_id" disabled
                class="btn btn-default mb-sm-0 float-right">
                Awaiting Confirmation
                </button>

                <span v-if="loading && order.ad.type === 'Buy' && 
                target.id === order.id" 
                class="spinner-border spinner-border-sm float-right" 
                role="status" aria-hidden="true">
                </span>

                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                  {{order.ad.referenceNo}} - {{order.ad.type === 'Buy' ? 'Sell' : 'Buy'}}ing 
                  {{order.transaction.coin}} 
                  </span><br/>
                {{order.ad.type === 'Buy' ? 'Sell' : 'Buy'}}ing 
                {{order.transaction.amount_in_coin}}{{order.transaction.coin}} 
                for N{{order.transaction.amount_in_cash}}<br/>
                <b>Creator:</b> {{order.ad.creator.email}}<br/>
                <b>Transaction status:</b> {{order.status}}<br/>
                </strong></p>

                <form 
                  v-if="order.status === 'approved'
                  && order.ad.type === 'Sell' && target.id === order.id"
                  role="form" 
                  method="post" 
                  @submit.prevent="processTransfer">  

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

              <div v-if="trans === 'failed' && (order.status === 'cancelled' || 
              order.status === 'declined' || order.status === 'refund')"
               v-for="order in orders" :key="order.id" class="text-left">
              <hr/>

                <button v-if="order.status === 'declined' && 
                target.id !== order.id" @click="refundAction(order)" 
                class="btn btn-default mb-sm-0 float-right">
                {{order.ad.type === 'Buy'? 'Refund Coin': 'Refund Payment'}}
                </button>

                <span v-if="loading && order.ad.type === 'Buy' && 
                target.id !== order.id" 
                class="spinner-border spinner-border-sm" 
                role="status" aria-hidden="true">
                </span>

                <p><strong>
                  <span :style="{ fontWeight: 'bold' }">
                  {{order.ad.referenceNo}} - {{order.ad.type === 'Buy'? 'Sell': 'Buy'}}ing 
                  {{order.transaction.coin}} 
                  </span><br/>
                {{order.ad.type === 'Buy'? 'Sell': 'Buy'}}ing 
                {{order.transaction.amount_in_coin}}{{order.transaction.coin}} 
                for N{{order.transaction.amount_in_cash}}<br/>
                <b>Creator:</b> {{order.ad.creator.email}}<br/>
                <b>Transaction status:</b> {{order.status}}<br/>
                </strong></p>

                <form 
                  v-if="order.status === 'declined'
                  && order.ad.type === 'Sell' && target.id === order.id"
                  role="form" 
                  method="post" 
                  @submit.prevent="processRefund">  

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
  name: "Order",
  data() {
    return {
      trans: 'pending',
      cardNumber: '',
      target: '',
      isValid: false,
      error: '',
      loading: false,
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'logOut', 'makePayment',
      'depositCoin', 'refundPayment', 'refundCoin'
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
    approvedAction(target){
      this.$store.commit('clearMessages');
      this.cardNumber = '';
      this.target = target;

      if(this.target.ad.type === 'Buy'){

        const body = {
          ad_id: this.target.ad.id,
          client_id: this.target.id,
        } 

        this.loading = true;
        this.depositCoin(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);

      }

    },
    refundAction(target){
      this.$store.commit('clearMessages');
      this.cardNumber = '';
      this.target = target;

      if(this.target.ad.type === 'Buy'){

        const body = {
          ad_id: this.target.ad.id,
          client_id: this.target.id,
        } 

        this.loading = true;
        this.refundCoin(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);

      }

    },
    processTransfer(){
      let status = true;

      if(status){
        this.cardValidate();
        status = this.isValid;
      }

      const body = {
        ad_id: this.target.ad.id,
        client_id: this.target.id,
        card: this.cardNumber.trim(),
      }  
      
      
      if(status){
        this.loading = true;
        this.makePayment(body)
        .then(() => this.setState())
        .catch(() => this.loading = false);
      }


    },
    processRefund(){
      let status = true;

      if(status){
        this.cardValidate();
        status = this.isValid;
      }

      const body = {
        ad_id: this.target.ad.id,
        client_id: this.target.id,
        card: this.cardNumber.trim(),
      }  
      
      
      if(status){
        this.loading = true;
        this.refundPayment(body)
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
    orders(){
      return this.getUser.clients || [];
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
