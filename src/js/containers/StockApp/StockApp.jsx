import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalBarSeries, LineSeries } from 'react-vis';
import { Grid, Panel, Button, ButtonGroup } from 'react-bootstrap';
import './../../../../node_modules/react-vis/dist/main.scss';

import * as StockActions from './../../actions/StockActions';

class StockApp extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    tradeVolumePerAccount: PropTypes.array.isRequired,
    tradePriceOverTime: PropTypes.array.isRequired,
    exchangeVolumeByMinutes: PropTypes.array.isRequired
  };

  loadData() {
    this.props.actions.loadData();
  }

  setTimeDuration(e) {
    this.props.actions.setTimeDuration(parseInt(e.target.value, 10));
  }

  render() {
    let chartsByPrice = this.props.tradePriceOverTime.map((stockData) => (
      <Panel collapsible
             header={stockData.symbol + '| Price over time | As of: ' + moment(stockData.asOfDate).format("MMM Do YYYY")}
             key={stockData.symbol}>
        <XYPlot
          animation={{duration: 500}}
          xType="time"
          width={500}
          height={300}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            data={stockData.data}/>
        </XYPlot>
      </Panel>
    ));

    let chartsByVolumeAndTime = this.props.exchangeVolumeByMinutes.map((stockData) => (
      <Panel key={stockData.symbol} collapsible header={stockData.symbol + ' | Volume by every 10 mins'}>
        <XYPlot
          animation={{duration: 500}}
          xType="time"
          width={500}
          height={300}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            data={stockData.data}/>
        </XYPlot>
        <ButtonGroup>
          <Button value="10" onClick={this.setTimeDuration.bind(this)}>10</Button>
          <Button value="20" onClick={this.setTimeDuration.bind(this)}>20</Button>
          <Button value="30" onClick={this.setTimeDuration.bind(this)}>30</Button>
        </ButtonGroup>
      </Panel>
    ));

    let chartByVolume = (
      <Panel key="chartByVolume" collapsible header="By Volume">
        <XYPlot
          animation={{duration: 500}}
          xType="ordinal"
          width={500}
          height={300}>
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <VerticalBarSeries
            data={this.props.tradeVolumePerAccount}/>
        </XYPlot>
      </Panel>
    );

    return (
      <Grid className="charts">
        {this.props.tradeVolumePerAccount.length ? [
          chartByVolume,
          chartsByPrice,
          chartsByVolumeAndTime
        ] : <Button bsStyle="primary" onClick={this.loadData.bind(this)}>Load</Button>
        }
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    tradeVolumePerAccount: state.stockReducer.tradeVolumePerAccount,
    tradePriceOverTime: state.stockReducer.tradePriceOverTime,
    exchangeVolumeByMinutes: state.stockReducer.exchangeVolumeByMinutes
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(StockActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(StockApp);
