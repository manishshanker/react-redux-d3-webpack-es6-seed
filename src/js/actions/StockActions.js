import fetch from 'universal-fetch';
import { transformDataByVolume, transformDataByPriceOverTime, transformDataByExchangeVolumeByMinutes } from './../helpers/dataTransformer';
import * as types from '../constants/ActionTypes';

export function setTimeDuration(duration) {
  return {
    type: types.STOCK_APP_SET_TIME_DURATION,
    duration
  };
}

export function loadData() {
  return (dispatch) => {
    fetch('http://localhost:8080/data.json').then((response) => {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    }).then((responseData) => dispatch({
      type: types.STOCK_APP_LOAD_DATA,
      stockData: responseData,
      tradeVolumePerAccount: transformDataByVolume(responseData),
      tradePriceOverTime: transformDataByPriceOverTime(responseData),
      exchangeVolumeByMinutes: transformDataByExchangeVolumeByMinutes(responseData, 10)
    }));
  };
}
