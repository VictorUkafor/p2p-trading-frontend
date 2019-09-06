import axios from 'axios';

const token = localStorage.getItem('token');
const headers = { 
    headers: {
        'Authorization' : `Bearer ${token}`,
        'Content-Type' : 'application/json',
    }
}

const api = process.env.VUE_APP_BACKEND_API;

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async addAccount({ commit }, body) {
        try{
            const res = await axios.post(`${api}/bank-accounts`, body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.account_number[0] ||
            e.response.data.errors.internet_banking[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async updateAccount({ commit }, id) {
        try{
            const res = await axios.put(`${api}/bank-accounts/${id}`, {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async getAccounts() {
        try{
            const res = await axios.get(`${api}/bank-accounts`, headers);
            return res;
        } catch(e){
        }
    },
    async remove2Fa() {
        try{
            const res = await axios.get(`${api}/settings/remove-2fa`, headers);
            return res;
        } catch(e){
        }
    },
    async sms2Fa({ commit }) {
        try{
            const res = await axios.get(`${api}/settings/sms-2fa`, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
        }
    },
    async setSMS2fa({ commit }, body) {
        try{
            const res = await axios.post(`${api}/settings/set-sms-2fa`, body, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
        }
    },
    async emailNotification() {
        try{
            const res = await axios.post(`${api}/notifications/email`, {}, headers);
            return res;
        } catch(e){
        }
    },
    async pushNotification() {
        try{
            const res = await axios.post(`${api}/notifications/push`, {}, headers);
            return res;
        } catch(e){
        }
    },
    async autoLogout() {
        try{
            const res = await axios.post(`${api}/notifications/auto-logout`, {}, headers);
            return res;
        } catch(e){
        }
    },
    async google2Fa() {
        try{
            const res = await axios.get(`${api}/settings/google-2fa`, headers);
            return res;
        } catch(e){
        }
    },
    async setGoogle2fa({ commit }, body) {
        try{
            const res = await axios.post(`${api}/settings/set-google-2fa`, body, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
        }
    },
    async mailUs({ commit }, body) {
        try{
            const res = await axios.post(`${api}/mail-us`, body, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
        }
    },
    async createMockAccount({ commit }, body) {
        try{
            const res = await axios.post(`${api}/banks`, body, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage);
        }
    },
    async getMockAccounts() {
        try{
            const res = await axios.get(`${api}/banks`, headers);
            return res;
        } catch(e){
        }
    },
    async fundMock({ commit }, body) {
        try{
            const res = await axios.post(`${api}/banks/${body.account_number}`, body, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.amount[0]);
        }
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}