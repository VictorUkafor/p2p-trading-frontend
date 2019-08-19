<template>
    <section class="section section-shaped section-lg my-0">
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">

    <div class="card bg-secondary shadow">
        <div class="card-body px-lg-5 py-lg-5">

                        <template>
                            <div class="text-center text-muted mb-4">
                                <small>Please enter your email and password to login</small>
                            </div>
                            <form role="form" method="post" @submit.prevent="processForm">

                                <div v-if="successMessage" class="alert alert-success" role="alert">{{successMessage}}</div>
                                <div v-if="errorMessage" class="alert alert-danger" role="alert">{{errorMessage}}</div>
                                
                                <div class="form-group input-group-alternative">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <slot name="addonLeft">
                                                <i class="ni ni-email-83"></i>
                                                </slot>
                                                </span>
                                                <input 
                                        class="form-control"
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        v-model="email"
                                        @keyup="emailValidate()"
                                        aria-describedby="addon-right addon-left">
                                                </div>
                                        
                                    </div>

                                    <div v-if="errors.email" 
                                   class="alert alert-danger" 
                                   role="alert">{{errors.email}}</div>
                                    
                                <div class="form-group input-group-alternative">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <slot name="addonLeft">
                                                <i class="ni ni-lock-circle-open"></i>
                                                </slot>
                                                </span>
                                                <input 
                                        class="form-control"
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        v-model="password"
                                        @keyup="passwordValidate()"
                                        aria-describedby="addon-right addon-left">
                                                </div>
                                        
                                    </div>

                                  <div v-if="errors.password" 
                                   class="alert alert-danger" 
                                   role="alert">{{errors.password}}</div>
                                <div class="text-center">
                                    
                                    <button v-if="loading" disabled class="btn btn-primary my-4">Loading . . .</button>
                                    <button v-if="!loading" :disabled=noErrors() class="btn btn-primary my-4">Login</button>
                                </div>
                            </form>
                        </template>
            
        </div>
    </div>

                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import { validateEmail, validateName } from '../lib/validations';

const api = process.env.VUE_APP_BACKEND_API;

export default {
  data() {
    return {
        email: '',
        password: '',
        errors: {
            email: '',
            password: '',            
        },
        successMessage: '',
        errorMessage: '',
        isValid: false,
        loading: false,
    };
  },
  methods: {
        emailValidate() {
            this.errorMessage = '';
            this.successMessage = '';
            const { error, isValid } = validateEmail(this.email);
            this.errors.email = error;
            this.isValid = isValid;
        },
        passwordValidate() {
            this.errorMessage = '';
            this.successMessage = '';
            const { error, isValid } = validateName(this.password, 'password');
            this.errors.password = error;
            this.isValid = isValid;
        },
        setState(){
            this.email = '';
            this.password = '';
            this.loading = false;
            this.isValid = false;
            this.errorMessage = '';
            this.successMessage = '';
            this.errors = {
                email: '',
                password: '',
                };
        },
        submit() {
            this.loading = true;

            const body = {
                email: this.email.trim(),
                password: this.password.trim()
            }

            axios.post(`${process.env.VUE_APP_BACKEND_API}/auth/login`,
            body).then(res => {
                this.setState();
                this.successMessage = 'successfull';
                console.log(res);
            }).catch(e => {
                this.setState();
                this.successMessage = '';
                this.loading = false;
                this.errorMessage = e.response.data.errorMessage ||
                e.response.data.errors || 
                'Your request could not be process at this time, please try again later';
                console.log(e.response, 'errorsssss');
            })
        },
        processForm() {
            let status = true;

            if(status){
                this.emailValidate();
                status = this.isValid;
            }

            if(status){
                this.passwordValidate();
                status = this.isValid;
            }
            
            if(status){
                this.submit();
            }
 
        },
        noErrors(){
            return (!this.email || !this.password) || !this.isValid;
        }

    },
    
};

</script>
<style>
</style>
