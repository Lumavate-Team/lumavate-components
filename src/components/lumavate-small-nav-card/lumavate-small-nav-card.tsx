import { Component,Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-small-nav-card',
  styleUrl: 'lumavate-small-nav-card.scss'
})
export class LumavateSmallNavCard {

  @Prop() SubTitle: boolean = true;
  @Prop() SubTitleText: string = 'Subtitle, Yeah';
  @Prop() TitleText: string = 'Dropbox Onboarding Case Study';
  @Prop() TitleTextColor: string = '#000';
  @Prop() CardColor: string = '#D8E7FF';
  @Prop() CardImage: boolean = true;
  @Prop() ImageSource: string = 'https://s3.amazonaws.com/assets.labelnexusdev.com/images/R2_A1.jpg';
  @Prop() ImageScaling: string = 'contain';
  @Prop() CardLink: string = 'https://www.google.com';

	cardClicked() {
		if(this.CardLink) {
		  window.location.href = this.CardLink;
		}
	}

  displayImage: string = '';
  displaySubTitle: string = '';

  componentWillLoad() {
    this.displayImage = this.CardImage ? 'inline' : 'none';
    this.displaySubTitle = this.SubTitle ? 'inline' : 'none';
  }

	render() {
		return (
			<div class="container" onClick={() => this.cardClicked()} style={{backgroundColor:this.CardColor}}>
        <div class="image" style={{backgroundImage:"url(" + this.ImageSource + ")",backgroundSize:this.ImageScaling,display:this.displayImage}}></div>
        <div class="title-container">
          <div class="title" style={{color:this.TitleTextColor}}>{this.TitleText}</div>
          <div class="subtitle" style={{display:this.displaySubTitle}}>{this.SubTitleText}</div>
      </div>
      </div>
		);
	}
}
