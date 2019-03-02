import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const TYPES = ['disabled', 'standart', 'vip'];

function matrix(rows, cols, value) {
  return new Array(parseInt(rows)).fill(new Array(parseInt(cols)).fill(value));
}

export default class HallScheme extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hall: this.props.hall,
      rows: this.props.rows,
      places: this.props.places,
      placeMatrix: matrix(this.props.rows, this.props.places, 1)
    };

    this.changeType = this.changeType.bind(this);
    this.handleSave = this.handleSave.bind(this);
    // this.componentWillMount = this.componentWillMount.bind(this);
  }

  changeType(e) {

    const [row, place] = e.target.getAttribute('data-key').split('_');
    const placeMatrix = this.state.placeMatrix;
    
    let type = parseInt(e.target.getAttribute('data-type'))
    const newType = ++type % 3;

    placeMatrix[row][place] = newType;

    this.setState({
      placeMatrix: placeMatrix
    });

    TYPES.forEach( c =>
      e.target.classList.remove(`conf-step__chair_${c}`)
    );

    e.target.classList.add(`conf-step__chair_${TYPES[newType]}`);
    e.target.setAttribute('data-type', newType);
  }

  buildPlacesScheme() {
    const rows = [];

    for(let i = 0; i < this.state.rows; i++ ) {
      const rowPlaces = [];

      for(let j = 0; j < this.state.places; j++) {
        rowPlaces.push(
          <span 
            key={`${i}_${j}`} data-key={`${i}_${j}`} data-type={1}
            className="conf-step__chair conf-step__chair_standart" 
            onClick={this.changeType}>
          </span>
        );
      }

      rows.push(<div key={i} className="conf-step__row">{rowPlaces}</div>);
    }

    return rows;
  }

  handleSave() {
    console.log('scheme:', this.state);

    const hall = this.state.hall;

    fetch(`/places/add/${hall.id}`,{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify(this.state.placeMatrix)
    }).then(
      resp => console.log(resp)
      // () => document.location.reload() // Don't know how to rerender the Hall list only :-(
    );
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
    // @TODO: fieldset перекинуть в родительский компонент

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

