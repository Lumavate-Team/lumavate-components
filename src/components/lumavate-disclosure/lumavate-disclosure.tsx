import { Component, Prop, Element, Method, State } from '@stencil/core';

@Component({
    tag: 'lumavate-disclosure',
    styleUrl: 'lumavate-disclosure.scss',
    shadow: true
})

export class LumavateDisclosure {

  @Prop() buttonColor: string='#4177b5';
  @Prop() buttonTextColor: string = '#ffffff';
  @Prop() buttonText: string = 'Got it!';
  @Prop() buttonTextFont: string = 'sans-serif';

  @Prop() disclosureBackgroundColor: string = "#ffffff";
  @Prop() disclosureTextColor: string = "#000000";
  @Prop() disclosureText: string = 'This PWA uses cookies to provide you with a better experience.'
  @Prop() disclosureTextFont: string = 'sans-serif';

  @Prop() link1Text: string = "Privacy Agreement";
  @Prop() link1TextColor: string = "#4177b5";
  @Prop() link1: string = "";

  @Prop() link2Text: string = "";
  @Prop() link2TextColor: string = "#4177b5";
  @Prop() link2: string = "";

  @Prop() link3Text: string = "";
  @Prop() link3TextColor: string = "#4177b5";
  @Prop() link3: string = "";

  @Prop() popupDelay: string ="";

  @State() cookieExists: boolean = false;
  @State() closeBox: boolean = false;

  @Element() el: HTMLElement;

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  componentDidLoad() {
    if (this.getCookie("disclosure") != "shown") {
      // document.cookie = "disclosure=shown";
      return;
    }
    else{
      this.cookieExists=true;
    }
  }

  @Method()
  close() {
    document.cookie = "disclosure=shown";
    this.closeBox = true;
  }

  render() {
    if (this.cookieExists){
      return (
        <div></div>
      );
    }
    else if (this.closeBox) {
      return (
        <div id="disclosureClose" style={{fontFamily: this.disclosureTextFont, backgroundColor: this.disclosureBackgroundColor, color: this.disclosureTextColor}}>
          <div id="disclosureText" class="text">{this.disclosureText}</div>
          <a id = "link1" style={{color:this.link1TextColor}} href={this.link1}>{this.link1Text}</a>
          <a id = "link2" style={{color:this.link2TextColor}} href={this.link2}>{this.link2Text}</a>
          <a id = "link3" style={{color:this.link3TextColor}} href={this.link3}>{this.link3Text}</a>
          <div id="space"></div>
          <div id="button" style={{backgroundColor: this.buttonColor, color: this.buttonTextColor, fontFamily: this.buttonTextFont}}>
            {this.buttonText}
          </div>
        </div>
      );
    }
    else {
      return (
        <div id="disclosure" style={{fontFamily: this.disclosureTextFont, backgroundColor: this.disclosureBackgroundColor, color: this.disclosureTextColor, animationDelay: this.popupDelay+"s" }}>
          <div id="disclosureText" class="text">{this.disclosureText}</div>
          <a id = "link1" style={{color:this.link1TextColor}} href={this.link1}>{this.link1Text}</a>
          <a id = "link2" style={{color:this.link2TextColor}} href={this.link2}>{this.link2Text}</a>
          <a id = "link3" style={{color:this.link3TextColor}} href={this.link3}>{this.link3Text}</a>
          <div id="space"></div>
          <div id="button" onClick={this.close.bind(this)} style={{backgroundColor: this.buttonColor, color: this.buttonTextColor, fontFamily: this.buttonTextFont}}>
            {this.buttonText}
          </div>
        </div>
      );
    }
  }
}
