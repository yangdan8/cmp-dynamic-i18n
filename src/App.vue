<template>
  <div id="app">
    <div id="lang">
      <div class="content">
        {{$t('reg_button_register')}}
      </div>
      <button @click="chooseLanguage('zh_cn')">cn</button>
      <button @click="chooseLanguage('en')">en</button>
      <button @click="chooseLanguage('in')">in</button>
    </div>
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { i18n, LangEnum, loadLanguageAsync } from './utils/lang';
import Cookies from 'js-cookie';

export default {
  name: 'app',
  mounted() {
    this.chooseLanguage(LangEnum.zhCn);
  },
  methods: {
    chooseLanguage(lang) {
      Cookies.set('lang', lang);
      loadLanguageAsync();
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
