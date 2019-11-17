import Vue from 'vue';
import { Mixins, Component } from 'vue-property-decorator';
import VueI18n from 'vue-i18n';
import { loadLangAsync } from '@/utils/lang';

@Component
export class VueBase extends Mixins(Vue) {
  /**
   * 修改组件语言
   */
  public loadLangAsync() {
    loadLangAsync.call(this);
  }

  public created() {
    /**
     * 国际化重写$t属性方法
     */
    this.$t = (
      key: string,
      locale?: VueI18n.Locale | VueI18n.Values,
      values?: VueI18n.Values,
    ) => {
      // 之前的$t方法
      const $t = Vue.prototype.$t as typeof VueI18n.prototype.t;
      const { constructor } = this;
      const cmpName = constructor.name;
      const keyNew = `${cmpName}.${key}`;
      return $t.call(this, keyNew, locale as any, values);
    };
  }
}
