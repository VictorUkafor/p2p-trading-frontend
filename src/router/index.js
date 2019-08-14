import Vue from 'vue';
import Router from 'vue-router';
import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import Landing from '../views/Landing';

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
        title: 'P2P Trading - Get Started',
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
