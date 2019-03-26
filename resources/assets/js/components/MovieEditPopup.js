import React, { Component } from 'react';
import MovieEditForm from './MovieEditForm';

/**
 * Movie adding popup on admin page
 */
export default class MovieEditPopup extends Component {
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

      this.props.resetPopups();
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
                    Редактирование фильма
                    <a className="popup__dismiss" href="#" onClick={this.close}><img src="i/close.png" alt="Закрыть" /></a>
                  </h2>

                </div>
                <div className="popup__wrapper">
                  <MovieEditForm handler={this.close} editedMovie={this.props.editedMovie} handleDelete={this.props.handleDelete} />
                </div>
              </div>
            </div>
          </div>
        );
    }
}