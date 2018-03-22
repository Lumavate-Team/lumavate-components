import { Component,Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lumavate-nav-bar-item',
  styleUrl: 'lumavate-nav-bar-item.scss'
})
export class LumavateNavBarItem {
  @Prop() NavBarItemLink: string = ''
  @Prop() NavBarItemImageLink: string = ''
  @Prop() NavBarItemText: string = ''
  @Prop() NavBarItemColor: string = '#FFF'

  buttonClicked(event:UIEvent) {
    console.log(event);
  }

  @Event() navigate: EventEmitter

  displayImage: boolean = false;

  componentWillLoad() {
    this.displayImage = this.NavBarItemImageLink.length > 0 ? true : false;
    console.log(this.displayImage);
  }

  render() {
    return (
      <div>
      <div onClick={(event:UIEvent) => this.buttonClicked(event)}>
      {this.displayImage ?
        <div class="icon" style={{webkitMaskImage:"url(" + this.NavBarItemImageLink + ")",maskImage:"url(" + this.NavBarItemImageLink + ")",backgroundColor:this.NavBarItemColor}}></div>
        : ''
      }

      <div style={{color:this.NavBarItemColor ? this.NavBarItemColor : "#000"}} class="button-text">{this.NavBarItemText}</div>
      </div>
      </div>
    );
  }
}

