import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallScheme from './HallScheme';
import HallRows from './HallRows';


function matrix(rows, cols, value) {
  return Array(parseInt(rows)).fill(0).map(x => Array(parseInt(cols)).fill(value));
}

export default class HallConfigurationBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      halls: this.props.data,
      selectedHall: null,
      selectedHallRows: null,
      selectedHallPlaces: null,
    };

    this.handleHallSelect = this.handleHallSelect.bind(this);
    this.handleHallRowsChange = this.handleHallRowsChange.bind(this);
    this.handleHallPlacesChange = this.handleHallPlacesChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  // @ TODO: общий класс, с этим методом
  handleHallSelect(el, e) {
    this.setState({
      selectedHall: el,
      selectedHallRows: el.rows || null,
      selectedHallPlaces: el.places_in_row || null,
      // selectedHallPlaceMatrix: null
    });            

    this.forceUpdate();
  }

  handleHallRowsChange(e) {
    this.setState({
      selectedHallRows: e.target.value,
    });            
  }  

  handleHallPlacesChange(e) {
    this.setState({
      selectedHallPlaces: e.target.value,
    });            
  }  

  handleCancel() {
    this.setState({
      selectedHallRows: null,
      selectedHallPlaces: null,
    });
  }

  buildHallList() {
    if (!this.props.data) {
      return null;
    }

    const result = [];

    this.props.data.forEach((el, index) => result.push(
      <li key={index}>
        <input type="radio" 
          className="conf-step__radio" 
          name="chairs-hall" 
          value={el.title} 
          onChange={e => this.handleHallSelect(el, e)}
        />
        <span className="conf-step__selector">{el.title}</span>
      </li>
    ));

    return result.length ? result : <p>Нет доступных залов</p>;
  }

  setPlaceMatrix(rows, p) {
    let places = this.state.selectedHall.places;
    let placeMatrix = matrix(rows, p, 1);

    if (places) {
      places.forEach(place => {
        placeMatrix[place.row_number][place.number] = place.type;
      });

    }

    return placeMatrix;
  }

  render() {
    let hallRows = null;
    let hallScheme = null;

    // @TODO: Это работает только если пустой зал
    if (this.state.selectedHall) {
      hallRows = <HallRows 
        rows={this.state.selectedHallRows || ''} 
        places={this.state.selectedHallPlaces || ''}       
        rowsHandler={this.handleHallRowsChange} 
        placesHandler={this.handleHallPlacesChange} 
      />;
    }

    if (this.state.selectedHallRows && this.state.selectedHallPlaces) {


      hallScheme = <HallScheme 
        hall={this.state.selectedHall}
        rows={this.state.selectedHallRows} 
        places={this.state.selectedHallPlaces} 
        handleCancel={this.handleCancel}
        placeMatrix={this.setPlaceMatrix(this.state.selectedHallRows, this.state.selectedHallPlaces)}
        />;
    }

    return (
        <div>  
          <ul className="conf-step__selectors-box">
            {this.buildHallList()}
          </ul>
          {hallRows}
          {hallScheme}
        </div>
    );
  }
}