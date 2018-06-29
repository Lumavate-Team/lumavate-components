import { Component, Prop, Event, EventEmitter, Element} from '@stencil/core';

@Component({
  tag: 'lumavate-image',
  styleUrl: 'lumavate-image.scss',
  shadow:true
})
export class LumavateImage {

  @Event() clicked: EventEmitter;
  @Element() el: HTMLElement;
  @Prop() src: string = '';
  @Prop() mode: string = 'cover';

  imageClick(e) {
    this.clicked.emit(e);
  }

  render() {
		return (
      <div class="image" style={{backgroundImage:"url(" + this.src + ")",backgroundSize:this.mode}}></div>
    )
  }
}
