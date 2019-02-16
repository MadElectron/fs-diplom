import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallScheme from './HallScheme';
import HallRows from './HallRows';

export default class HallConfigurationBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
    });            
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

  render() {
    let hallRows = null;
    let hallScheme = null;

    // @TODO: Это работает только если пустой зал
    if (this.state.selectedHall) {
      hallRows = <HallRows 
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