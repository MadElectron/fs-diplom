import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/** 
  * Place types
  * @constant
  * @type {Array}
  * @default
*/
const TYPES = ['disabled', 'standart', 'vip'];

/**
 * Admin hall scheme block component
 */
export default class HallScheme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hall: this.props.hall,                // Selected hall
      rows: this.props.rows,                // Selected hall rows count
      places: this.props.places,            // Selected hall places count
      placeMatrix: this.props.placeMatrix   // Selected hall place matrix
    };

    this.changeType = this.changeType.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }



  // ====== Primary methods =====

  /**
   * Change place type
   * @param {Event} e
   */
  changeType(e) {

    const [row, place] = e.target.getAttribute('data-key').split('_').map(x => parseInt(x));
    const placeMatrix = this.state.placeMatrix;
    
    let type = parseInt(e.target.getAttribute('data-type'))
    const newType = ++type % 3;   // Cycling types

    placeMatrix[row][place] = newType;

    this.setState({
      placeMatrix: placeMatrix
    });

    // Setting selected type to place DOM Node

    TYPES.forEach( c =>
      e.target.classList.remove(`conf-step__chair_${c}`)
    );

    e.target.classList.add(`conf-step__chair_${TYPES[newType]}`);
    e.target.setAttribute('data-type', newType);
  }


  /**
   * Convert places object to JSX
   */
  buildPlacesScheme() {
    const rows = [];

    for(let i = 0; i < this.state.rows; i++ ) {
      const rowPlaces = [];

      for(let j = 0; j < this.state.places; j++) {
        rowPlaces.push(
          <span 
            key={`${i}_${j}`} data-key={`${i}_${j}`} data-type={this.state.placeMatrix[i][j]}
            className={`conf-step__chair conf-step__chair_${TYPES[this.state.placeMatrix[i][j]]}`} 
            onClick={this.changeType}>
          </span>
        );
      }

      rows.push(<div key={i} className="conf-step__row">{rowPlaces}</div>);
    }

    return rows;
  }


  // ====== Handlers ======


  /**
   * Hall save button click
   */
  handleSave() {
    const hall = this.state.hall;

    fetch(`/places/add/${hall.id}`,{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify(this.state.placeMatrix)
    }).then(
      () => document.location.reload() // Don't know how to rerender the Hall list only :-(
    );
  }


  // ====== Events ======

  componentWillReceiveProps(nextProps) {
    this.setState({
      rows: nextProps.rows,
      places: nextProps.places,      
      placeMatrix: nextProps.placeMatrix
    });
  }

  componentWillMount() {
    this.setState({
      placeMatrix: this.props.placeMatrix
    });
  }

  componentWillUnmount() {
    console.log('will unmount');
    this.setState({
      hall: null,
      rows: null,
      places: null,
      placeMatrix: [],
      
    });
  }

  render() {
    return (
      <div>
        <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
        <div className="conf-step__legend">
          <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
          <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
          <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
          <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
        </div>  
        
        <div className="conf-step__hall">
          <div className="conf-step__hall-wrapper">
            {this.buildPlacesScheme()}
          </div>  
        </div>
        
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular" onClick={this.props.handleCancel}>Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" onClick={this.handleSave} />
        </fieldset>        
      </div>
    );
  }
}

