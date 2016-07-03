import { renderComponent, expect } from '../testHelper';
import StockApp from '../../../src/js/containers/StockApp/StockApp';

describe('StockApp', () => {

  let component;

  beforeEach(() => {
    component = renderComponent(StockApp);
  });

  it('shows a chart', () => {
    expect(component.find('.charts')).to.exist;
  });
});
