import { Component, Prop} from '@stencil/core';

@Component({
  tag: 'lumavate-image',
  styleUrl: 'lumavate-image.scss',
  shadow:true
})
export class LumavateImage {

  @Prop() src: string = '';
  @Prop() mode: string = 'cover';

  render() {
		return (
      <div class="image" style={{backgroundImage:"url(" + this.src + ")",backgroundSize:this.mode}}></div>
    )
  }
}
