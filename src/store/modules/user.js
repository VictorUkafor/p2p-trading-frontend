import axios from 'axios';
import router from '../../router'

const token = localStorage.getItem('token');

const api = process.env.VUE_APP_BACKEND_API;

const state = {
    user: {},
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
            const res = await axios.get(`${api}/profile`,
            { headers: { Authorization: `Bearer ${token}`} });
            commit('setUser', res.data.user);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setAuth', false);
            commit('setError', e.response.data.errorMessage || 
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async addBVN({ commit }, body) {
        try{
            const res = await axios.post(`${api}/bvn`, body,
            { headers: { Authorization: `Bearer ${token}`} });
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.bvn_number[0] ||
            'Your request could not be process at this time, please try again later');
        }
    },
    async editBVN({ commit }, body) {
        try{
            const res = await axios.put(`${api}/bvn`, body,
            { headers: { Authorization: `Bearer ${token}`} });
            commit('setMessage', res.data.successMessage);
            console.log('wwwww', res.data);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.bvn_number[0] ||
            'Your request could not be process at this time, please try again later');
            console.log('wwwww', e.response.data);
        }
    },
    async sendOTP({ commit }) {
        try{
            const res = await axios.get(`${api}/bvn/send-otp`,
            { headers: { Authorization: `Bearer ${token}`} });
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
            const res = await axios.post(`${api}/bvn/send-otp`, body,
            { headers: { Authorization: `Bearer ${token}`} });
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