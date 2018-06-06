import { Component, Element, Prop } from '@stencil/core';

@Component({
  tag: 'lumavate-grid-item',
  styleUrl: 'lumavate-grid-item.css',
  shadow: true
})
export class LumavateGridItem {

  @Element() el: HTMLElement;
  @Prop() gridStartCol: string = '1';
  @Prop() gridStartRow: string = '1';
  @Prop() gridStopCol: string = '1';
  @Prop() gridStopRow: string = '1';
  @Prop() mode: string = 'yes';

  render() {
    var degraded = false;
    var urlParms = new URLSearchParams(window.location.search);
    if (urlParms.has('mode') && urlParms.get('mode') == 'degraded') {
      degraded = true;
    }

    if (!degraded && this.mode == 'degraded') {
      this.el.style.setProperty('display', 'none');
    } else if (degraded && this.mode == 'optimal') {
      this.el.style.setProperty('display', 'none');
    } else if (degraded) {
      this.el.style.setProperty('width', '100%');
    } else {
      this.el.style.setProperty('grid-column-start', this.gridStartCol);
      this.el.style.setProperty('grid-column-end', this.gridStopCol);
      this.el.style.setProperty('grid-row-start', this.gridStartRow);
      this.el.style.setProperty('grid-row-end', this.gridStopRow);
    }

    return (
      <div innerHTML={this.el.innerHTML}>
      </div>
    );
  }
}
