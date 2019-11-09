import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';
import kebabCase from 'lodash/kebabCase';

Vue.use(VueI18n);

export enum LangEnum {
  enUs = 'en',
  zhCn = 'zh_cn',
  jp = 'jp',
}

// 创建一个新的 VueI18n 实例
export const i18n = new VueI18n({
  silentTranslationWarn: true,
});

/**
 * 跟踪已经加载的组件名称.语言
 */
const loadedCmpLangs = [] as string[];

function loadCmpLangAsync(
  this: Vue,
  lang: LangEnum,
  deep: boolean = false,
  promises: Array<Promise<string>> = [],
) {
  const { constructor } = this;
  const cmpName = constructor.name;
  const cmpLang = `${cmpName}.${lang}`;
  if (!loadedCmpLangs.includes(cmpLang)) {
    const cmpNameLower = kebabCase(cmpName);
    const promise = import(
      /* webpackInclude: /\.i18n\.[a-z_]+\.ts$/ */
      /* webpackChunkName: `${lang}-[request]` */
      // tslint:disable-next-line: trailing-comma
      `@/locales/${lang}/${cmpNameLower}.i18n.ts`
    ).then((msg: { default: VueI18n.LocaleMessageObject }) => {
      const obj = msg.default;
      const keys = Object.keys(obj);
      keys.forEach((key: string) => {
        const keyNew = `${cmpName}.${key}`;
        obj[keyNew] = obj[key];
      });
      i18n.setLocaleMessage(lang, obj);
      loadedCmpLangs.push(cmpLang);
      return cmpLang;
    });
    promises.push(promise);
  }
  // 递归
  if (deep) {
    (this.$children || []).forEach((child: Vue) => {
      loadCmpLangAsync.call(child, lang, deep, promises);
    });
  }
  // 返回全部promise对象数组
  return promises;
}

/**
 * 用于更改语言的函数
 */
export function loadLangAsync(this: Vue, deep: boolean = false) {
  const lang = Cookies.get('lang') as LangEnum;
  if (i18n.locale === lang) {
    return Promise.resolve(lang);
  }

  const promises = loadCmpLangAsync.call(this, lang, deep);

  Promise.all(promises)
    .then(() => {
      // 将实际更改 vueI18n 实例、axios 以及其它需要本地化的地方
      i18n.locale = lang;
      // axios.defaults.headers.common['Accept-Lang'] = lang;
      Cookies.set('lang', lang);
    })
    .catch((err: Error) => {
      // tslint:disable-next-line: no-console
      console.error('加载组件语言失败！', err);
    });
}
