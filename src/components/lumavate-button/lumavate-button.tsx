import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'lumavate-button',
    styleUrl: 'lumavate-button.scss',
    shadow: true
})

export class LumavateButton {

    @Prop() pageRedirect: string = '';      // redirect link fot button press

    @Prop() buttonText: string = '';        // text shown on button
    @Prop() buttonShape: string = '';       // css class - Ex. Text, Raised, Unelevated, Outlined
    @Prop() buttonStyle: string = '';       // button type = Ex. Normal, Dense, Icon
    @Prop() buttonColor: string = '';       // background color of button

    @Prop() fontSize: string = '';          // size of text on button
    @Prop() fontStyle: string = '';         // font to be shown on button
    @Prop() fontColor: string = '';         // color of button font

    @Prop() textAlignment: string = '';     // where text should align on button
    @Prop() buttonRadius: string = '';      // determine how rounded button corners are

    render() {
        return (
            <div class="image">
                <a 
                    href={this.pageRedirect}
                    style={{'border-radius': this.buttonRadius, '--mdc-theme-primary': this.buttonColor, 'font-size': this.fontSize, 'font-family': this.fontStyle, 'color': this.fontColor}}
                    class={"mdc-button" + (this.buttonShape != '' ? ' ' + this.buttonShape: "") + (this.buttonStyle != '' ? ' ' + this.buttonStyle: "")}>
                    {this.buttonText}
                </a>
            </div>
        );
    }
}