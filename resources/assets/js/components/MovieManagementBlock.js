import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MovieAddPopup from './MovieAddPopup';
import MovieDeletePopup from './MovieDeletePopup';
import ShowtimeAddPopup from './ShowtimeAddPopup';

const TIMELINE_STEP = 5;

export default class MovieMangementBlock extends Component {

    constructor(props) {
      super(props);

      this.state = {
        createPopupOn: false,
        deletePopupOn: false,
        createStPopupOn: false,

        data: null,
        deleteId: null,
        showtimes: {},
        stData: null,
        stTime: null,
      };

      this.handleCreateClick = this.handleCreateClick.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
      this.handleDragOver = this.handleDragOver.bind(this);
      this.handleDragStart = this.handleDragStart.bind(this);
      this.handleDrop = this.handleDrop.bind(this);
      this.save = this.save.bind(this);
      this.cancel = this.cancel.bind(this);
      this.reInit = this.reInit.bind(this);
    }

    handleCreateClick() {
      this.setState({
        createPopupOn: true
      });
    }

    handleDeleteClick(el, e) {
      this.setState({
        deletePopupOn: true,
        deletedHall: el
      }); 
    }

    handleDragStart(e) {
      const data = {
        id: e.target.dataset.id,
        title: e.target.dataset.title,
        duration: e.target.dataset.duration,
        color: getComputedStyle(e.target).backgroundColor
      };

      e.dataTransfer.setData("text", JSON.stringify(data));
    }

    handleDragOver(e) {
      e.preventDefault();

      let floatingTime = document.querySelector('p.conf-step__seances-timeline-floating-time');

      console.log(floatingTime)

      if (e.target.classList.contains('conf-step__seances-timeline')){
        // Duplicating handleDrop code cause zero access to e.dataTransfer

        let pos = Math.floor(e.clientX - e.target.getBoundingClientRect().left);
        let width = parseInt(getComputedStyle(e.target).width);
        let time = this.intToTimeString(pos / width * 24 * 60);



        if (!floatingTime) {
          floatingTime = document.createElement('p');  
          floatingTime.classList.add('conf-step__seances-timeline-floating-time');
          e.target.appendChild(floatingTime);
        } 

        floatingTime.style.left = pos + 'px';
        floatingTime.textContent = time;      

        this.setState({
          stTime: time,
        })  
      } 
      else {
        if (floatingTime) {  
          floatingTime.remove();

          this.setState({
            stTime: null,
          })            
        }
      }
    }

    handleDrop(e) {
      e.preventDefault();

      if (e.target.classList.contains('conf-step__seances-timeline')){

        const data = JSON.parse(e.dataTransfer.getData("text"));

        let floatingTime = document.querySelector('p.conf-step__seances-timeline-floating-time');
        floatingTime.remove();
  
        data.parentWidth = parseInt(getComputedStyle(e.target).width);
        data.hallId = e.target.dataset.id;
        data.pos = Math.floor(e.clientX - e.target.getBoundingClientRect().left);

        this.setState({
          createStPopupOn: true,
          stData: data,
        });
        
        // this.addShowtime(data);
      }
    }

    intToTimeString(i) {
      // Helper 

      let [h, m] = [parseInt(Math.floor(i/60)), parseInt(i % 24)];
      m = Math.floor(m / TIMELINE_STEP) * TIMELINE_STEP;

      [h, m] = [h, m].map(x => (x < 10 ? '0' : '') + x);

      return `${h}:${m}`;
    }

    timeToInt(t) {
      let [h, m] = t.split(':').map(x => parseInt(x));

      return h*60 + m;
    }

    filterInitialShowtimes(initial) {
      let showtimes = Object.assign({}, this.state.showtimes);

      Object.entries(showtimes).forEach(hall => {
        let [id, h] = hall;
        showtimes[id] = h.filter(st => st.initial !== initial);
      });

      return showtimes;
    }

    addShowtime(data) {
      const width = data.parentWidth * data.duration / 24 / 60;
      const time = this.intToTimeString(data.pos / data.parentWidth * 24 * 60);

      const style = {
        width: width,
        color: data.color,
        left: data.pos
      };

      let showTimes = this.state.showtimes;

      (showTimes[data.hallId] || (showTimes[data.hallId] = [])).push({
        id: data.id,
        title: data.title,
        duration: data.duration,
        startTime: time,
        style: style,
        initial: false,
      });


      this.setState({
        showtimes: showTimes
      });

      this.forceUpdate();
    }

