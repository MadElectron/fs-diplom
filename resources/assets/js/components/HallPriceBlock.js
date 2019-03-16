import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallPrices from './HallPrices';

/**
 * Admin prices block component
 */
export default class HallPriceBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedHall: null,               // Selected Hall
      selectedHallStandartPrice: null,  // Selected Hall price for standart places
      selectedHallVipPrice: null,       // Selected Hall price for VIP places
    };

   this.handleHallSelect = this.handleHallSelect.bind(this);
   this.handleHallStandartPriceChange = this.handleHallStandartPriceChange.bind(this);
   this.handleHallVipPriceChange = this.handleHallVipPriceChange.bind(this);
   this.handleCancel = this.handleCancel.bind(this);
   this.handleSave = this.handleSave.bind(this);
   this.getPriceByType = this.getPriceByType.bind(this);
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

  /**
   * Get price from Hall property by place type id
   * @param {number} type
   * @return {number}
   */
  getPriceByType(type) {
    let hall = this.state.selectedHall;

    if (hall.prices.length === 0) {
      return '';
    }

    let price = hall.prices.filter(p => p.type === type)[0];

    return price.price;
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
      selectedHallStandartPrice: null,
      selectedHallVipPrice: null,
    });       

    this.forceUpdate();

  }


  /**
   * Hall standart price input change
   * @param {Event} e
   */
  handleHallStandartPriceChange(e) {
    console.log('change')
    this.setState({
      selectedHallStandartPrice: e.target.value,
    });            
  }  


  /**
   * Hall VIP price input change
   * @param {Event} e
   */
  handleHallVipPriceChange(e) {
    this.setState({
      selectedHallVipPrice: e.target.value,
    });            
  }  


  /**
   * Hall cancel button click
   */
  handleCancel() {
    this.setState({
      selectedHallStandartPrice: null,
      selectedHallVipPrice: null,
    });
  }


  /**
   * Hall save button click
   */
  handleSave() {
    const hall = this.state.selectedHall;

    const data = {};

    if (this.state.selectedHallStandartPrice) {
      data[1] = this.state.selectedHallStandartPrice;
    }

    if (this.state.selectedHallVipPrice) {
      data[2] = this.state.selectedHallVipPrice;
    }

      // 1: ,
      // 2: this.state.selectedHallVipPrice

    let action = this.state.selectedHall.prices.length ? 'edit' : 'add';
    console.log(action);

    fetch(`/place-type-prices/${action}/${hall.id}`,{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
      body: JSON.stringify(data)
    }).then(
      resp => console.log(resp)
    );
  }


  render() {
    let hallPrices = null;
    let disabled;

    if (this.state.selectedHall) {
      hallPrices = <HallPrices
          // hall={this.state.selectedHall}
          standartPrice ={this.getPriceByType(1)}
          vipPrice ={this.getPriceByType(2)}
          standartPriceHandler={this.handleHallStandartPriceChange} 
          vipPriceHandler={this.handleHallVipPriceChange}         
      />;
    }

    // if (this.state.selectedHallStandartPrices && this.state.selectedHallVipPrices) {
    //   disabled = 'disabled';
    // } else {
    //   disabled = '';
    // }

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