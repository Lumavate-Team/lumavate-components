import { Component, Prop, State } from '@stencil/core';
import {MDCTextField} from '@material/textfield/index';
import {MDCNotchedOutline} from '@material/notched-outline/index';

@Component({
    tag: 'lumavate-email',
    styleUrl: 'lumavate-email.scss',
    shadow: true
})

export class LumavateEmail {

    // Properties before Submit
    @Prop() authType: string = '';
    @Prop() buttonText: string = 'Continue';
    @Prop() instructionText: string = "Enter the email address associated with your account, and we'll send a magic link to your inbox.";
    @Prop() headerText: string = "Sign in with email";
    @Prop() belowButtonText: string = "";

    // Properties after submit
    @Prop() headerLogo: string = '';
    @Prop() submittedButtonLink: string;
    @Prop() headerTextConfirm: string = "Check your inbox";
    @Prop() instructionTextConfirm: string = "We just emailed a confirmation link to you. Click the link, and you'll be signed in."
    @Prop() buttonTextConfirm: string = "OK"

    // Email Elements
    userEmail: HTMLElement;
    userEmailInput: HTMLInputElement;

    // Pin Code Elements
    formName: HTMLElement;
    continueButton: HTMLElement;
    errorMessage: HTMLElement;
    emailHelp: HTMLElement;
    codeBoxes: HTMLInputElement[] = [];

    // Universal Props
    @Prop() themeColor: string = '#676767';
    @Prop() secondaryColor: string = '#878787';
    @Prop() errorColor: string = '#BB0000';
    @Prop() textColor: string = '#0c0c0c';
    @Prop() backgroundImage: string = '';
    @State() backgroundImageDisplay: any;
    @Prop() buttonTextColor: string= '#ffffff';
    @Prop() logo: string;

    // Input states
    @State() hideInput: string;
    @State() buttonAfterSubmit: string = "hide";
    @State() showConfirmText: string = "hide";
    @State() showLogo: string;
    @State() emailErrorMessage: string = '';
    @State() apiError: string = '';
    @State() showScreen: string = 'email'
    @State() successMessage: boolean = false;
    email: string = null;

    // Instantiate component colors and set background image if it exists
    componentWillLoad() {
      let root = document.documentElement;
      root.style.setProperty('--primary-color', this.themeColor);
      root.style.setProperty('--secondary-color', this.secondaryColor);
      root.style.setProperty('--mdc-theme-primary', this.themeColor);
      root.style.setProperty('--error-color', this.errorColor);
      root.style.setProperty('--text-color', this.textColor);

      if (this.backgroundImage == "/iot/v1/icons/no_image_available.png") {
        this.backgroundImageDisplay = {};
      }
      else{
        this.backgroundImageDisplay = {'backgroundImage': "url(" + this.backgroundImage + ")"};
      }

      if (this.authType == 'pin') {
        this.email = localStorage.getItem('loginEmail')
        if (this.email) {
          this.showScreen = 'pin'
          this.apiError = 'Email sent to ' + this.email
          this.successMessage = true
        }
      }
    }

    // Instantiate form fields
    componentDidLoad() {
      try {
        new MDCTextField(this.userEmail);
        new MDCNotchedOutline(this.userEmailInput);
      } catch(_) {

      }
    }

    // Instantiate form fields once again when updating component
    componentDidUpdate() {
      try {
        new MDCTextField(this.userEmail);
        new MDCNotchedOutline(this.userEmailInput);
      } catch(_) {
        
      }
    }

    // Get auth token to send in fetch requests
    getAuthToken() {
      var cookies = document.cookie.split(";");
      for(var i=0,len=cookies.length; i < len; i++){
        var cookie = cookies[i].split("=");
        if(cookie[0].trim() == "pwa_jwt"){
          return cookie[1].trim();
        }
      }
    }

    // Redirect user from confirmation page
    submittedButtonClicked() {
      window.location.href = this.submittedButtonLink;
    }

