import { Component, Prop, Listen } from '@stencil/core';

@Component({
	tag: 'lumavate-toolbar',
	styleUrl: 'lumavate-toolbar.scss'
})
export class LumavateToolbar {
	@Prop() items: string
	@Prop() backgroundcolor: string

	innerItems: Array<any>

	@Listen('navigate')
	navigateHandler(event: CustomEvent) {
		window.location.href = event.detail.url;
	}

	componentWillLoad() {
		this.innerItems = JSON.parse(this.items);
  }

	render() {
		return (
		<div style={{backgroundColor:this.backgroundcolor ? this.backgroundcolor : "#fff"}} class="container">
			{this.innerItems.map((item) => 
				<lumavate-toolbar-button item={item}></lumavate-toolbar-button>
			)}
			</div>
		)
	}
}

