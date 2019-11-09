import { Component, Prop, Mixins } from 'vue-property-decorator';
import { VueBase } from '@/cmp-bases/vue-base';
import template from './hello-world.cmp.html';
import './hello-world.cmp.scss';

@Component({
  template,
})
export class HelloWorld extends Mixins(VueBase) {
  @Prop() private readonly msg!: string;
}
