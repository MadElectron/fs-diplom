import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallAddPopup from './HallAddPopup';
import HallDeletePopup from './HallDeletePopup';

export default class HallManagementBlock extends Component {
    constructor(props) {
      super(props);

      this.state = {
        createPopupOn: false,
        deletePopupOn: false,
        data: null,
        deleteId: null,
      };

      this.handleCreateClick = this.handleCreateClick.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
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

    componentDidUpdate() {
        if (document.getElementById('popups')) {

          ReactDOM.render(
            <div>
              <HallAddPopup active={this.state.createPopupOn}/>
              <HallDeletePopup active={this.state.deletePopupOn} deletedHall={this.state.deletedHall}/>
            </div>
            , document.getElementById('popups'));
        }
    }

    buildHallList() {
      if (!this.props.data) {
        return null;
      }

      const result = [];

      this.props.data.forEach((el, index) => result.push(
        <li key={index}>
          {el.title} 
          <button className="conf-step__button conf-step__button-trash" onClick={e => this.handleDeleteClick(el, e)}></button>
          </li>
      ));

      return result.length ? result : <p>Нет доступных залов</p>;
    }

    render() {
      return (
        <div className="conf-step__wrapper">
          <div>
            <ul className="conf-step__list">
              <p className="conf-step__paragraph">Доступные залы:</p>
              {this.buildHallList()}
            </ul>
            <button className="conf-step__button conf-step__button-accent" onClick={this.handleCreateClick}>Создать зал</button>
          </div>
        </div>
      );
    }
}