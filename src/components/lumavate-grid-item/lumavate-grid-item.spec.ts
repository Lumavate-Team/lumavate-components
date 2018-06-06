import { flush, render } from '@stencil/core/testing';
import { Grid } from './grid';

describe('grid-item', () => {
  it('should build', () => {
    expect(new LumavateGridItem()).toBeTruthy();
  });

  describe('rendering', () => {
    let element;
    beforeEach(async () => {
      element = await render({
        components: [LumavateGridItem],
        html: '<lumavate-grid-item></lumavate-grid-item>'
      });
    });
  });
});
