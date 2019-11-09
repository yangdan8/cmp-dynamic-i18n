import { Component, Prop, Vue } from 'vue-property-decorator';
import template from './hello-world.cmp.html';
import './hello-world.cmp.scss';

@Component({
  template,
})
export class HelloWorld extends Vue {
  @Prop() private readonly msg!: string;
}
