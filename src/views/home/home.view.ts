import { Component, Mixins } from 'vue-property-decorator';
import { VueBase } from '@/cmp-bases/vue-base';
import HelloWorld from '@/components/hello-world';
import template from './home.view.html';

@Component({
  name: 'home',
  template,
  components: {
    HelloWorld,
  },
})
export class Home extends Mixins(VueBase) {}
