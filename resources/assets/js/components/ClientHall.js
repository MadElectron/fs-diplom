import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/** 
  * Place types
  * @constant
  * @type {Array}
  * @default
*/
const TYPES = ['disabled', 'standart', 'vip', 'taken'];


/**
 * Client hall page (step 1) component
 */
export default class ClientHall extends Component {
  constructor(props) {
    super(props);

    this.state = {
        date:     this.props.date,      // Chosen date
        showtime: this.props.showtime,  // Chosen showtime
        prices:   this.getPrices()      // Object {placeType : price}
    }
  }

  // ====== Primary methods =====

  /**
   * Convert places object to JSX
   * @return {Array} result
   */
  buildScheme() {
    let places = this.state.showtime.hall.places;
    let rows = [];
    let result = [];

    // Convert place array to matrix
    places.forEach(place => {
      (rows[place.row_number] || (rows[place.row_number] = [])).push(place)
    });

    rows.forEach((rowPlaces, rowIndex) => {
      let row = [];

      rowPlaces.forEach((place, index) => {
        const className = `buying-scheme__chair buying-scheme__chair_${TYPES[place.type]}`;

        row.push(
          <span 
            key={index} 
            className={className}  
            data-id={place.id}
            data-row={place.row_number + 1} 
            data-number={place.number + 1} 
            data-type={TYPES[place.type]}
            data-price={this.state.prices[place.type]}
            title={`Ряд ${place.row_number + 1}, место ${place.number + 1}`}
            onClick={place.type ? this.props.handlePlaceToggle : null}
          ></span>
        );
      });

      result.push(
        <div key={rowIndex} className="buying-scheme__row">
          {row}
        </div>        
      );
    });

    return result;
  }


  // ====== Helpers ======

  /**
   * Gets object {placeType : price} from chosen hall prices
   * @return {Object} result
   */
  getPrices() {
    let result = {};

    this.props.showtime.hall.prices.forEach(p => {
      result[p.type] = p.price;
    });

    return result;
  }


  render() {
    const date = this.state.date.toLocaleString('ru-RU', {day: 'numeric', month: 'long'});
    const time = (new Date(this.state.showtime.start_time)).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});

    return (
      <main>
          <section className="buying">
            <div className="buying__info">
              <div className="buying__info-description">
                <h2 className="buying__info-title">{this.state.showtime.movie.title}</h2>
                <p className="buying__info-start">Начало сеанса: {date}, {time}</p>
                <p className="buying__info-hall">{this.state.showtime.hall.title}</p>          
              </div>
              <div className="buying__info-hint">
                <p>Тапните дважды,<br/>чтобы увеличить</p>
              </div>
            </div>
            <div className="buying-scheme">
              <div className="buying-scheme__wrapper">
                {this.buildScheme()}
              </div>
              <div className="buying-scheme__legend">
                <div className="col">
                  <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span className="buying-scheme__legend-value">{this.state.prices[1]}</span> руб)</p>
                  <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span className="buying-scheme__legend-value">{this.state.prices[2]}</span> руб)</p>            
                </div>
                <div className="col">
                  <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
                  <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
                </div>
              </div>
            </div>
            <button className="acceptin-button" onClick={this.props.handleAccept} disabled={this.props.disabled}>Забронировать</button>
          </section>     
        </main>
    );
  }  

}