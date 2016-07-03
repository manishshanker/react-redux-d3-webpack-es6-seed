import * as types from '../constants/ActionTypes';
import { transformDataByExchangeVolumeByMinutes } from './../helpers/dataTransformer';

const initialState = {
  stockData: {},
  tradeVolumePerAccount: [],
  tradePriceOverTime: [],
  exchangeVolumeByMinutes: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.STOCK_APP_SET_TIME_DURATION: {
      return {
        ...state,
        exchangeVolumeByMinutes: transformDataByExchangeVolumeByMinutes(state.stockData, action.duration)
      };
    }
    case types.STOCK_APP_LOAD_DATA: {
      return {
        ...state,
        stockData: action.stockData,
        tradeVolumePerAccount: action.tradeVolumePerAccount,
        tradePriceOverTime: action.tradePriceOverTime,
        exchangeVolumeByMinutes: action.exchangeVolumeByMinutes
      };
    }
    default:
      return state;
  }
}
