import { Component,Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'lumavate-nav-bar-item',
  styleUrl: 'lumavate-nav-bar-item.scss'
})
export class LumavateNavBarItem {
  @Prop() NavBarItemLink: string = ''
  @Prop() NavBarImageLink: string = ''
  @Prop() NavBarItemText: string = ''
  @Prop() NavBarItemColor: string = '#FFF'

  buttonClicked(event:UIEvent) {
    console.log(event);
  }

  @Event() navigate: EventEmitter

  componentDidLoad() {
    console.log(this);
    console.log('The component has been rendered');
  }

  render() {
    return (
      <div>
      <div onClick={(event:UIEvent) => this.buttonClicked(event)}>
      <div style={{color:this.NavBarItemColor ? this.NavBarItemColor : "#000"}} class="button-text">{this.NavBarItemText}</div>
      </div>
      </div>
    );
  }
}

