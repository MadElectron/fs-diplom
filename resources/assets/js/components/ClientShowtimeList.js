import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ClientShowtimeList extends Component {
    constructor(props) {
      super(props);

      this.state = {
        'showtime' : this.props.showtime
      }

      this.buildMovieList = this.buildMovieList.bind(this);
    }

    buildMovieList() {

      const result = [];

      if (!this.props.data) {
        return null;
      }

      this.props.data.forEach(movie => {
        const halls = [];

        Object.entries(movie.halls).forEach(hall => {
          
          const sts = [];
          let [title, showtimes] = hall;

          // console.log(key, hall);

          showtimes.forEach(st => {
            let dt = new Date(st.start_time);
            let [h, m] = [dt.getHours(), dt.getMinutes()];
            
            [h, m] = [h, m].map(x => (x < 10 ? '0' : '') + x);
            let time = `${h}:${m}`;

            sts.push(
                <li key={st.id} className="movie-seances__time-block">
                  <a className="movie-seances__time" href="#" data-id={st.id} onClick={this.props.handleClick}>{time}</a>
                </li>
            );
          });

          halls.push(
            <div key={showtimes[0].hall_id} className="movie-seances__hall">
              <h3 className="movie-seances__hall-title">{title}</h3>
              <ul className="movie-seances__list">
                {sts}
              </ul>
            </div>            
          );          
        })

        result.push(
          <section key={movie.id} className="movie">

            <div className="movie__info">
              <div className="movie__poster">
                <img className="movie__poster-image" alt="Звёздные войны постер" src="i/poster1.jpg" />
              </div>
              <div className="movie__description">
                <h2 className="movie__title">{movie.title}</h2>
                <p className="movie__synopsis">Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.</p>
                <p className="movie__data">
                  <span className="movie__data-duration">130 минут</span>
                  <span className="movie__data-origin">США</span>
                </p>
              </div>
            </div>  
            {halls}
          </section>
        );
      });

      return result;
    }



    render() {
      return (
          <div>
            {this.buildMovieList()}
          </div>
        );
    }    
}