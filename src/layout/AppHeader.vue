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

      <ul class="navbar-nav navbar-nav-hover align-items-lg-center"/>
      <ul class="navbar-nav align-items-lg-center ml-lg-auto">
        <router-link to="/login">
          <li class="nav-item d-none d-lg-block ml-lg-4 btn btn-neutral btn-icon">
            <span class="btn-inner--icon">
              <i class="fa fa-sign-in mr-2"/>
            </span>
            <span class="nav-link-inner--text">Login</span>
          </li>
        </router-link>
      </ul>
    </base-nav>
  </header>
</template>
<script>
import BaseNav from "@/components/BaseNav";
import BaseDropdown from "@/components/BaseDropdown";
import CloseButton from "@/components/CloseButton";
import whiteLogo from '../../public/img/brand/white.png';
import blueLogo from '../../public/img/brand/blue.png';

export default {
  components: {
    BaseNav,
    CloseButton,
    BaseDropdown
  }
};
</script>
<style>
</style>
