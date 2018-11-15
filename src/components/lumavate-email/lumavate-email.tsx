import { Component, Prop, Method, State } from '@stencil/core';

@Component({
    tag: 'lumavate-email',
    styleUrl: 'lumavate-email.scss',
    shadow: true
})

export class LumavateEmail {

    @Prop() headerText: string = '';
    @Prop() buttonText: string = '';
    @State() email: string;

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

        fetch(window['getAuthUrl'] + "invite", {
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

        window['getSingleUseToken']((singleToken) => this.callApi(singleToken))

    }

    @Method()
    handleEmail(event) {
        this.email = event.target.value;
    }

    render() {
        return (
            <div class="image">
                <div class="confirm-container">
                    <div class="confirm-header">
                        <div class="confirm-text">{this.headerText}</div>
                    </div>
                    <div class="confirm-inputs">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <input required type="text" name="username" placeholder="Email" value={this.email} onInput={(event) => this.handleEmail(event)}></input>
                            <button type="submit">{this.buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
