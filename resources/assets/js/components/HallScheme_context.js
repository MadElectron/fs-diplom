import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const MENU_TYPE = 'MULTI';

function collect(props) {
    return { name: props.name };
}

export default class HallScheme extends Component {
  constructor(props) {
    super(props);

  }

  handleClick(e, data, target) {
    console.log(`Clicked on menu ${data.item}`);
    console.log(target);

    let classes = ['standart', 'disabled', 'vip'];

    classes.forEach(c => {
      target.classList.remove(`conf-step__chair_${c}`);
    });

    target.classList.add(`conf-step__chair_${data.item}`);

  }

  builPlacesScheme() {
    const rows = [];

    for(let i = 0; i < this.props.rows; i++ ) {
      const rowPlaces = [];

      for(let j = 0; j < this.props.places; j++) {
        rowPlaces.push(
          <ContextMenuTrigger 
            id={MENU_TYPE} 
            name={'place_' + i + '_' + j}
            holdToDisplay={1000}
            collect={collect}
            attributes={{
              'data-name': i + '_' + j,
              className: 'conf-step__chair conf-step__chair_standart'
            }}
            renderTag={'span'}
            key={i + '_' + j}
            >
            <span></span>
          </ContextMenuTrigger>
        );
      }

      rows.push(<div key={i} className="conf-step__row">{rowPlaces}</div>);
    }

    return rows;
  }

  componentWillMount() {

  };

  contextMenu(e) {
      e.preventDefault();
      addMenu.popup(e.clientX, e.clientY);
  };

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
            {this.builPlacesScheme()}
          </div>  
        </div>
        
        <fieldset className="conf-step__buttons text-center">
          <button className="conf-step__button conf-step__button-regular">Отмена</button>
          <input type="submit" value="Сохранить" className="conf-step__button conf-step__button-accent" />
        </fieldset>        

        <ContextMenu id={MENU_TYPE}>
          <MenuItem onClick={this.handleClick} data={{ item: 'standart' }}>Обычное</MenuItem>
          <MenuItem onClick={this.handleClick} data={{ item: 'vip' }}>VIP</MenuItem>
          <MenuItem onClick={this.handleClick} data={{ item: 'disabled' }}>Заблокировано</MenuItem>
        </ContextMenu>

      </div>
    );
  }
}

