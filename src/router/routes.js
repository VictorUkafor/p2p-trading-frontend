import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import Landing from '../views/Landing';
import Register from '../views/Register';
import AccountActivation from '../views/AccountActivation';
import Login from '../views/Login';
import ResetRequest from '../views/ResetRequest';
import ResetPassword from '../views/ResetPassword';


export default [
  {
    path: '/',
    name: 'landing',
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
    name: 'register',
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
    name: 'account-activation',
    components: {
      header: AppHeader,
      default: AccountActivation,
      footer: AppFooter
    },
    meta: {
      title: 'Account Activation - P2P Trading',
    }
  },
  {
    path: '/login',
    name: 'login',
    components: {
      header: AppHeader,
      default: Login,
      footer: AppFooter
    },
    meta: {
      title: 'Login - P2P Trading',
    } 
  },
  {
    path: '/password-reset/request',
    name: 'reset-request',
    components: {
      header: AppHeader,
      default: ResetRequest,
      footer: AppFooter
    },
    meta: {
      title: 'Password Reset Request - P2P Trading',
    },
  },
  {
    path: '/password-reset/:token',
    name: 'reset-password',
    components: {
      header: AppHeader,
      default: ResetPassword,
      footer: AppFooter
    },
    meta: {
      title: 'Password Reset Process - P2P Trading',
    },
  }
];