    buildHallList() {
      if (!this.props.data) {
        return null;
      }

      const result = [];

      this.props.data.forEach((el, index) => {
        const hallShowtimes = [];

        if (this.state.showtimes && this.state.showtimes.hasOwnProperty(el.id)) {
          this.state.showtimes[el.id].forEach((el, index) => hallShowtimes.push(
            <div key={index} className="conf-step__seances-movie" style={{
              width: el.style.width, 
              left: el.style.left,
              backgroundColor: el.style.color
            }}>
              <p className="conf-step__seances-movie-title">{el.title}</p>
              <p className="conf-step__seances-movie-start">{el.startTime}</p>
            </div>
          ));
        }

        result.push(
          <div key={index} className="conf-step__seances-hall" onDragOver={this.handleDragOver} onDrop={this.handleDrop}>
            <h3 className="conf-step__seances-title">{el.title}</h3>
            <div className="conf-step__seances-timeline" data-id={el.id}>
              {hallShowtimes}
            </div>
          </div>
        );
      });

      return result.length ? result : <p>Нет доступных залов</p>;
    }    

    buildMovieList() {

      if (!this.props.movieData) {
        return null;
      }

      const result = [];

      this.props.movieData.forEach((el, index) => result.push(
        <div key={index} 
          className="conf-step__movie" 
          onDragStart={this.handleDragStart}
          onDoubleClick={e => this.handleDeleteClick(el, e)} 
          data-id={el.id}
          data-title={el.title}
          data-duration={el.duration}
          draggable >
          <img className="conf-step__movie-poster" alt="poster" src={`i/posters/${el.id}.jpg`} />
          <h3 className="conf-step__movie-title">{el.title}</h3>
          <p className="conf-step__movie-duration">{el.duration} минут</p>
        </div>

      ));

      return result;
    } 

    cancel() {
      this.setState({
        showtimes: this.filterInitialShowtimes(false)
      });

      this.forceUpdate();
    }

    save() {
      let showtimes = this.filterInitialShowtimes(true);

      Object.values(this.state.showtimes).forEach(hall => {
        hall.forEach(st => {st.initial = true});
      });

      fetch(`/showtimes/add`,{
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: JSON.stringify(showtimes)
      }).then(
        this.forceUpdate()
      );
    }

    reInit() {
      this.setState({
        stData: null,
        stTime: null,
        createStPopupOn: false,
        
      });
    }
    
    componentDidUpdate() {
        if (document.getElementById('popups_movies')) {

          ReactDOM.render(
            <div>
              <MovieAddPopup active={this.state.createPopupOn}/>
              <MovieDeletePopup active={this.state.deletePopupOn} deletedMovie={this.state.deletedHall}/>
              <ShowtimeAddPopup active={this.state.createStPopupOn} halls={this.props.data} 
                addShowtime={this.addShowtime} data={this.state.stData} time={this.state.stTime} reInit={this.reInit} />
            </div>
            , document.getElementById('popups_movies'));
        }
    }

    componentWillReceiveProps(props) {
      let showtimes = props.showtimes;

      if (showtimes) {
        Object.values(showtimes).forEach(hall => hall.forEach(st => {

          st.style = {
            width : 770 * st.duration / 24 / 60,
            left : 770 * this.timeToInt(st.startTime) / 24 / 60,
            color : 'white'
          };

        }));
      }

      this.setState({
        showtimes: showtimes
      });

    }

    render() {
      return (
        <div>
          <p className="conf-step__paragraph">
            <button className="conf-step__button conf-step__button-accent" onClick={this.handleCreateClick}>Добавить фильм</button>
          </p>
          <div className="conf-step__movies">
            {this.buildMovieList()}
          </div>
          
          <div className="conf-step__seances">
            {this.buildHallList()}
          </div>
          
          <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular" onClick={this.cancel}>Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={this.save} />
          </fieldset>    
        </div> 
      );
    }
}