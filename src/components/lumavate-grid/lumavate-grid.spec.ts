import { flush, render } from '@stencil/core/testing';
import { LumavateGrid } from './lumavate-grid';

describe('grid', () => {
  it('should build', () => {
    expect(new LumavateGrid()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [LumavateGrid],
        html: '<lumavate-grid></lumavate-grid>'
      });
    });
  });
});
