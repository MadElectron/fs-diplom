import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallScheme from './HallScheme';
import HallRows from './HallRows';


/**
 * Admin hall configuration block component
 */
export default class HallConfigurationBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      halls:              this.props.data,   // Halls list
      selectedHall:       null,              // Selected hall
      selectedHallRows:   null,              // Selected hall rows count
      selectedHallPlaces: null,              // Selected hall columns count
    };

    this.handleHallSelect = this.handleHallSelect.bind(this);
    this.handleHallRowsChange = this.handleHallRowsChange.bind(this);
    this.handleHallPlacesChange = this.handleHallPlacesChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }



  // ====== Primary methods =====

  /**
   * Convert halls object to JSX
   * @param {Event} e
   */
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


  // ====== Handlers ======


  /**
   * Hall radio click
   * @param {Object} el
   * @param {Event} e
   */
  handleHallSelect(el, e) {
    this.setState({
      selectedHall: el,
      selectedHallRows: el.rows || null,
      selectedHallPlaces: el.places_in_row || null,
    });            

    this.forceUpdate();
  }


  /**
   * Hall rows input change
   * @param {Event} e
   */
  handleHallRowsChange(e) {
    this.setState({
      selectedHallRows: e.target.value,
    });            
  }  


  /**
   * Hall places in row input change
   * @param {Event} e
   */
  handleHallPlacesChange(e) {
    this.setState({
      selectedHallPlaces: e.target.value,
    });            
  }  


  /**
   * Hall cancel button click
   */
  handleCancel() {
    this.setState({
      selectedHallRows: null,
      selectedHallPlaces: null,
    });
  }


  // ====== Helpers ======

  /**
   * Make matrix of {value} with dimensions {rows}x{cols}
   * @param {number} rows
   * @param {number} cols
   * @param {number} value
   */
  matrix(rows, cols, value) {
    return Array(parseInt(rows)).fill(0).map(x => Array(parseInt(cols)).fill(value));
  }

 /**
   * Make matrix with place types set
   * @param {number} rows
   * @param {number} cols
   */
  setPlaceMatrix(rows, cols) {
    let places = this.state.selectedHall.places;
    let placeMatrix = this.matrix(rows, cols, 1);

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

    if (this.state.selectedHall) {
      // Show hall inputs only if hall chosen

      hallRows = <HallRows 
        rows={this.state.selectedHallRows || ''} 
        places={this.state.selectedHallPlaces || ''}       
        rowsHandler={this.handleHallRowsChange} 
        placesHandler={this.handleHallPlacesChange} 
      />;
    }

    if (this.state.selectedHallRows && this.state.selectedHallPlaces) {
      // Show hall scheme only if hall inputs have values

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