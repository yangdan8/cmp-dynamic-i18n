import Vue, { CreateElement } from 'vue';
import App from '@/components/app';
import router from './router';
import store from './store';
import { i18n } from './utils/lang';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h: CreateElement) => h(App),
}).$mount('#app');
