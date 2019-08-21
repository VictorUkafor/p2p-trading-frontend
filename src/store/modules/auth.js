import axios from 'axios';
import router from '../../router'

const api = process.env.VUE_APP_BACKEND_API;

const state = {
    auth: false,
    successMessage: '',
    errorMessage: '',
    page: '',
};

const getters = {
    getAuth: state => state.auth,
    getMessage: state => state.successMessage,
    getError: state => state.errorMessage,
    getPage: state => state.page,
};

const mutations = {
    setAuth: (state, auth) => (state.auth = auth),
    setMessage: (state, message) => (state.successMessage = message),
    setError: (state, error) => (state.errorMessage = error),
    clearMessages: (state) => {
        state.errorMessage = '';
        state.successMessage = '';
    },
    setPage: (state, page) => (state.page = page),
};

const actions = {
    async loginUser({ commit }, body) {
        try{
            const res = await axios.post(`${api}/auth/login`, body);
            console.log(res.data);
            commit('setAuth', true);
            commit('setPage', 'dashboard');
            localStorage.setItem('token', res.data.token);
            router.push('/dashboard');
        } catch(e){
            console.log(e.response.data);
            commit('setAuth', false);
            commit('setError', e.response.data.errorMessage || 
            e.response.data.errors || 
            'Your request could not be process at this time, please try again later');
        }
    },
    logOut({ commit }){
        localStorage.removeItem('token');
        commit('setAuth', false);
        router.push('/login');
    }
};


export default {
    state,
    getters,
    actions,
    mutations
}