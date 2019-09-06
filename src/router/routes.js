import AppHeader from "../layout/AppHeader";
import AppFooter from "../layout/AppFooter";
import Landing from '../views/Landing';
import Register from '../views/Register';
import AccountActivation from '../views/AccountActivation';
import Login from '../views/Login';
import ForgotPassword from '../views/ForgotPassword';
import ResetPassword from '../views/ResetPassword';
import Dashboard from '../views/Dashboard';
import VerifyIdentity from '../views/VerifyIdentity';
import EditProfile from '../views/EditProfile';
import BankAccount from '../views/BankAccount';
import Settings from '../views/Settings';
import MailUs from '../views/MailUs';
import MockAccount from '../views/MockAccount';
import TwoFactor from '../views/TwoFactor';
import Wallet from '../views/Wallet';
import SendCoin from '../views/SendCoin';
import PostTrade from '../views/PostTrade';
import FindTrade from '../views/FindTrade';
import BuyCoin from '../views/BuyCoin';
import Order from '../views/Order';
import MyTrade from '../views/MyTrade';
import TradeActivity from '../views/TradeActivity';


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
      title: 'Get Started | P2P Trading',
      requiresVisitor: true,
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
      title: 'Register | P2P Trading',
      requiresVisitor: true,
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
      title: 'Account Activation | P2P Trading',
      requiresVisitor: true,
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
      requiresVisitor: true,
    } 
  },
  {
    path: '/2fa-login/:type',
    name: '2fa-login',
    components: {
      header: AppHeader,
      default: TwoFactor,
      footer: AppFooter
    },
    meta: {
      title: 'Two Factor Login - P2P Trading',
      requiresVisitor: true,
    } 
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    components: {
      header: AppHeader,
      default: ForgotPassword,
      footer: AppFooter
    },
    meta: {
      title: 'Password Reset Request | P2P Trading',
      requiresVisitor: true,
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
      title: 'Password Reset Process | P2P Trading',
      requiresVisitor: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    components: {
      header: AppHeader,
      default: Dashboard,
      footer: AppFooter
    },
    meta: {
      title: 'Dashboard | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/verify-identity',
    name: 'verify-identity',
    components: {
      header: AppHeader,
      default: VerifyIdentity,
      footer: AppFooter
    },
    meta: {
      title: 'Verify Identity | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/edit-profile',
    name: 'edit-profile',
    components: {
      header: AppHeader,
      default: EditProfile,
      footer: AppFooter
    },
    meta: {
      title: 'Edit Profile | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/bank-accounts',
    name: 'bank-accounts',
    components: {
      header: AppHeader,
      default: BankAccount,
      footer: AppFooter
    },
    meta: {
      title: 'Bank Account | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/security-and-settings',
    name: 'settings',
    components: {
      header: AppHeader,
      default: Settings,
      footer: AppFooter
    },
    meta: {
      title: 'Security and Settings | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/mail-us/:type',
    name: 'mail-us',
    components: {
      header: AppHeader,
      default: MailUs,
      footer: AppFooter
    },
    meta: {
      title: 'Mail Us | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/mock-accounts',
    name: 'mock-accounts',
    components: {
      header: AppHeader,
      default: MockAccount,
      footer: AppFooter
    },
    meta: {
      title: 'Mock Account | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/my-wallet',
    name: 'my-wallet',
    components: {
      header: AppHeader,
      default: Wallet,
      footer: AppFooter
    },
    meta: {
      title: 'My Wallet | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/send-and-receive-coin',
    name: 'send-coin',
    components: {
      header: AppHeader,
      default: SendCoin,
      footer: AppFooter
    },
    meta: {
      title: 'Send and Receive Coin | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/post-trade-ads',
    name: 'post-trade',
    components: {
      header: AppHeader,
      default: PostTrade,
      footer: AppFooter
    },
    meta: {
      title: 'Post Trade Ads | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/find-trade-ads',
    name: 'find-trade',
    components: {
      header: AppHeader,
      default: FindTrade,
      footer: AppFooter
    },
    meta: {
      title: 'Find Trade Ads | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/buy-and-sell-coin',
    name: 'buy-coin',
    components: {
      header: AppHeader,
      default: BuyCoin,
      footer: AppFooter
    },
    meta: {
      title: 'Buy and Sell Coin | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/my-orders',
    name: 'my-orders',
    components: {
      header: AppHeader,
      default: Order,
      footer: AppFooter
    },
    meta: {
      title: 'My Orders | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/my-trades',
    name: 'my-trades',
    components: {
      header: AppHeader,
      default: MyTrade,
      footer: AppFooter
    },
    meta: {
      title: 'My Trade Ads | P2P Trading',
      requiresAuth: true,
    },
  },
  {
    path: '/my-trade-activity',
    name: 'my-activity',
    components: {
      header: AppHeader,
      default: TradeActivity,
      footer: AppFooter
    },
    meta: {
      title: 'My Trade Activity | P2P Trading',
      requiresAuth: true,
    },
  }
];