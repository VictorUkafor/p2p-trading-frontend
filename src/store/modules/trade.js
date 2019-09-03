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
    async getTradeAds() {
        try{
            const res = await axios.get(`${api}/ads/all/trades`, headers);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            console.log('wwwww', e.response.data);
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
            
        }
    },
    async engageTradeAd({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.id}/engage`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            console.log('error form vvvv', e.response.data);
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async postBuyTrade({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/buy`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            console.log('error form vvvv', e.response.data);
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
            
        }
    },
    async postSellTrade({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/sell`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
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