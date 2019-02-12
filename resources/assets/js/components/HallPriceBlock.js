import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallPrices from './HallPrices';

export default class HallConfigurationBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHall: null,
      selectedHallStandartPrice: null,
      selectedHallVipPrice: null,
    };

   this.handleHallSelect = this.handleHallSelect.bind(this);
   this.handleHallStandartPriceChange = this.handleHallStandartPriceChange.bind(this);
   this.handleHallVipPriceChange = this.handleHallVipPriceChange.bind(this);
   this.handleCancel = this.handleCancel.bind(this);
   this.handleSave = this.handleSave.bind(this);
  }

  handleHallSelect(el, e) {
    this.setState({
      selectedHall: el,
    });            
  }

  handleHallStandartPriceChange(e) {
    this.setState({
      selectedHallStandartPrice: e.target.value,
    });            
  }  

  handleHallVipPriceChange(e) {
    this.setState({
      selectedHallVipPrice: e.target.value,
    });            
  }  

  handleCancel() {
    this.setState({
      selectedHallStandartPrice: null,
      selectedHallVipPrice: null,
    });
  }

  handleSave() {
    console.log('prices:', this.state);

    const hall = this.state.selectedHall;

    const data = {
      0: this.state.selectedHallStandartPrice,
      1: this.state.selectedHallVipPrice
    };

    fetch(`/place-type-prices/add/${hall.id}`,{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify(data)
    }).then(
      resp => console.log(resp)
    );
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
    let hallPrices = null;
    let disabled;

    // @TODO: Это работает только если зал без цен

    if (this.state.selectedHall) {
      hallPrices = <HallPrices
          standartPriceHandler={this.handleHallStandartPriceChange} 
          vipPriceHandler={this.handleHallVipPriceChange}         
      />;
    }

    // @ TODO: не работает
    if (this.state.selectedHallStandartPrices && this.state.selectedHallVipPrices) {
      disabled = 'disabled';
    } else {
      disabled = '';
    }

    return (
        <div>
          <ul className="conf-step__selectors-box">
            {this.buildHallList()}
          </ul>
          
          {hallPrices}
        
          <fieldset className="conf-step__buttons text-center">
            <button className="conf-step__button conf-step__button-regular">Отмена</button>
            <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" disabled={disabled} onClick={this.handleSave} />
          </fieldset>  
        </div>
    );
  }

}