import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-image',
  styleUrl: 'lumavate-image.scss'
})
export class LumavateImage {

  @Prop() Src: string = '';
  @Prop() Margin: string = '0';
  @Prop() Mode: string = 'cover';

  componentWillLoad() {
  }

  render() {
    return (
      <div style={{margin:this.Margin}}>
        <img class="image" src={this.Src} />
      </div>
    )
  }
}
