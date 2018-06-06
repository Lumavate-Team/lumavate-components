import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-grid',
  styleUrl: 'lumavate-grid.css',
  shadow: true
})
export class LumavateGrid {

  @Element() el: HTMLElement;
  @Prop() gridColumns: string;
  @Prop() gridRows: string;

  render() {
    var style = 'grid';
    var urlParms = new URLSearchParams(window.location.search);
    if (urlParms.has('mode') && urlParms.get('mode') == 'degraded') {
      style = 'grid-degraded';
    }
    return (
      <div
        innerHTML={this.el.innerHTML}
        class={style}
        style={{gridTemplateColumns: this.gridColumns, gridTemplateRows: this.gridRows}}>
      </div>
    );
  }
}
