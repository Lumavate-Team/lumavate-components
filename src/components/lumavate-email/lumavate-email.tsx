import { Component, Prop, Method, State, Element } from '@stencil/core';

@Component({
    tag: 'lumavate-email',
    styleUrl: 'lumavate-email.scss',
    shadow: true
})

export class LumavateEmail {

    // Properties before Submit
    @Prop() buttonText: string = 'Continue';
    @Prop() instructionText: string = "Enter the email address associated with your account, and we'll send a magic link to your inbox";
    @Prop() headerText: string = "Sign in with email";

    //Properties after submit
    @Prop() submittedButtonLink: string;
    @Prop() headerTextConfirm: string = "Check your inbox";
    @Prop() instructionTextConfirm: string = "We just emailed a confirmation link to you. Click the link, and you'll be signed in."
    @Prop() buttonTextConfirm: string = "OK"

    @Prop() themeColor: string = '#f57b20';
    @Prop() backgroundColor: string = '#fafafa';
    @Prop() backgroundImage: string = '';
    @Prop() buttonTextColor: string= '#ffffff';
    @Prop() logo: string = 'data:image/png;base64,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';

    @State() email: string;
    @State() hideInput: string;
    @State() buttonAfterSubmit: string = "hide";
    @State() showConfirmText: string = "hide";

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
            "Lumavate-sut": singleToken
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
        <div id="background" style={{background:this.backgroundColor, backgroundImage: "url("+this.backgroundImage+")"}}>
          <div class="page">
            <div class="container">
              <img class="logo" src={this.logo}></img>
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
