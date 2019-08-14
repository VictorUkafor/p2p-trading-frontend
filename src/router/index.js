import Vue from 'vue';
import Router from 'vue-router';
import LandingPage from '@/components/LandingPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage,
      title: 'Get Started - P2P Trading',
      metaTags: [
        {
          name: 'description',
          content: 'Let\'s get you started',
        },
      ],
    },
  ],

  mode: 'history',
});
