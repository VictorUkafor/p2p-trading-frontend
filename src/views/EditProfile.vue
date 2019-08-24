<template>
  <section class="section section-shaped section-lg my-0">
    <div class="shape shape-style-1 bg-gradient-default">
    </div>



    <div v-if="getUser.id" class="container pt-lg-md">
        <div class="row justify-content-center">
          <div class="col-lg-8">
          <div class="card bg-secondary shadow">
            <div class="card-body px-lg-5 py-lg-5">

                <div class="text-center mb-10">
                  <h5><strong>Edit Profile</strong></h5>
                  <div class="text-center text-muted mb-4">
                  <small>You can only update field that are active</small>
                  </div>
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
                    role="alert">{{ getError }}</div>

                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-circle-08"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="firstName"
                        class="form-control"
                        type="text"
                        :placeholder=getUser.first_name
                        name="firstName"
                        aria-describedby="addon-right addon-left"
                        @keyup="firstNameValidate()">
                    </div>
                                        
                  </div>

                    <div v-if="errors.firstName" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.firstName }}</div>


                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-circle-08"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="lastName"
                        class="form-control"
                        type="text"
                        :placeholder=getUser.last_name
                        name="lastName"
                        aria-describedby="addon-right addon-left"
                        @keyup="lastNameValidate()">
                    </div>
                                        
                  </div>

                    <div 
                    v-if="errors.lastName" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.lastName }}</div>


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
                        :placeholder=getUser.email
                        aria-describedby="addon-right addon-left"
                        >
                    </div>
                                        
                  </div>


                  <div class="form-group input-group-alternative">
                    <div class="input-group-prepend">
                      <span class="input-group-text">
                        <slot name="addonLeft">
                          <i class="ni ni-calendar-grid-58"/>
                        </slot>
                      </span>
              
                      <input 
                        v-model="dateOfBirth"
                        class="form-control"
                        type="text"
                        :placeholder=reFormatDOB
                        name="dateOfBirth"
                        aria-describedby="addon-right addon-left"
                        @keyup="dobValidate()">
                    </div>
                                        
                  </div>

                    <div 
                    v-if="errors.dateOfBirth" 
                    class="alert alert-danger" 
                    role="alert">{{ errors.dateOfBirth }}</div>
                                

                  <div class="text-center" >
                                    
                    <button 
                      v-if="loading" 
                      disabled 
                      class="btn btn-neutral my-4">
                      <span class="spinner-border spinner-border-sm" 
                      role="status" aria-hidden="true"></span>
                      Loading . . .</button>

                      <button v-if="!loading" :disabled="!isValid" 
                      class="btn btn-default my-4">Update Profile</button>

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
import { validateName, validateDate } from '../lib/validations';


export default {
  name: "EditProfile",
  data() {
    return {
      firstName: '',
      lastName:'',
      dateOfBirth: '',
      isValid: false,
      loading: false,
      errors: {
        firstName: '',
        lastName: '',
        dateOfBirth: '',
      },
    };
  },
  methods: {
    ...mapActions([
      'getProfile', 'updateProfile'
    ]),
    firstNameValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateName(this.firstName, 'first name', false);
      this.errors.firstName = error;
      this.isValid = isValid;
     console.log('ddddd', this.firstName);
    },
    lastNameValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateName(this.lastName, 'last name', false);
      this.errors.lastName = error;
      this.isValid = isValid;
     console.log('ddddd', this.lastName);
    },
    dobValidate() {
      this.$store.commit('clearMessages');
      const { error, isValid } = validateDate(this.dateOfBirth, false);
      this.errors.dateOfBirth = error;
      this.isValid = isValid;
     console.log('ddddd', this.dateOfBirth);
    },
    initialState(){
      this.firstName = '';
      this.lastName = '';
      this.dateOfBirth = '';
      this.loading = false;
      this.isValid = false;
      this.errors = {
        firstName: '',
        lastName: '',
        dateOfBirth: ''
      }
    },
    formatDOB(date){
      const split = date.split('/');
      return `${split[2]}-${split[1]}-${split[0]}`;
    },
    processForm(){
      let status = true;

      if(status){
        this.firstNameValidate();
        status = this.isValid;
      }

      if(status){
        this.lastNameValidate();
        status = this.isValid;
      }

      if(status){
        this.dobValidate();
        status = this.isValid;
      }
            
      const body = {
        first_name: this.firstName.trim(),
        last_name: this.lastName.trim(),
        date_of_birth: !this.dateOfBirth.trim() ? 
        this.getUser.date_of_birth : 
        this.formatDOB(this.dateOfBirth.trim()),
      }


      if(status){  
        this.loading = true;    
        this.updateProfile(body)
        .then(() => this.initialState())
        .catch(() => this.initialState());
      }


    },
  },
  computed: {
    ...mapGetters(['getError', 'getMessage', 'getUser']),
    reFormatDOB(){
      const split = this.getUser.date_of_birth.split('-');
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
  },
  created(){
    this.getProfile();
  }
    
};

</script>
<style>
</style>
