import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ClientTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: this.props.places,
      showtime: this.props.showtime,
    }

    this.stringifyPlaces = this.stringifyPlaces.bind(this);
  }

  stringifyPlaces() {
    return Object.values(this.state.places).map(p => `Ряд ${p.row}, место ${p.number}`).join('; ');
  }

  render() {
    return (
      <main>
        <section className="ticket">
          
          <header className="tichet__check">
            <h2 className="ticket__check-title">Электронный билет</h2>
          </header>
          
          <div className="ticket__info-wrapper">
            <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{this.state.showtime.movie.title}</span></p>
            <p className="ticket__info">Места: <span className="ticket__details ticket__chairs"><br/>{this.stringifyPlaces()}</span></p>
            <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{this.state.showtime.hall.title}</span></p>
            <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{(new Date(this.state.showtime.start_time)).toLocaleTimeString({hour: '2-digit', 'seconds': false})}</span></p>

            <img className="ticket__info-qr" src="i/qr-code.png" />

            <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
            <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>     
      </main>      
    );
  }
}
