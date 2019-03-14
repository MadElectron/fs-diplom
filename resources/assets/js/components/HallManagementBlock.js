import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallAddPopup from './HallAddPopup';
import HallDeletePopup from './HallDeletePopup';


/**
 * Admin hall management block component
 */
export default class HallManagementBlock extends Component {
    constructor(props) {
      super(props);

      this.state = {
        createPopupOn: false, // Create popup show status
        deletePopupOn: false, // Delete popup show status
        data:          null,  // Halls list
        deleteId:      null,  // Deleted hall id
      };

      this.handleCreateClick = this.handleCreateClick.bind(this);
      this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }


    /**
     * Convert hall list to JSX
     * @return {Array} result
     */
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

    /**
     * Handle create button click
     */
    handleCreateClick() {
      this.setState({
        createPopupOn: true
      });
    }

    /**
     * Handle delete button click
     */
    handleDeleteClick(el, e) {
      this.setState({
        deletePopupOn: true,
        deletedHall: el
      }); 
    }

    componentDidUpdate() {
        if (document.getElementById('popups')) {
          // After updating add popups to page

          ReactDOM.render(
            <div>
              <HallAddPopup active={this.state.createPopupOn}/>
              <HallDeletePopup active={this.state.deletePopupOn} deletedHall={this.state.deletedHall}/>
            </div>
            , document.getElementById('popups'));
        }
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