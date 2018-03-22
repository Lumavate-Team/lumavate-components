import { Component, Prop, Listen } from '@stencil/core';

@Component({
  tag: 'lumavate-nav-bar',
  styleUrl: 'lumavate-nav-bar.scss'
})
export class LumavateNavBar {
  @Prop() NavBarBackgroundColor: string = '#000';
  @Prop() NavBarItemColor: string = '#FFF';
  @Prop() NavBarPosition: string = 'bottom';
  @Prop() NavBarItems: string = '';

	innerItems: Array<any>
	@Listen('navigate')
	navigateHandler(event: CustomEvent) {
		window.location.href = event.detail.url;
	}

	componentWillLoad() {
		this.innerItems = JSON.parse(this.NavBarItems);
  }

	render() {
		return (
		<div style={{backgroundColor:this.NavBarBackgroundColor ? this.NavBarBackgroundColor : "#fff"}} class="container">
			{this.innerItems.map((item) =>
				<lumavate-nav-bar-item
        nav-bar-item-color={this.NavBarItemColor}
        nav-bar-item-text={item.text}
        nav-bar-item-image-link={item.imageSource.preview}
        nav-bar-item-link={item.linkTo.url}></lumavate-nav-bar-item>
			)}
			</div>
		)
	}

}

