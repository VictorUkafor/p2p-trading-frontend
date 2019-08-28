import axios from 'axios';

const token = localStorage.getItem('token');
const headers = { 
    headers: {
        'Authorization' : `Bearer ${token}`,
        'content-Type' : 'application/json',
    }
}

const api = process.env.VUE_APP_BACKEND_API;

const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
    async addAccount({ commit }, body) {
        try{
            const res = await axios.post(`${api}/bank-accounts`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.account_number[0] ||
            e.response.data.errors.internet_banking[0] ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async updateAccount({ commit }, id) {
        try{
            const res = await axios.put(`${api}/bank-accounts/${id}`, {}, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async getAccounts() {
        try{
            const res = await axios.get(`${api}/bank-accounts`, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
        }
    },
    async remove2Fa() {
        try{
            const res = await axios.get(`${api}/settings/remove-2fa`, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
        }
    },
    async sms2Fa({ commit }) {
        try{
            const res = await axios.get(`${api}/settings/sms-2fa`, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
            console.log('wwwww', e.response.data);
        }
    },
    async setSMS2fa({ commit }, body) {
        try{
            const res = await axios.post(`${api}/settings/set-sms-2fa`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
            console.log('wwwww', e.response.data);
        }
    },
    async emailNotification() {
        try{
            const res = await axios.post(`${api}/notifications/email`, {}, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
        }
    },
    async pushNotification() {
        try{
            const res = await axios.post(`${api}/notifications/push`, {}, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
        }
    },
    async autoLogout() {
        try{
            const res = await axios.post(`${api}/notifications/auto-logout`, {}, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
        }
    },
    async google2Fa() {
        try{
            const res = await axios.get(`${api}/settings/google-2fa`, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
        }
    },
    async setGoogle2fa({ commit }, body) {
        try{
            const res = await axios.post(`${api}/settings/set-google-2fa`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
            console.log('wwwww', e.response.data);
        }
    },
    async mailUs({ commit }, body) {
        try{
            const res = await axios.post(`${api}/mail-us`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
            console.log('wwwww', e.response.data);
        }
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}