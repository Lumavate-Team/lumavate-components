import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-nav-bar',
  styleUrl: 'lumavate-nav-bar.scss',
  shadow:true
})

export class LumavateNavBar {
  @Prop() NavBarBackgroundColor: string = '#000';
  @Prop() NavBarItemColor: string = '#FFF';
  @Prop() NavBarActiveColor: string = '#000000';
  @Prop() NavBarShadowOpacity: string = '0';
  @Prop() NavBarPosition: string = 'bottom';
  @Prop() NavBarItems: string = '';

  innerItems: Array<any>

  componentWillLoad() {
    this.innerItems = JSON.parse(this.NavBarItems).filter((i) => { return i.linkTo.length > 0; });
  }

  getImageLink(i) {
    if(i.imageSource && i.imageSource.preview && i.imageSource.key) {
      return i.imageSource.preview;
    }
    return '';
  }

  render() {
    return (
      <div style={{backgroundColor:this.NavBarBackgroundColor ? this.NavBarBackgroundColor : "#fff", boxShadow:'0px 0px 10px 0px rgba(0, 0, 0, ' + this.NavBarShadowOpacity + ')'}} class='container'>
        {this.innerItems.map((item) =>
          <lumavate-nav-bar-item
            nav-bar-item-color={item.linkTo != '/' ? this.NavBarItemColor: this.NavBarActiveColor}
            nav-bar-item-text={item.text}
            nav-bar-item-image-link={this.getImageLink(item)}
            nav-bar-item-link={item.linkTo}>
          </lumavate-nav-bar-item>
        )}
      </div>
    )
  }
}
