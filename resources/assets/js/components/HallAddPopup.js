import React, { Component } from 'react';
import HallAddForm from './HallAddForm';

/**
 * Hall adding popup on admin page
 */
export default class HallAddPopup extends Component {
    constructor(props) {
      super(props);

      this.state = {
        active: this.props.active   // Popup show status
      }

      this.close = this.close.bind(this);
    }


    /**
     * Popup close handling
     * @param {Event} e
     */
    close(e) {
      if (e !== undefined) { // Popup closed manually
        e.preventDefault();
      }

      this.setState({
        active: false
      });
    }

    componentWillReceiveProps(props) {
      this.setState({
        active: props.active
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
                      <a className="popup__dismiss" href="#" onClick={this.close}><img src="i/close.png" alt="Закрыть" /></a>
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