import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class HallScheme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: []
    }
  }

  changeClass() {

  }

  builPlacesScheme() {
    const rows = [];

    for(let i = 0; i < this.props.rows; i++ ) {
      const rowPlaces = [];

      for(let j = 0; j < this.props.places; j++) {
        rowPlaces.push(
          <span className="conf-step__chair conf-step__chair_standart" onClick={changeClass}></span>
        );
      }

      rows.push(<div key={i} className="conf-step__row">{rowPlaces}</div>);
    }

    return rows;
  }

  componentWillMount() {

  };

  render() {
    return (
      <div>
        
        <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
        <div className="conf-step__legend">
          <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
          <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
          <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
          <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
        </div>  
        
        <div className="conf-step__hall">
          <div className="conf-step__hall-wrapper">
            {this.builPlacesScheme()}
          </div>  
        </div>
        
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
        </fieldset>        
      </div>
    );
  }
}

