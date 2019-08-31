import axios from 'axios';

const token = localStorage.getItem('token');
const headers = { 
    headers: {
        'Authorization' : `Bearer ${token}`,
        'content-Type' : 'application/json',
    }
}

const api = process.env.VUE_APP_BACKEND_API;

const state = {};

const getters = {};

const mutations = {};

const actions = {
    async getWallet({ commit }) {
        try{
            const res = await axios.get(`${api}/wallet`, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.coin[0] ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async generateAddress({ commit }, body) {
        try{
            const res = await axios.post(`${api}/addresses`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.coin[0] ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async sendViaEmail({ commit }, body) {
        try{
            const res = await axios.post(`${api}/addresses/fund-with-username`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async sendViaAddress({ commit }, body) {
        try{
            const res = await axios.post(`${api}/addresses/fund-with-address`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            console.log('errorrrrr', e.response);
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');            
        }
    },
};


export default {
    state,
    getters,
    actions,
    mutations
}