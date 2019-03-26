import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Client ticket page (step 3) component
 */
export default class ClientTicket extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showtime: this.props.showtime,  // Chosen showtime
    }
  }

  componentDidMount() {
    // Making a QR Code image

    const wrapper = document.getElementById('code');

    new QRCode(wrapper, this.props.qrCode);

    wrapper.querySelector('img').classList.add('ticket__info-qr')
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
            <p className="ticket__info">Места: <span className="ticket__details ticket__chairs"><br/>{this.props.stringifyPlaces()}</span></p>
            <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{this.state.showtime.hall.title}</span></p>
            <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{ (new Date(this.state.showtime.start_time)).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}</span></p>

            <div id="code"></div>

            <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
            <p className="ticket__hint">Приятного просмотра!</p>
          </div>
        </section>     
      </main>      
    );
  }
}
