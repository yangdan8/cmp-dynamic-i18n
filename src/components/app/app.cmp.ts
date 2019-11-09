import { Component, Mixins } from 'vue-property-decorator';
import { VueBase } from '@/cmp-bases/vue-base';
import { LangEnum, loadLangAsync } from '@/utils/lang';
import Cookies from 'js-cookie';
import template from './app.cmp.html';
import './app.cmp.scss';

@Component({
  name: 'app',
  template,
})
export class App extends Mixins(VueBase) {
  public chooseLanguage(lang: LangEnum) {
    Cookies.set('lang', lang);
    loadLangAsync.call(this, true);
  }

  private mounted() {
    this.chooseLanguage(LangEnum.zhCn);
  }
}
