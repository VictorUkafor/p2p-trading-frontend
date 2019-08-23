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
    user: localStorage.getItem('user') || {},
};

const getters = {
    getUser: state => state.user,
};

const mutations = {
    setUser: (state, user) => (state.user = user),
};

const actions = {
    async getProfile({ commit }) {
        try{
            const res = await axios.get(`${api}/profile`, headers);
            commit('setUser', res.data.user);
            localStorage.setItem('user', res.data.user);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setAuth', false);
            commit('setError', e.response.data.errorMessage || 
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async updateProfile({ commit }, body) {
        try{
            const res = await axios.put(`${api}/profile`, body, headers);
            commit('setUser', res.data.user);
            commit('setMessage', res.data.successMessage);
            localStorage.setItem('user', res.data.user);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || e.response.data.errors ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async addBVN({ commit }, body) {
        try{
            const res = await axios.post(`${api}/bvn`, body, headers);
            commit('setMessage', res.data.successMessage);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.bvn_number[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async editBVN({ commit }, body) {
        try{
            const res = await axios.put(`${api}/bvn`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
            return res;
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.bvn_number[0] ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async sendOTP({ commit }) {
        try{
            const res = await axios.get(`${api}/bvn/send-otp`, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.bvn_number[0] ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async verifyOTP({ commit }, body) {
        try{
            const res = await axios.post(`${api}/bvn/verify-otp`, body, headers);
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.bvn_number[0] ||
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