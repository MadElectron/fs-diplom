import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import ClientNav from './ClientNav';
import ClientShowtimeList from './ClientShowtimeList';
import ClientHall from './ClientHall';
import ClientPayment from './ClientPayment';
import ClientTicket from './ClientTicket';

class Client extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      disabled: true,
      movieData: null,
      hall: null,
      showtime: null,
      places: {},
      step: 0,

    }

    this.handleAccept = this.handleAccept.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleShowtimeChoose = this.handleShowtimeChoose.bind(this);
    this.handlePlaceToggle = this.handlePlaceToggle.bind(this);
    this.handlePayment = this.handlePayment.bind(this);
    this.countPrice = this.countPrice.bind(this);
    this.stringifyPlaces = this.stringifyPlaces.bind(this);
  }

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

  setTakenPlaces(showtime, tickets) {

        let places = showtime.hall.places;

        tickets = tickets.filter(ticket => 
          (new Date(ticket.date)).toLocaleDateString() === this.state.date.toLocaleDateString()
            && ticket.showtime_id === showtime.id
          );

        let ticketPlaces = [].concat.apply([], tickets.map(ticket => ticket.places.map(place => place.place_id)));

        places.forEach(place => {
          if (ticketPlaces.find(ticketPlace => ticketPlace === place.id)) {
            place.type = 3;
          }
        });

        showtime.hall.places = places;

        return showtime;
  }


  handleDateChange(e) {
    e.preventDefault();
      this.setState({
        date: new Date(e.currentTarget.dataset.date)
    });
      this.forceUpdate();
  }

  handleShowtimeChoose(e) {
    e.preventDefault();

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

  handlePlaceToggle(e) {
    e.preventDefault();

    let data = e.target.dataset;
    let places = this.state.places;
    
    if (data.type != 'selected') {
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
      e.target.dataset.type = places[data.id].type;
      e.target.classList.remove(`buying-scheme__chair_selected`);
      e.target.classList.add(`buying-scheme__chair_${places[data.id].type}`);

      delete places[data.id];
    }

    this.setState({
      places: places,
      disabled: Object.keys(places).length === 0
    })
  }

  handleAccept() {
    console.log('Accepted');

    this.setState({
      step: 2,
    });
  }

  handlePayment() {
    let places = Object.keys(this.state.places);
    let ticket = {
      showtime: this.state.showtime.id,
      date: this.state.date,
      price: this.countPrice(),
      places: places
    };

    fetch('/tickets/add',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify(ticket)

    }).then(() => {
      this.setState({
        step: 3,
      });
    });     
  }

  componentDidMount() {
    console.log('Client mounted');

    this.getMovieList()
      .then(json => {

        this.setState(
          {movieData : this.convertShowtimesToHalls(json)
        });
      });
  }

  convertShowtimesToHalls(data) {
    data.forEach(movie => {
      movie.halls = {};
      movie.showtimes.forEach(st => {
        (movie.halls[st.hall.title] || (movie.halls[st.hall.title] = [])).push(st); 
      })

    });

    return data;
  }  

  countPrice() {
    return Object.values(this.state.places).reduce((total, p) => total + parseInt(p.price), 0);
  }  

  stringifyPlaces() {
    return Object.values(this.state.places).map(p => `Ряд ${p.row}, место ${p.number}`).join('; ');
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
        return<ClientHall date={this.state.date} showtime={this.state.showtime} disabled={this.state.disabled} 
          handleAccept={this.handleAccept} handlePlaceToggle={this.handlePlaceToggle} />
      case 2:
        return<ClientPayment hall={this.state.hall} showtime={this.state.showtime} places={this.state.places} 
          handlePayment={this.handlePayment} countPrice={this.countPrice}  stringifyPlaces={this.stringifyPlaces}/>
      case 3:
        return<ClientTicket showtime={this.state.showtime} places={this.state.places} stringifyPlaces={this.stringifyPlaces}/>        
      default: 
        return null
    }
  }
}


if (document.getElementById('client')) {
  ReactDOM.render(<Client />, document.getElementById('client'));
}