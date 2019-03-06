import React, { Component } from 'react';

export default class HallDeleteForm extends Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);
      const url = `/halls/delete/${this.props.deletedHall.id}`;

      fetch(url, {
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
        body: formData
      }).then(
        () => document.location.reload()
      );

      this.props.handler();
    }

    render() {

      let title = null;

      if (this.props.deletedHall !== undefined) {
        title = this.props.deletedHall.title;
      }

      return (
        <form acceptCharset="utf-8" onSubmit={this.handleSubmit}>
          <p className="conf-step__paragraph">Вы действительно хотите удалить зал <span>{title}</span>?</p>
          <div className="conf-step__buttons text-center">
            <input type="submit" value="Удалить" className="conf-step__button conf-step__button-accent" />
            <button className="conf-step__button conf-step__button-regular" onClick={this.props.handler}>Отменить</button>            
          </div>
        </form>
      );

    }
}