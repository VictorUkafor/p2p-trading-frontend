import Vue from 'vue';
import Router from 'vue-router';
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import Landing from '../views/Landing';
import Register from '../views/Register';
import AccountActivation from '../views/AccountActivation';

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: "active",
  routes: [
    {
      path: '/',
      name: "landing",
      components: {
        header: AppHeader,
        default: Landing,
        footer: AppFooter
      },
      meta: {
        title: 'Get Started - P2P Trading',
      },
    },
      {
        path: '/register',
        name: "register",
        components: {
          header: AppHeader,
          default: Register,
          footer: AppFooter
        },
      meta: {
        title: 'Register - P2P Trading',
      }
    },
    {
      path: '/account-activation/:token',
      name: "activation",
      components: {
        header: AppHeader,
        default: AccountActivation,
        footer: AppFooter
      },
    meta: {
      title: 'Account Activation - P2P Trading',
    }
  },

  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});
