<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
    </div>



    <div v-if="user.id" class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>Mail Us</strong></h5>
                  <hr/>
        
                <form 
                  role="form" 
                  method="post"
                  @submit.prevent="processForm">

                  <div 
                    v-if="getMessage" 
                    class="alert alert-success" 
                    role="alert">{{ getMessage }}</div>
                  <div 
                    v-if="getError" 
                    class="alert alert-danger" 
                    role="alert">{{ getError }}
                  </div>


                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-circle-08"/>
                        </slot>
                      </span>
              
                      <input 
                        class="form-control"
                        type="text"
                        disabled
                        :value="userName"
                        aria-describedby="addon-right addon-left"
                        >
                    </div>
                                        
                  </div>

                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-email-83"/>
                        </slot>
                      </span>
              
                      <input 
                        class="form-control"
                        type="text"
                        disabled
                        :value=user.email
                        aria-describedby="addon-right addon-left"
                        >
                    </div>
                                        
                  </div>


                  <div class="form-group input-group-alternative">
              
                      <input 
                        class="form-control"
                        type="text"
                        disabled
                        :value=formSubject
                        aria-describedby="addon-right addon-left"
                        >
                                        
                  </div>


                  <div class="form-group input-group-alternative">
                      <textarea 
                        v-model="message"
                        class="form-control"
                        placeholder="Enter your message"
                        name="message"
                        aria-describedby="addon-right addon-left"
                        ></textarea>                                        
                  </div>

                    <div 
                    v-if="errors.message" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.message }}
                    </div>

                              
                  <div class="text-center" >
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                      <button v-if="!loading" 
                      class="btn btn-default my-4">Send Message</button>

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
import { validateName } from '../lib/validations';


export default {
  name: "EditProfile",
  data() {
    return {
      message: '',
      file:'',
      isValid: false,
      loading: false,
      errors: {
        message: '',
        file: '',
      },
      user: {
        notifications: {},
      }
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'mailUs'
    ]),
    initialState(){
      this.message = '';
      this.file = '';
      this.loading = false;
      this.isValid = false;
      this.errors = {
        message: '',
        file: '',
      }
    },
    processForm(){
      this.$store.commit('clearMessages');
      
      const body = {
        name: this.getUser.first_name+' '+this.getUser.last_name,
        email: this.getUser.email,
        subject: this.formSubject,
        message: this.message ? this.message.trim() : 'Account Removal'
      }
      
      this.loading = true;    
        
      this.mailUs(body)
      .then(() => this.initialState())
      .catch(() => this.initialState());

    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
    userName(){
      return `${this.getUser.first_name} ${this.getUser.last_name}`;
    },
    formSubject(){
      if(this.$route.params.type === 'close account'){
        return "Account Removal";
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
  created(){
    this.getProfile().then(() => {
      this.user = this.getUser;
    }); 
    this.$store.commit('clearMessages');
  }
    
};

</script>
<style>
</style>
