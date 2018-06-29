import { Component, Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-quote',
  styleUrl: 'lumavate-quote.scss',
  shadow:true
})
export class LumavateQuote {

  @Prop() QuoteText:string = '';
  @Prop() FontSize: number = 12;
  @Prop() QuotationMarks: boolean = true;
  @Prop() Color: string = '#000';
  @Prop() ShowCard: boolean = true;
  @Prop() CardColor: string = '#FFF';

  internalFontSize: string = '';

  componentWillLoad() {
    this.internalFontSize = String(this.FontSize) + 'pt';
  }

  render() {
    return (
      <div class={this.ShowCard ? "container-shadow" : "container"} style={{backgroundColor:this.CardColor}}>
      <div class="quote-container start">
      <div class="spacer">
      {this.QuotationMarks
        ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
          <g fill="none" fill-rule="evenodd" transform="matrix(-1 0 0 1 15 -5)">
            <path fill={this.Color} fill-rule="nonzero" d="M10,5 L10,10 L12.75,10 L11,13 L13.25,13 L15,10 L15,5 L10,5 Z M3,10 L5.75,10 L4,13 L6.25,13 L8,10 L8,5 L3,5 L3,10 Z"/>
            <polygon points="0 0 18 0 18 18 0 18"/>
          </g>
          </svg>
        :''}
      </div></div>
      <div class="quote-text" style={{color:this.Color,fontSize:this.internalFontSize}}>{this.QuoteText}</div>
      <div class="quote-container end">
      <div class="spacer">
      { this.QuotationMarks
        ? <svg xmlns="http://www.w3.org/2000/svg" width="12" height="8" viewBox="0 0 12 8">
          <g fill="none" fill-rule="evenodd" transform="translate(-3 -5)">
          <path fill={this.Color} fill-rule="nonzero" d="M10,5 L10,10 L12.75,10 L11,13 L13.25,13 L15,10 L15,5 L10,5 Z M3,10 L5.75,10 L4,13 L6.25,13 L8,10 L8,5 L3,5 L3,10 Z"/>
          <polygon points="0 0 18 0 18 18 0 18"/>
          </g>
          </svg>
        :''}
      </div></div>
      </div>
    )
  }
}

