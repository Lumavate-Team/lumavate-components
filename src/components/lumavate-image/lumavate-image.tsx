import { Component, Prop, Event, EventEmitter, Element} from '@stencil/core';

@Component({
  tag: 'lumavate-image',
  styleUrl: 'lumavate-image.scss'
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
    this.el.style.setProperty('background-image', 'url(' + this.src + ')');
    this.el.style.setProperty('background-size', this.mode);
  }
}
