import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Clent component date navigation panel
 */
export default class ClientNav extends Component {
    constructor(props) {
      super(props);

      this.buildDateList = this.buildDateList.bind(this);
    }

  /**
   * Builds JSX from dates
   * @return {Array} result
   */
    buildDateList() {
      if (!this.props.date) {
        return null;
      }

      const result = [];
      let date = new Date();

      for(let i = 0; i<7; i++) {
        let number = date.getDate();
        let day = date.toLocaleString('ru-RU', {weekday: 'short'});
        let dayNum = date.getDay();
        let cl = "page-nav__day" 
          + (this.props.date.toLocaleDateString('en-US') === date.toLocaleDateString('en-US') ? " page-nav__day_chosen" : "")
          + (!i ? " page-nav__day_today" : "")
          + (!(dayNum % 6) ? " page-nav__day_weekend" : "")
        ;

        day = day[0].toUpperCase() + day[1];

        result.push(
          <a key={i} className={cl} href="#" data-date={date.toLocaleDateString('en-US')} onClick={this.props.handleDateChange}>
              <span className="page-nav__day-week">{day}</span><span className="page-nav__day-number">{number}</span>
          </a>
        );

        date.setDate(date.getDate() + 1);
      }

      return result;
    }    

    render() {
      return (
          <nav className="page-nav">
            {this.buildDateList()}
            <a className="page-nav__day page-nav__day_next" href="#">
            </a>
          </nav>
      );
    }

}