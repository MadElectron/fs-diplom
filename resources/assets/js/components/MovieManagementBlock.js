import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import MovieAddPopup from './MovieAddPopup';
import MovieDeletePopup from './MovieDeletePopup';

export default class MovieMangementBlock extends Component {

    constructor(props) {
      super(props);

      this.state = {
        createPopupOn: false,
        deletePopupOn: false,
        data: null,
        deleteId: null,
        movieMatrix: {}
      };

      this.handleCreateClick = this.handleCreateClick.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
      this.handleDragOver = this.handleDragOver.bind(this);
      this.handleDrop = this.handleDrop.bind(this);
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
      console.log(e.target);

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
    }

    handleDrop(e) {
      e.preventDefault();

      if (e.target.classList.contains('conf-step__seances-timeline')){
        const data = JSON.parse(e.dataTransfer.getData("text"));
  
        data.parentWidth = parseInt(getComputedStyle(e.target).width);
        data.hallId = e.target.dataset.id;
        data.pos = Math.floor(e.clientX - e.target.getBoundingClientRect().left);
  
        this.addShowtime(data);
      }
    }

    intToTimeString(i) {
      let [h, m] = [parseInt(Math.floor(i/60)), parseInt(i % 24)];

      return (h<10 ? '0' : '') + h + ':' + (m<10 ? '0' : '') + m;
    }

    addShowtime(data) {
      const width = data.parentWidth * data.duration / 24 / 60;
      const time = this.intToTimeString(data.pos / data.parentWidth * 24 * 60);

      const style = {
        width: width,
        color: data.color,
        left: data.pos
      };

      let showTimes = this.state.movieMatrix;

      (showTimes[data.hallId] || (showTimes[data.hallId] = [])).push({
        id: data.id,
        title: data.title,
        duration: data.duration,
        startTime: time,
        style: style
      });


      this.setState({
        movieMatrix: showTimes
      });

      console.log(this.state.movieMatrix);
      this.forceUpdate();
    }


    buildHallList() {
      if (!this.props.data) {
        return null;
      }

      const result = [];

      this.props.data.forEach((el, index) => {
        const hallShowtimes = [];

        if (this.state.movieMatrix && this.state.movieMatrix.hasOwnProperty(el.id)) {
          this.state.movieMatrix[el.id].forEach((el, index) => hallShowtimes.push(
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
          data-id={'movie_' + el.id}
          data-title={el.title}
          data-duration={el.duration}
          draggable >
          <img className="conf-step__movie-poster" alt="poster" src="i/poster.png" />
          <h3 className="conf-step__movie-title">{el.title}</h3>
          <p className="conf-step__movie-duration">{el.duration} минут</p>
        </div>
      ));

      return result;
    } 
    
    componentDidUpdate() {
        if (document.getElementById('popups_movies')) {

          ReactDOM.render(
            <div>
              <MovieAddPopup active={this.state.createPopupOn}/>
              <MovieDeletePopup active={this.state.deletePopupOn} deletedMovie={this.state.deletedHall}/>
            </div>
            , document.getElementById('popups_movies'));
        }
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
            <button className="conf-step__button conf-step__button-regular">Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
          </fieldset>    
        </div> 
      );
    }
}