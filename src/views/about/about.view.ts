import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import template from './about.view.html';

@Component({
  name: 'home',
  template,
})
export class About extends Vue {}
