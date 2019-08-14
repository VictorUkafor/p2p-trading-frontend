import Vue from 'vue';
import App from './App';
import router from './router';
import Argon from "./plugins/argon-kit";
import store from './store';

Vue.config.productionTip = false;
Vue.use(Argon);

router.afterEach((to, from) => {
  Vue.nextTick( () => {
    document.title = to.meta.title ? to.meta.title : 'P2P Trading';
  });
})

new Vue({
  router,  
  store,
  render: h => h(App)
}).$mount("#app");
