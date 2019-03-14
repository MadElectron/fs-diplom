import React, { Component } from 'react';

/**
 * Hall adding form
 */
export default class HallAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }


  /**
   * Handle form submit
   * @param {Event} e
   */
    handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);

      fetch('/halls/add',{
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: formData
      }).then(
        () => document.location.reload() // Don't know how to rerender the Hall list only :-(
      );

      this.props.handler();
    }

    render() {
      return (
        <form acceptCharset="utf-8" onSubmit={this.handleSubmit}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="name">
            Название зала
            <input className="conf-step__input" type="text" placeholder="Например, &laquo;Зал 1&raquo;" name="title" required/>
          </label>
          <div className="conf-step__buttons text-center">
            <input type="submit" value="Добавить зал" className="conf-step__button conf-step__button-accent" />
            <button className="conf-step__button conf-step__button-regular" onClick={this.props.handler}>Отменить</button>            
          </div>
        </form>
      );

    }
}