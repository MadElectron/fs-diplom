import React, { Component } from 'react';
import HallAddForm from './HallAddForm';

export default class HallAddPopup extends Component {
    constructor(props) {
      super(props);

      this.state = {
        active: this.props.active
      }

      this.close = this.close.bind(this);
    }

    close(e) {
      this.setState({
        active: false
      });
    }

    render() {
        let className = "popup";

        if (this.state.active) {
          className += " active";
        }

        return (
            <div className={className}>
              <div className="popup__container">
                <div className="popup__content">
                  <div className="popup__header">
                    <h2 className="popup__title">
                      Добавление зала
                      <a className="popup__dismiss" href="#"><img src="i/close.png" alt="Закрыть" onClick={this.close} /></a>
                    </h2>

                  </div>
                  <div className="popup__wrapper">
                    <HallAddForm handler={this.close}/>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}