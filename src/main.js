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
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.getAuth) {
      next({
        path: '/dashboard',
      })
    } else {
      next()
    }
  } 
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.getAuth) {
      next({
        path: '/login',
      })
    } else {
      next()
    }
  }
  else {
    next() 
  }
})

new Vue({
  router,  
  store,
  render: h => h(App)
}).$mount("#app");
