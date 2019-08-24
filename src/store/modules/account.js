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
};


export default {
    state,
    getters,
    actions,
    mutations
}