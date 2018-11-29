import { Component, Prop, Method, State, Element } from '@stencil/core';

@Component({
    tag: 'lumavate-email',
    styleUrl: 'lumavate-email.scss',
    shadow: true
})

export class LumavateEmail {

    // Properties before Submit
    @Prop() buttonText: string = 'Continue';
    @Prop() instructionText: string = "Enter the email address associated with your account, and we'll send a magic link to your inbox.";
    @Prop() headerText: string = "Sign in with email";

    //Properties after submit
    @Prop() submittedButtonLink: string;
    @Prop() headerTextConfirm: string = "Check your inbox";
    @Prop() instructionTextConfirm: string = "We just emailed a confirmation link to you. Click the link, and you'll be signed in."
    @Prop() buttonTextConfirm: string = "OK"

    @Prop() themeColor: string = '#f57b20';
    @Prop() backgroundColor: string = '#fafafa';
    @Prop() backgroundImage: string = '';
    @State() backgroundImageDisplay: string;
    @Prop() buttonTextColor: string= '#ffffff';
    @Prop() logo: string;

    @State() email: string;
    @State() hideInput: string;
    @State() buttonAfterSubmit: string = "hide";
    @State() showConfirmText: string = "hide";
    @State() showLogo: string;

    @Element() el: HTMLElement;

    componentDidLoad() {
      let root = document.documentElement;
      root.style.setProperty('--email-component-button-color', this.themeColor);

      // if( navigator.userAgent.match(/Android/i)
      //  || navigator.userAgent.match(/webOS/i)
      //  || navigator.userAgent.match(/iPhone/i)
      //  || navigator.userAgent.match(/iPad/i)
      //  || navigator.userAgent.match(/iPod/i)
      //  || navigator.userAgent.match(/BlackBerry/i)
      //  || navigator.userAgent.match(/Windows Phone/i)
      //  ){
      //   this.browserTypeButton = "desktopButton";
      //   this.browserTypeInput = "desktopInput";
      // } else {
        // this.browserTypeButton = "desktopButton";
        // this.browserTypeInput = "desktopInput";
      // }

      if (this.backgroundImage == "/iot/v1/icons/no_image_available.png") {
        this.backgroundImageDisplay = "";
      }
      else{
        this.backgroundImageDisplay = this.backgroundImage;
      }
      if (this.logo == "/iot/v1/icons/no_image_available.png") {
        this.showLogo = "hide";
      }

    }

    getAuthToken() {
      var cookies = document.cookie.split(";");
      for(var i=0,len=cookies.length; i < len; i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].trim() == "pwa_jwt"){
          return cookie[1].trim();
        }
      }
    }

    callApi(singleToken) {

        let dataWrap: any = {
            email : this.email
        }

        console.log(JSON.stringify(dataWrap))

        var reqHeaders = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.getAuthToken(),
            "Luma-Proxy-Authorization": singleToken
        })

        fetch(window['getAuthUrl']() + "invite", {
            method: "POST",
            body: JSON.stringify(dataWrap),
            headers: reqHeaders,
        })
            .then(() => {
            // window.location.href = this.submitRedirect + "?query=" + this.interest;
            console.log('got to redirect');
        })
            .catch((err) => {
            // window.location.href = this.submitRedirect + "?query=" + this.interest;
            console.log(err);
        });

    }

    handleSubmit(e) {
        console.log(e)
        e.cancelBubble = true;
        e.stopPropagation();
        e.preventDefault();



        this.hideInput = "hide";
        this.showConfirmText = "";
        if (this.submittedButtonLink == "" || this.submittedButtonLink==null) {
          this.buttonAfterSubmit = "hide";
        }else{
          this.buttonAfterSubmit = "submittedButton";
        }


        window['getSingleUseToken']((singleToken) => this.callApi(singleToken))

    }

    submittedButtonClicked() {
      window.location.href = this.submittedButtonLink;
    }

    @Method()
    handleEmail(event) {
        this.email = event.target.value;
    }

    render() {
      return (
        <div id="background" style={{background:this.backgroundColor, backgroundImage: "url("+this.backgroundImageDisplay+")"}}>
          <div class="page">
            <div class="container">
              <img id = {this.showLogo} class="logo" src={this.logo}></img>
              <div id = {this.hideInput} class = "header">{this.headerText}</div>
              <div id = {this.hideInput} class = "instructions">{this.instructionText}</div>

              <div id = {this.showConfirmText} class = "header">{this.headerTextConfirm}</div>
              <div id = {this.showConfirmText} class = "instructions">{this.instructionTextConfirm}</div>

              <div class="confirm-inputs" >
                  <form id = {this.hideInput} onSubmit={(e) => this.handleSubmit(e)}>
                      <div style={{color:this.themeColor}} class="label">Your Email Address</div>
                      <input required type="email" name="username" value={this.email} onInput={(event) => this.handleEmail(event)}></input><br/>
                      <button style={{backgroundColor: this.themeColor, borderColor: this.themeColor, color:this.buttonTextColor}} type="submit">{this.buttonText}</button>
                  </form>
                  <button onClick={()=>this.submittedButtonClicked()} id = {this.buttonAfterSubmit} style={{backgroundColor: this.themeColor, borderColor: this.themeColor, color:this.buttonTextColor}}>{this.buttonTextConfirm}</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
}
