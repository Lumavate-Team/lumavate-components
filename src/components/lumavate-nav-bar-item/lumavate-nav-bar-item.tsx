import { Component,Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-nav-bar-item',
  styleUrl: 'lumavate-nav-bar-item.scss',
  shadow:true
})
export class LumavateNavBarItem {
  @Prop() NavBarItemLink: string = ''
  @Prop() NavBarItemImageLink: string = ''
  @Prop() NavBarItemText: string = ''
  @Prop() NavBarItemColor: string = '#FFF'

  buttonClicked() {
    if(this.NavBarItemLink) {
      window.location.href = this.NavBarItemLink;
    }
  }

  displayImage: boolean = false;

  componentWillLoad() {
    this.displayImage = this.NavBarItemImageLink.length > 0 ? true : false;
  }

  render() {
    return (
      <div onClick={() => this.buttonClicked()}>
      {this.displayImage ?
        <div class="icon" style={{webkitMaskImage:"url(" + this.NavBarItemImageLink + ")",maskImage:"url(" + this.NavBarItemImageLink + ")",backgroundColor:this.NavBarItemColor}}></div>
        : ''
      }

      {this.NavBarItemText ?
        <div style={{color:this.NavBarItemColor ? this.NavBarItemColor : "#000"}} class="button-text">{this.NavBarItemText}</div>
        : ''
      }

      </div>
    );
  }
}

