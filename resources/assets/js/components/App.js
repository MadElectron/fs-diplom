import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallManagementBlock from './HallManagementBlock';
import HallConfigurationBlock from './HallConfigurationBlock';
import HallPriceBlock from './HallPriceBlock';
import MovieManagementBlock from './MovieManagementBlock';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      movieData: null,
      showtimes: null,
    }
  }

  getHallList() {
    return fetch('/halls/list',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    }).then(
      resp => resp.json()
    );
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


  getShowtimeList() {
    return fetch('/showtimes/list',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    }).then(
      resp => resp.json()
    ); 
  }

  showtimesToMatrix(data) {
    let result = {};

    [...data].forEach(st => {
      let dt = new Date(st.start_time);
      let [h, m] = [dt.getHours(), dt.getMinutes()];
      
      [h, m] = [h, m].map(x => (x < 10 ? '0' : '') + x);

      (result[st.hall_id] || (result[st.hall_id] = [])).push({
        id: st.movie.id,
        title: st.movie.title,
        duration: st.movie.duration,
        startTime: `${h}:${m}`,
        style: {},
        initial: true
      });
    });

    return result;
  }

  componentDidMount() {
    this.getHallList()
      .then(json => {
        this.setState(
          {data : json
        });
      });

    this.getMovieList()
      .then(json => {
        this.setState(
          {movieData : json
        });
      });      

    this.getShowtimeList()
      .then(json => {

        this.setState(
          {showtimes : this.showtimesToMatrix(json)
        });
      }); 
  }

  render() {
    return (
      <div>
      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Управление залами</h2>
        </header>

        <HallManagementBlock data={this.state.data} />
        
      </section>
      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Конфигурация залов</h2>
        </header>
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>

          <HallConfigurationBlock data={this.state.data} />

        </div>    
      </section>
      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Конфигурация цен</h2>
        </header>
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>

          <HallPriceBlock data={this.state.data} />    
          
        </div>
      </section>

      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Сетка сеансов</h2>
        </header>
        <div className="conf-step__wrapper">
          
          <MovieManagementBlock data={this.state.data} movieData={this.state.movieData} showtimes={this.state.showtimes} />  
        </div>
      </section>            


    </div>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}