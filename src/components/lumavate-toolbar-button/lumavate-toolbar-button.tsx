import { Component,Prop, Event, EventEmitter } from '@stencil/core';

@Component({
	tag: 'lumavate-toolbar-button',
	styleUrl: 'lumavate-toolbar-button.scss'
})
export class LumavateToolbarButton {

	buttonClicked(event:UIEvent) {
		if(this.item.url) {
			this.navigate.emit(this.item);
		}
		console.log(event);
	}

	@Event() navigate: EventEmitter
	
	@Prop() item: any

	render() {
		return (
			<div>
			<div onClick={(event:UIEvent) => this.buttonClicked(event)}>
			<i class="material-icons" style={{color:this.item.color ? this.item.color : "#000"}}>{this.item.icon}</i>
			<div style={{color:this.item.color ? this.item.color : "#000"}} class="button-text">{this.item.title}</div>
			</div>
			</div>
		);
	}
}
