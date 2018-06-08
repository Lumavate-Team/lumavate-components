import { Component, Prop, Event, EventEmitter} from '@stencil/core';

@Component({
  tag: 'lumavate-image',
  styleUrl: 'lumavate-image.scss'
})
export class LumavateImage {

  @Event() clicked: EventEmitter
  @Prop() src: string = '';
  @Prop() margin: string = '0';
  @Prop() mode: string = 'cover';

  imageClick(e) {
    this.clicked.emit(e);
  }

  render() {
    return (
      <div style={{margin:this.margin}}>
        <img class="image" src={this.src} onClick={(e) => this.imageClick(e)}/>
      </div>
    )
  }
}