    // Select last input field that is blank in the pin code entry 
    selectLast(e) {
      console.log('selectLast')
      console.log(e)
      for (let codeBox of this.codeBoxes) {
        if (!codeBox.value) {
          codeBox.focus()
          return
        }
      }
      this.codeBoxes[this.codeBoxes.length -1].focus();
    }

    // Auto tab into the next pin code input box 
    autoTab(e, currentNum) {
      console.log('autoTab')
      console.log(e)
      if (e.inputType != 'deleteContentBackward') {
        let toNum = currentNum == this.codeBoxes.length - 1 ? currentNum : currentNum + 1
        let to = this.codeBoxes[toNum]
        let current:any = this.codeBoxes[currentNum]

        to.focus()
        current.style.border = '2px solid var(--primary-color)'
        if (to == this.codeBoxes[this.codeBoxes.length - 1]) {
          if (this.codeBoxes[this.codeBoxes.length - 1].value.length > 0) {
            this.continueButton.removeAttribute('disabled')
          }
        }
      }
    }

    // Handle deleting of input values when user backspaces
    handleBack(e, currentNum) {
      console.log('handle back')
      if (e.key == 'Backspace') {
        console.log(e)
        this.continueButton.setAttribute('disabled', 'true')
        this.codeBoxes[currentNum].style.border = '2px solid transparent'
        if (currentNum > 0) {
          if (!this.codeBoxes[currentNum].value) {
            this.codeBoxes[currentNum - 1].value = ''
            this.codeBoxes[currentNum - 1].focus()
            this.codeBoxes[currentNum - 1].style.border = '2px solid transparent'
          }
        }
      }
    }

    // Split the pin code appropriately if the user pastes into the input field
    splitCode(e) {
      console.log(e)
      let paste = (e.clipboardData).getData('text').split('')
      if (new RegExp("^[0-9]{6}$").test((e.clipboardData).getData('text'))) {
        for(let x = 0; x < 6; x++) {
          this.codeBoxes[x].value = paste[x]
          this.codeBoxes[x].style.border = '2px solid var(--primary-color)'
          this.codeBoxes[x].blur()
        }
        this.continueButton.removeAttribute('disabled')
        this.apiError = ''
      } else {
        this.codeBoxes[0].value = null
        this.codeBoxes[0].style.border = '2px solid transparent'
        this.codeBoxes[0].blur()
        this.codeBoxes[1].style.border = '2px solid transparent'
        this.codeBoxes[1].blur()
        this.apiError = 'Code entered was not numeric or incorrect length'
      }
    }

    // Create pin to send in the POST request
    createPin() {
      let pinCode = ''
      for(let x = 0; x < this.codeBoxes.length; x++) {
        pinCode = pinCode + this.codeBoxes[x].value
      }

      return pinCode
    }

    // Retrieve and manipulate status codes on fetch requests
    status(response) {
      return new Promise((resolve, reject) => {
          if (response.status >= 200 && response.status < 300) {
              response.json().then((response) => {
                return resolve(response)
              });
          } else {
              response.json().then((result) => {
              return reject({ 
                 'status': response.status,
                 'result': result
                });
              });
          }
      });
    }

    // Handle submit of users email
    handleSubmitEmail(e) {
      console.log(e)
      e.cancelBubble = true;
      e.stopPropagation();
      e.preventDefault();

      window['getSingleUseToken']((singleToken) => this.callAPIEmail(singleToken))
    }

