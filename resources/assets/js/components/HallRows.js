import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class HallRows extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
        <div className="conf-step__legend">
          <label className="conf-step__label">
            Рядов, шт
            <input type="text" className="conf-step__input" placeholder="10" 
              value={this.props.rows} onChange={this.props.rowsHandler} disabled={this.props.rows}/>
          </label>
          <span className="multiplier">x</span>
          <label className="conf-step__label">
            Мест, шт<input type="text" className="conf-step__input" placeholder="8" 
              value={this.props.places} onChange={this.props.placesHandler} disabled={this.props.places ? 'disabled' : false}/>
          </label>
        </div>
      </div>
    );
  }
}

