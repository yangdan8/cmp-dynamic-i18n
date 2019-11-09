import Vue from 'vue';
import VueI18n from 'vue-i18n';
import Cookies from 'js-cookie';

Vue.use(VueI18n);

export enum LangEnum {
  enUs = 'en',
  zhCn = 'zh_cn',
  in = 'in',
}

// const lang = Cookies.get('lang') || (LangEnum.zhCn as string);
// Cookies.set('lang', lang);

// 创建一个新的 VueI18n 实例
export const i18n = new VueI18n({
  silentTranslationWarn: true,
});

// const i18n = new VueI18n({
//   silentTranslationWarn: true,
//   locale: lang,
//   messages: {
//     'en-US': require('./assets/lang/en'),
//     'zh-CN': require('./assets/lang/zh-CN'),
//     'zh-TW': require('./assets/lang/zh-TW')
//   }
// });

/**
 * 跟踪我们加载的语言
 */
const loadedLanguages = [] as LangEnum[];

/**
 * 将实际更改 vueI18n 实例、axios 以及其它需要本地化的地方
 * @param lang 目标语言
 */
function setI18nLanguage(lang: LangEnum) {
  i18n.locale = lang;
  // axios.defaults.headers.common['Accept-Language'] = lang
  Cookies.set('lang', lang);
  return lang;
}

/**
 * 用于更改语言的函数
 * @param lang 目标语言
 */
export function loadLanguageAsync() {
  const lang = Cookies.get('lang') as LangEnum;
  if (i18n.locale === lang) {
    return Promise.resolve(lang);
  }
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  return import(
    /* webpackInclude: /\.ts$/ */
    /* webpackChunkName: `lang2-[request]` */
    // tslint:disable-next-line: trailing-comma
    `@/locales/${lang}.ts`
  ).then((msg: { default: VueI18n.LocaleMessageObject }) => {
    i18n.setLocaleMessage(lang, msg.default);
    loadedLanguages.push(lang);
    return setI18nLanguage(lang);
  });
}
