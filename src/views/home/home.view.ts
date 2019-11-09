import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import HelloWorld from '@/components/hello-world';
import template from './home.view.html';

@Component({
  name: 'home',
  template,
  components: {
    HelloWorld,
  },
})
export class Home extends Vue {}