    // Fetch call to invite/authorize a user through email
    callAPIEmail(singleToken) {
      let dataWrap = {}
      this.email = this.userEmailInput.value

      if (this.authType == 'email') {
        dataWrap = {
          email: this.email
        }
      } else if (this.authType == 'pin') {
        dataWrap = {
          email: this.email,
          sendCode: true
        }
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
      }).then(this.status)
          .then((response: any) => {
            //success!
            console.log(response)
            if (this.authType == 'email') {
              this.showScreen = 'confirm'
              if (this.submittedButtonLink == "" || this.submittedButtonLink==null) {
                this.buttonAfterSubmit = "hide";
              } else {
                this.buttonAfterSubmit = "submittedButton";
              }
            } else if (this.authType == 'pin') {
              localStorage.setItem('loginEmail', this.email)
              this.apiError = 'Email sent to ' + this.email
              this.successMessage = true
              this.showScreen = 'pin'
            }
      }, (error_json: any) => {
          //failure
          console.log(error_json)
          this.successMessage = false
          if (error_json.status == 400) {
            this.emailErrorMessage = 'Invalid Recipient'
          } else {
            this.emailErrorMessage = error_json.result.error
          }
      }).catch( function (err) {
          console.log('Request failure: ', err);
      });
    }

    // Handle submit of access code
    handleSubmitPin(e) {
      console.log(e)
      e.cancelBubble = true;
      e.stopPropagation();
      e.preventDefault();

      window['getSingleUseToken']((singleToken) => this.callAPIPin(singleToken))
    }

    // Fetch call authorizing users by access code input
    callAPIPin(singleToken) {
      let dataWrap: any = {
        email: this.email,
        code: this.createPin()
      }

      console.log(dataWrap)

      var reqHeaders = new Headers({
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.getAuthToken(),
          "Luma-Proxy-Authorization": singleToken
      })

      fetch(window['getAuthUrl']() + "activate", {
          method: "POST",
          credentials: "same-origin",
          body: JSON.stringify(dataWrap),
          headers: reqHeaders,
      }).then(this.status)
          .then((response: any) => {
            //success!
            localStorage.removeItem('loginEmail')
            window.location.href = response.payload.data.redirectUrl
      }, (error_json: any) => {
            //failure
            console.log(error_json)
            this.successMessage = false
            if (error_json.status == 403) {
              localStorage.removeItem('loginEmail')
              this.showScreen = 'email'
              this.emailErrorMessage = 'Max tries exceeded. Re-enter email'
              return
            }
            this.continueButton.setAttribute('disabled', 'true')
            this.apiError = error_json.result.error
            for(let x = 0; x < this.codeBoxes.length; x++) {
              this.codeBoxes[x].value = ''
              this.codeBoxes[x].style.border = '2px solid transparent'
            }
      }).catch( function (err) {
            console.log('Request failure: ', err);
      });
    }

    render() {
      return (
        <div id="componentContainer" style={this.backgroundImageDisplay}>
          {this.showScreen == 'email' &&
            <div class="page">
              <div class="container">
                <div style={{'min-height': '100px', 'max-height': '172px', 'max-width': '172px', 'padding': '5px', 'margin': 'auto'}}>
                  {this.logo == '/iot/v1/icons/no_image_available.png' ? <div></div> : <img alt="Logo" class="logo" src={this.logo}></img>}
                </div>
                <div class="header">{this.headerText}</div>
                <div class="instructions">{this.instructionText}</div>

                <div class="confirm-inputs" >
                    <form class={this.hideInput} onSubmit={(e) => this.handleSubmitEmail(e)}>
                      <div class="text-field-container">
                        <div style={{'width': '100%', 'height': '50px'}} class="mdc-text-field text-field mdc-text-field--outlined" ref={(el: HTMLElement) => this.userEmail = el}>
                          <input required type="email" name="userEmail" id="hero-text-field-id--outlined" class="mdc-text-field__input" ref={(el: HTMLInputElement) => this.userEmailInput = el}></input>
                          <div class="mdc-notched-outline mdc-notched-outline--upgrade">
                            <div class="mdc-notched-outline__leading"></div>
                            <div class="mdc-notched-outline__notch">
                              <label class="mdc-floating-label" htmlFor="hero-text-field-id--outlined">Your Email Address</label>
                            </div>
                            <div class="mdc-notched-outline__trailing"></div>
                          </div>
                        </div>
                      </div>

                      <div class={this.successMessage ? "successMessageContainer": "errorMessageContainer"}>{this.emailErrorMessage}</div>

                      <div>
                          <div id="signup-button">
                              <button style={{'backgroundColor': this.themeColor, 'borderColor': this.themeColor, 'color':this.buttonTextColor}} type="submit" class="mdc-button mdc-button--unelevated done">
                                  {this.buttonText}
                              </button>
                          </div>
                      </div>
                    </form>
                </div>

                <div class="extraMessage">{this.belowButtonText}</div>
              </div>
            </div>
          }

          {this.showScreen == 'pin' &&
            <div>
              <div class="headerContainer">
                <div id="headerText">Verification</div>
                <div class="headerIcon">
                  {this.headerLogo == '/iot/v1/icons/no_image_available.png' ? <div></div> : <img alt="Logo" class="logo" src={this.headerLogo}></img>}
                </div>
              </div>

              <div id="checkCode">
                Check your email for your access code
              </div>

              <div style={{'padding-top': '10px'}}>
                <form onSubmit={(e) => this.handleSubmitPin(e)} id="pin" ref={(el: HTMLElement) => this.formName = el}>
                  <input onKeyDown={(e) => this.handleBack(e, 0)} onPaste={(e) => this.splitCode(e)} onFocus={(e) => this.selectLast(e)} ref={(el: HTMLInputElement) => this.codeBoxes[0] = el} type="tel" min="0" max="9" maxlength="1" onInput={(e) => this.autoTab(e, 0)}></input>
                  <input onKeyDown={(e) => this.handleBack(e, 1)} onPaste={(e) => this.splitCode(e)} onFocus={(e) => this.selectLast(e)} ref={(el: HTMLInputElement) => this.codeBoxes[1] = el} type="tel" min="0" max="9" maxlength="1" onInput={(e) => this.autoTab(e, 1)}></input>
                  <input onKeyDown={(e) => this.handleBack(e, 2)} onPaste={(e) => this.splitCode(e)} onFocus={(e) => this.selectLast(e)} ref={(el: HTMLInputElement) => this.codeBoxes[2] = el} type="tel" min="0" max="9" maxlength="1" onInput={(e) => this.autoTab(e, 2)}></input>
                  <input onKeyDown={(e) => this.handleBack(e, 3)} onPaste={(e) => this.splitCode(e)} onFocus={(e) => this.selectLast(e)} ref={(el: HTMLInputElement) => this.codeBoxes[3] = el} type="tel" min="0" max="9" maxlength="1" onInput={(e) => this.autoTab(e, 3)}></input>
                  <input onKeyDown={(e) => this.handleBack(e, 4)} onPaste={(e) => this.splitCode(e)} onFocus={(e) => this.selectLast(e)} ref={(el: HTMLInputElement) => this.codeBoxes[4] = el} type="tel" min="0" max="9" maxlength="1" onInput={(e) => this.autoTab(e, 4)}></input>
                  <input onKeyDown={(e) => this.handleBack(e, 5)} onPaste={(e) => this.splitCode(e)} onFocus={(e) => this.selectLast(e)} ref={(el: HTMLInputElement) => this.codeBoxes[5] = el} type="tel" min="0" max="9" maxlength="1" onInput={(e) => this.autoTab(e, 5)}></input>
                  <div class={this.successMessage ? "successMessageContainer": "errorMessageContainer"}>{this.apiError}</div>
                  <div>
                    <div id="pincode-button">
                      <button disabled type="submit" class="mdc-button mdc-button--unelevated done" ref={(el: HTMLElement) => this.continueButton = el}>
                        Continue
                      </button>
                    </div>
                  </div>
                </form>  
              </div>
            </div>
          }

          {this.showScreen == 'confirm' &&
            <div id="emailConfirmContainer">
              <div style={{'padding': '40px'}}>
                <div style={{'min-height': '100px', 'max-height': '172px', 'max-width': '172px', 'padding': '5px', 'margin': 'auto'}}>
                  {this.logo == '/iot/v1/icons/no_image_available.png' ? <div></div> : <img alt="Logo" class="logo" src={this.logo}></img>}
                </div>
                <div class = "header">{this.headerTextConfirm}</div>
                <div class = "instructions">{this.instructionTextConfirm}</div>
                <button onClick={()=>this.submittedButtonClicked()} id = {this.buttonAfterSubmit} style={{'backgroundColor': this.themeColor, 'borderColor': this.themeColor, 'color':this.buttonTextColor}}>{this.buttonTextConfirm}</button>
              </div>
            </div>
          }
        </div>
      );
    }
}
