import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import user from './modules/user';
import account from './modules/account';
import transfer from './modules/transfer';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    user,
    account,
    transfer
  }
});
