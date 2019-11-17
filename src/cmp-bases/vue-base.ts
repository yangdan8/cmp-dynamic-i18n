import Vue from 'vue';
import { Mixins } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import { loadLangAsync } from '@/utils/lang';

export class VueBase extends Mixins(Vue) {
  /**
   * 国际化重写$t属性方法
   */
  public $t = function(
    this: VueBase,
    key: string,
    locale?: VueI18n.Locale | VueI18n.Values,
    values?: VueI18n.Values,
  ) {
    // tslint:disable-next-line:no-console
    console.warn(9999334334);
    // 之前的$t方法
    const $t = Vue.prototype.$t as typeof VueI18n.prototype.t;
    const { constructor } = this;
    const cmpName = constructor.name;
    const keyNew = `${cmpName}.${key}`;
    if (typeof locale === 'object' && locale) {
      return $t(keyNew, locale);
    }
    return $t(keyNew, locale!, values);
  };

  /**
   * 修改组件语言
   */
  public loadLangAsync() {
    loadLangAsync.call(this);
  }
}
