import { Component, Prop, Method } from '@stencil/core';

@Component({
  tag: 'lumavate-header',
  styleUrl: 'lumavate-header.scss'
})

export class LumavateShareText {

  @Prop() FontColor: string = '#F1F1F1';
  @Prop() BackgroundColor: string = '#252525';
  @Prop() ShowBackButton: boolean = true;
  @Prop() Text: string = 'placeholder text';

  @Method()
  showBackButton() {
    let backButton: any = document.getElementsByClassName('back-button')

    if (!this.ShowBackButton) {
      backButton[0].style.display = 'none'
    }
  }

  componentDidLoad() {
    this.showBackButton()
  }

  render() {
    return (
      <div class="back-bar">
        <style>
          @import url('https://fonts.googleapis.com/css?family=Roboto');
        </style>
        <div class="nav-wrapper" style={{ "background-color": this.BackgroundColor, "color": this.FontColor }}>
          <div class='back-button'>
            <a href="javascript:history.back()" style={{ "color": this.FontColor }}>
              <i class="material-icons">keyboard_arrow_left</i>
            </a>
          </div>
          <div class="text">
            <p>{this.Text}</p>
          </div>
        </div>
      </div>
    )
  }
}

