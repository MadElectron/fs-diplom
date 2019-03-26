import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ClientNav from './ClientNav';
import ClientShowtimeList from './ClientShowtimeList';
import ClientHall from './ClientHall';
import ClientPayment from './ClientPayment';
import ClientTicket from './ClientTicket';

/**
 * Main client component
 */
class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date:       new Date(), // Current date
      disabled:   true,       // Book button (on step 1) 'disabled' attr
      movieData:  null,       // Movies list
      hall:       null,       // Chosen hall
      showtime:   null,       // Chosen showtime
      places:     {},         // Places matrix on scheme
      qrCode:     null,       // QR Code string
      step:       0,          /* Step of booking:
                                  0 - showtime choosing,
                                  1 - place choosing
                                  2 - chosen places and price
                                  3 - qr code
                              */
    }

    this.handleAccept = this.handleAccept.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleShowtimeChoose = this.handleShowtimeChoose.bind(this);
    this.handlePlaceToggle = this.handlePlaceToggle.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.countPrice = this.countPrice.bind(this);
    this.stringifyPlaces = this.stringifyPlaces.bind(this);
  }

  // ====== Primart methods =====

  /**
   * Get movie list from db
   * @return {Promise}
   */
  getMovieList() {
    return fetch('/movies/list',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    }).then(
      resp => resp.json()
    ); 
  }

  /**
   * Get showtime list from db
   * @return {Promise}
   */
  getShowtime(id) {
    return fetch(`/showtimes/${id}`,{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    }).then(
      resp => resp.json()
    ); 
  }

  /**
   * Get ticket list from db
   * @return {Promise}
   */
  getTickets() {
    return fetch('/tickets/list',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    }).then(
      resp => resp.json()
    );
  }



  // ====== Handlers ======


  /**
   * Handle date click in nav
   * @param {Event} e
   */
  handleDateChange(e) {
    e.preventDefault();
      this.setState({
        date: new Date(e.currentTarget.dataset.date)
    });
      this.forceUpdate();
  }


  /**
   * Handle showtime href click
   * @param {Event} e
   */
  handleShowtimeChoose(e) {
    e.preventDefault();

    // Set taken places to chosen showtime and Pass to step 1
    this.getShowtime(e.target.dataset.id)
      .then(json => this.getTickets()
        .then(
          tickets => this.setState({
            step: 1, 
            showtime: this.setTakenPlaces(json, tickets)
          })
        )
      );
  }

  /**
   * Handle place click, toggling place type
   * @param {Event} e
   */
  handlePlaceToggle(e) {
    e.preventDefault();

    let data = e.target.dataset;
    let places = this.state.places;
    
    if (data.type != 'selected') {
      // If place is selected, add to chosen places array

      places[data.id] = {
        row: data.row,
        number: data.number,
        price: data.price,
        type: data.type,
      };

      e.target.dataset.type = 'selected';
      e.target.classList.remove(`buying-scheme__chair_${data.type}`);
      e.target.classList.add(`buying-scheme__chair_selected`);

    } else {
      // Delete from chosen places array

      e.target.dataset.type = places[data.id].type;
      e.target.classList.remove(`buying-scheme__chair_selected`);
      e.target.classList.add(`buying-scheme__chair_${places[data.id].type}`);

      delete places[data.id];
    }

    // Set chosen places array
    // And enable button to next step if places are chosen
    this.setState({
      places: places,
      disabled: Object.keys(places).length === 0 
    })
  }

  /**
   * Handle Book button click
   */
  handleAccept() {
    console.log('Accepted');

    this.setState({
      step: 2,
    });
  }

  /**
   * Handle Get Qr Code button click
   */
  handlePayment() {
    let places = Object.keys(this.state.places); // Chosen Places ids
    let ticket = {
      showtime: this.state.showtime.id,
      date: this.state.date,
      price: this.countPrice(),
      places: places
    };

    // Add ticket to db, then pass to last step
    fetch('/tickets/add',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify(ticket)

    })
    .then(resp => resp.text())
    .then(resp => {
      this.setState({
        qrCode: resp,
        step: 3,
      });
    });     
  }



  // ====== Helpers ======

  /**
   * Set taken places on current showtime place matrix
   * @param {Object} showtime
   * @param {Array} tickets
   * @return {Object}
   */
  setTakenPlaces(showtime, tickets) {

        let places = showtime.hall.places;

        // Filtering tickets on chosen date
        tickets = tickets.filter(ticket => 
          (new Date(ticket.date)).toLocaleDateString() === this.state.date.toLocaleDateString()
            && ticket.showtime_id === showtime.id
          );

        // Get all places of all tickets
        let ticketPlaces = [].concat.apply([], tickets.map(ticket => ticket.places.map(place => place.place_id)));

        // Setting "Taken" status to places on matrix
        places.forEach(place => {
          if (ticketPlaces.find(ticketPlace => ticketPlace === place.id)) {
            place.type = 3;
          }
        });

        // Setting place matrix with taken places to showtime
        showtime.hall.places = places;

        return showtime;
  }

  /**
   * Assigns halls to movies shown in them
   * @param {Array} data
   * @return {Array} data
   */
  convertMoviesToHalls(data) {
    data.forEach(movie => {
      movie.halls = {};
      movie.showtimes.forEach(st => {
        (movie.halls[st.hall.title] || (movie.halls[st.hall.title] = [])).push(st); 
      })

    });

    return data;
  } 

  /**
   * Gets the total sum of chosen places prices
   */
  countPrice() {
    return Object.values(this.state.places).reduce((total, p) => total + parseInt(p.price), 0);
  }  

  /**
   * Converts places object to string for print on ticket
   */
  stringifyPlaces() {
    return Object.values(this.state.places).map(p => `Ряд ${p.row}, место ${p.number}`).join('; ');
  }


  // ====== Events ======

  componentDidMount() {
    console.log('Client mounted');

    this.getMovieList()
      .then(json => {

        this.setState(
          {movieData : this.convertMoviesToHalls(json)
        });
      });
  }
 

  render() {
    switch(this.state.step) {
      case 0: 
        return(
          <div>
            <ClientNav date={this.state.date} handleDateChange={this.handleDateChange} />
            <main>
              <ClientShowtimeList data={this.state.movieData} handleClick={this.handleShowtimeChoose} />
            </main>
          </div>    
        );
      case 1: 
        return <ClientHall date={this.state.date} showtime={this.state.showtime} disabled={this.state.disabled} 
          handleAccept={this.handleAccept} handlePlaceToggle={this.handlePlaceToggle} />
      case 2:
        return <ClientPayment hall={this.state.hall} showtime={this.state.showtime} places={this.state.places} 
          handlePayment={this.handlePayment} countPrice={this.countPrice}  stringifyPlaces={this.stringifyPlaces} />
      case 3:
        return <ClientTicket showtime={this.state.showtime} places={this.state.places} 
          stringifyPlaces={this.stringifyPlaces} qrCode={this.state.qrCode} />        
      default: 
        return null
    }
  }
}


if (document.getElementById('client')) {
  ReactDOM.render(<Client />, document.getElementById('client'));
}