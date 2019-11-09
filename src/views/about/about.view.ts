import { Component, Mixins } from 'vue-property-decorator';
import { VueBase } from '@/cmp-bases/vue-base';
import template from './about.view.html';

@Component({
  name: 'home',
  template,
})
export class About extends Mixins(VueBase) {}
