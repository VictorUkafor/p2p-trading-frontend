import axios from 'axios';

const api = process.env.VUE_APP_BACKEND_API;

const state = {
    auth: localStorage.getItem('auth') || false,
    successMessage: '',
    errorMessage: '',
    resetToken: localStorage.getItem('resetToken') || false,
    activationToken: localStorage.getItem('activationToken') || false,
    authToken: localStorage.getItem('token') || null,
};

const getters = {
    getAuth: state => state.auth,
    getMessage: state => state.successMessage,
    getError: state => state.errorMessage,
    getResetToken: state => state.resetToken,
    getActToken: state => state.activationToken,
    getAuthToken: state => state.authToken,
};

const mutations = {
    setAuth: (state, auth) => (state.auth = auth),
    setMessage: (state, message) => (state.successMessage = message),
    setError: (state, error) => (state.errorMessage = error),
    clearMessages: (state) => {
        state.errorMessage = '';
        state.successMessage = '';
    },
    setResetToken: (state, token) => (state.resetToken = token),
    setActToken: (state, token) => (state.activationToken = token),
    setAuthToken: (state, token) => (state.authToken = token),
};

const actions = {
    async activateAccount({ commit }, body) {
        try{
            const res = await axios.post(`${api}/auth/account-activation/${body.token}`, body);
            commit('setMessage', res.data.successMessage);
            localStorage.removeItem('activationToken');
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async resetRequest({ commit }, body) {
        try{
            const res = await axios.post(`${api}/auth/password-reset/request`, body);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.email[0] || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async findResetToken({ commit }, token) {
        try{
            await axios.get(`${api}/auth/password-reset/find/${token}`);
            commit('setResetToken', true);
            localStorage.setItem('resetToken', true);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.email[0] || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async findActivationToken({ commit }, token) {
        try{
            await axios.get(`${api}/auth/find-token/${token}`);
            commit('setActToken', true);
            localStorage.setItem('activationToken', true);
            console.log('codecccc', token);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.email[0] || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async resetPassword({ commit }, body) {
        try{
            const res = await axios.post(`${api}/auth/password-reset/reset/${body.token}`, body);
            commit('setMessage', res.data.successMessage);
            localStorage.removeItem('resetToken');
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async registerUser({ commit }, body) {
        try{
            const res = await axios.post(`${api}/auth/register`, body);
            commit('setMessage', res.data.successMessage);
        } catch(e){
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors.email[0] || 
            'Your request could not be process at this time, please try again later');
        }
    },
    async loginUser({ commit }, body) {
        try{
            const res = await axios.post(`${api}/auth/login`, body);
            commit('setAuth', true);
            commit('setAuthToken', res.data.token);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('auth', true);
        } catch(e){
            commit('setAuth', false);
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors || 
            'Your request could not be process at this time, please try again later');
        }
    },
    logOut({ commit }){
        localStorage.clear();
        commit('setAuth', false);
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}