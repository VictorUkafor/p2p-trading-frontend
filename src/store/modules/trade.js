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
    async getTradeAds({ commit }) {
        try{
            const res = await axios.get(`${api}/ads/all/trades`, headers);
            return res;
        } catch(e){
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
            
        }
    },
    async engageTradeAd({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.id}/engage`, body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async postBuyTrade({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/buy`, body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
            
        }
    },
    async postSellTrade({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/sell`, body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async makePayment({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/make-payment/${body.client_id}`, 
            body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || e.response.data.errors.card[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async depositCoin({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/deposit-coin/${body.client_id}`, 
            {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async refundPayment({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/refund-payment/${body.client_id}`, 
            body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || e.response.data.errors.card[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async refundCoin({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/refund-coin/${body.client_id}`, 
            {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async approveTrade({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/approve/${body.client_id}`, 
            {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async cancelTrade({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/decline/${body.client_id}`, 
            {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async confirmPayment({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/confirm-payment/${body.client_id}`, 
            {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async confirmDeposit({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/confirm-coin/${body.client_id}`, 
            body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || e.response.data.errors.card[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async rejectCoin({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/reject-coin/${body.client_id}`, 
            body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || e.response.data.errors.card[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async rejectPayment({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/reject-payment/${body.client_id}`, 
            {}, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async refundBalance({ commit }, body) {
        try{
            const res = await axios.post(`${api}/ads/${body.ad_id}/refund-balance/${body.client_id}`, 
            body, headers);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || e.response.data.errors.card[0] ||
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