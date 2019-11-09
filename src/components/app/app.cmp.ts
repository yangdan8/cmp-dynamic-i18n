import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { LangEnum, loadLanguageAsync } from '@/utils/lang';
import Cookies from 'js-cookie';
import template from './app.cmp.html';
import './app.cmp.scss';

@Component({
  name: 'app',
  template,
})
export class App extends Vue {
  public chooseLanguage(lang: LangEnum) {
    Cookies.set('lang', lang);
    loadLanguageAsync();
  }

  private mounted() {
    this.chooseLanguage(LangEnum.zhCn);
  }
}
