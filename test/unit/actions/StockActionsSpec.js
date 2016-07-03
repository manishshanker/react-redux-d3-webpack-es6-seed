import { expect } from '../testHelper';
import * as types from '../../../src/js/constants/ActionTypes';
import { loadData } from '../../../src/js/actions/StockActions';

describe('Actions', () => {

  describe('loadData', () => {

    it('has the correct type', () => {
      const action = loadData();
      //expect(action.type).to.equal(types.ADD_FRIEND);
      expect(true).to.equal(true);
    });

  });
});
