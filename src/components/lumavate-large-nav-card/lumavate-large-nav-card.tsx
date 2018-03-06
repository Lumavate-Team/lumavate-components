import { Component,Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-large-nav-card',
  styleUrl: 'lumavate-large-nav-card.scss'
})
export class LumavateLargeNavCard {

  @Prop() Caption: boolean = true;
  @Prop() CaptionText: string = 'Dropbox Onboarding Case Study';
  @Prop() CaptionTextColor: string = '#000';
  @Prop() CaptionBackgroundColor: string = '#FFF';
  @Prop() CardColor: string = '#D8E7FF';
  @Prop() CardImage: boolean = true;
  @Prop() ImageSource: string = 'https://s3.amazonaws.com/assets.labelnexusdev.com/images/dbtransparent.png';
  @Prop() ImageScaling: string = 'contain';
  @Prop() CardLink: string = 'https://www.google.com';

	cardClicked() {
		if(this.CardLink) {
		  window.location.href = this.CardLink;
		}
	}

  imageMinHeight: string = '';

  componentWillLoad() {
    this.imageMinHeight = this.Caption ? '148px' : '180px';
  }

	render() {
		return (
			<div class="container" onClick={() => this.cardClicked()}>
      {this.CardImage ?
        <div class="image" style={{backgroundColor:this.CardColor,backgroundImage:"url(" + this.ImageSource + ")",backgroundSize:this.ImageScaling,minHeight:this.imageMinHeight}}></div>
        : <div class="no-image" style={{backgroundColor:this.CardColor,minHeight:this.imageMinHeight}}></div>
      }
      {this.Caption ?
        <div class="caption" style={{backgroundColor:this.CaptionBackgroundColor,color:this.CaptionTextColor}}>
          <div class="text">{this.CaptionText}</div>
        </div> : ''
      }
			</div>
		);
	}
}
