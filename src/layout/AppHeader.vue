<template>
  <header class="header-global">
    <base-nav 
      class="navbar-main" 
      transparent 
      type="" 
      effect="light" 
      expand>
      <router-link 
        slot="brand" 
        class="navbar-brand mr-lg-5" 
        to="/">
        <img 
          src="../assets/img/brand/white.png" 
          alt="logo">
      </router-link>

      <div 
        slot="content-header" 
        slot-scope="{closeMenu}" 
        class="row">
        <div class="col-6 collapse-brand">
          <a href="/">
            <img src="../assets/img/brand/blue.png">
          </a>
        </div>
        <div class="col-6 collapse-close">
          <close-button @click="closeMenu"/>
        </div>
      </div>

      <ul v-if="getAuth" class="navbar-nav navbar-nav-hover align-items-lg-center">
        <li class="nav-item">
                    <a href="/dashboard" class="nav-link">
                        <i class="ni ni-collection"></i>
                        <span class="nav-link-inner--text">Dashboard</span>
                    </a>
                </li>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-cart"></i>
                        <span class="nav-link-inner--text">Buy & Sell</span>
                    </a>
                    <router-link to="#" class="dropdown-item">Buy & Sell Coins</router-link>
                    <router-link to="#" class="dropdown-item">My Orders</router-link>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-chart-bar-32"></i>
                        <span class="nav-link-inner--text">Trade</span>
                    </a>
                    <router-link to="#" class="dropdown-item">Find Trade Ad</router-link>
                    <router-link to="#" class="dropdown-item">Post Trade Ad</router-link>
                    <router-link to="#" class="dropdown-item">My Trade Ads</router-link>
                    <router-link to="#" class="dropdown-item">My Trade Activity</router-link>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-credit-card"></i>
                        <span class="nav-link-inner--text">Wallet</span>
                    </a>
                    <router-link to="#" class="dropdown-item">Send & Recieve Coins</router-link>
                    <router-link to="#" class="dropdown-item">My Wallet</router-link>
                </base-dropdown>
                <base-dropdown tag="li" class="nav-item">
                    <a slot="title" href="#" class="nav-link" data-toggle="dropdown" role="button">
                        <i class="ni ni-single-02"></i>
                        <span class="nav-link-inner--text">Account</span>
                    </a>
                    <router-link to="#" class="dropdown-item">Edit Profile</router-link>
                    <router-link to="#" class="dropdown-item">Verify Identity</router-link>
                    <router-link to="#" class="dropdown-item">Bank Accounts and Cards</router-link>
                    <router-link to="#" class="dropdown-item">Security and Settings</router-link>
                </base-dropdown>
      </ul>

      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <router-link v-if="!getAuth" to="/login">
          <li class="btn btn-neutral">
            <span class="btn-inner--icon">
              <i class="fa fa-sign-in mr-2"/>
            </span>
            <span class="nav-link-inner--text">Login</span>
          </li>
        </router-link>
        <router-link v-if="getAuth" to="#">
          <li class="nav-item d-none d-lg-block ml-lg-4 btn btn-neutral btn-icon">
            <span class="btn-inner--icon">
              <i class="fa fa-sign-out mr-2"/>
            </span>
            <span class="nav-link-inner--text">Logout</span>
          </li>
        </router-link>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import { mapGetters } from 'vuex';
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";


export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  },
  computed: mapGetters(['getAuth']),
};
</script>
<style>
</style>
