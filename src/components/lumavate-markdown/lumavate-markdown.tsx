import { Component, Prop } from '@stencil/core';
import {markdown} from 'markdown';

@Component({
    tag: 'lumavate-markdown',
    styleUrl: 'lumavate-markdown.scss',
    shadow: false
})

export class LumavateMarkdown {

    @Prop() body: string = '';
    @Prop() fontSize: string = '';
    @Prop() fontAlign: string = '';
    @Prop() fontColor: string = '';

    formattedText: string = '';

    componentWillLoad() {
        this.formattedText = markdown.toHTML(this.body)
    }

    render() {
        return (
            <div style={{'padding': '20px'}}>
                <div 
                    class="image"
                    innerHTML={this.formattedText}
                    style={{'font-size': this.fontSize, 'text-align': this.fontAlign, 'color': this.fontColor}}>
                </div>
            </div>
        );
    }
}