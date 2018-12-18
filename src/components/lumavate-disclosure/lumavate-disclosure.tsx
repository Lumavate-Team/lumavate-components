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
  @Prop() link1: string = "https://www.google.com";

  @Prop() link2Text: string = "";
  @Prop() link2TextColor: string = "#4177b5";
  @Prop() link2: string = "";

  @Prop() link3Text: string = "";
  @Prop() link3TextColor: string = "#4177b5";
  @Prop() link3: string = "";

  @Prop() headerText: string = "Terms and Conditions";
  @Prop() headerBackgroundColor: string = "black";
  @Prop() headerTextColor: string = "white";

  @Prop() popUpSpeed: string='0.75';

  @State() cookieExists: boolean = false;
  @State() closeBox: boolean = false;
  @State() openBox: boolean = false;

  @Element() el: HTMLElement;

  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  componentDidLoad() {
    let root = document.documentElement;
    if (this.el.shadowRoot.querySelector('.disclosure') != null){
      var disclosureHeight = this.el.shadowRoot.querySelector('.disclosure').clientHeight;
    }
    else if (this.el.shadowRoot.querySelector('.disclosureCookie') != null) {
      var disclosureHeight = this.el.shadowRoot.querySelector('.disclosureCookie').clientHeight;
    }
    else if (this.el.shadowRoot.querySelector('.disclosureClose') != null) {
      var disclosureHeight = this.el.shadowRoot.querySelector('.disclosureClose').clientHeight;
    }
    else if (this.el.shadowRoot.querySelector('.disclosureOpen') != null) {
      var disclosureHeight = this.el.shadowRoot.querySelector('.disclosureOpen').clientHeight;
    }


    root.style.setProperty('--box-height', disclosureHeight + "px");
    root.style.setProperty('--pop-up-speed', this.popUpSpeed + "s");

    if (this.getCookie("disclosure") != "shown") {
      return;
    }
    else{
      this.cookieExists=true;
    }
  }

  @Method()
  close() {
    this.cookieExists=false;
    document.cookie = "disclosure=shown";
    this.closeBox = true;
  }
  open() {
    this.cookieExists=false;
    this.closeBox = false;
    this.openBox = true;
  }

  render() {
    if (this.cookieExists){
      return (
        <div class="disclosureCookie" style={{fontFamily: this.disclosureTextFont, backgroundColor: this.disclosureBackgroundColor, color: this.disclosureTextColor}}>
          <div id="header" onClick={this.open.bind(this)} style={{backgroundColor: this.headerBackgroundColor, color: this.headerTextColor}}>{this.headerText}</div>
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
    else if (this.closeBox) {
      return (
      <div class="disclosureClose" style={{fontFamily: this.disclosureTextFont, backgroundColor: this.disclosureBackgroundColor, color: this.disclosureTextColor}}>
        <div id="header" onClick={this.open.bind(this)} style={{backgroundColor: this.headerBackgroundColor, color: this.headerTextColor}}>{this.headerText}</div>
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
    else if (this.openBox) {
      return (
        <div class="disclosureOpen" style={{fontFamily: this.disclosureTextFont, backgroundColor: this.disclosureBackgroundColor, color: this.disclosureTextColor }}>
          <div id="header" style={{backgroundColor: this.headerBackgroundColor, color: this.headerTextColor}}>{this.headerText}</div>
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
    else {
      return (
        <div class="disclosure" style={{fontFamily: this.disclosureTextFont, backgroundColor: this.disclosureBackgroundColor, color: this.disclosureTextColor }}>
          <div id="header" style={{backgroundColor: this.headerBackgroundColor, color: this.headerTextColor}}>{this.headerText}</div>
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
