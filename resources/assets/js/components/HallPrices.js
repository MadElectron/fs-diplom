import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Admin prices inputs
 */
export default class HallPrices extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="conf-step__paragraph">Установите цены для типов кресел:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" onChange={this.props.standartPriceHandler} /></label>
            за <span className="conf-step__chair conf-step__chair_standart"></span> обычные кресла
          </div>  
          <div className="conf-step__legend">
            <label className="conf-step__label">Цена, рублей<input type="text" className="conf-step__input" placeholder="0" onChange={this.props.vipPriceHandler} /></label>
            за <span className="conf-step__chair conf-step__chair_vip"></span> VIP кресла
          </div>
      </div>
    );
  }
}

