import React, { Component } from 'react';

export default class ShowtimeAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
      e.preventDefault();

      const formData = new FormData(e.target);

      fetch('/movies/add',{
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

    previewFile() {
      let preview = document.getElementById('preview');
      let file    = document.querySelector('input[name="image"]').files[0];
      let reader  = new FileReader();

      reader.onloadend = function () {
          preview.src = reader.result;
      }

      if (file) {
          reader.readAsDataURL(file);
      } else {
          preview.src = "";
      }      
    }

    buildHallList() {

      if (!this.props.halls || !this.props.data) {
        return null;
      }

      const result = [];

      this.props.halls.forEach((el, index) => result.push(
        <option key={el.id} value={el.id} >{el.title}</option>
        // selected={this.props.data.hallId == el.id}
      ));

      return result;      
    }

    render() {
      console.log(this.props.data);
      console.log(this.props.halls);

      return (
        <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={this.handleSubmit}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="title">
            Зал
            <select value={this.props.data ? this.props.data.hallId : ''} className="conf-step__input" type="text" name="title" required>
              {this.buildHallList()}
            </select>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="time">
            Время
            <input className="conf-step__input" type="time" name="start_time" defaultValue={this.props.time} required/>
          </label>          
          
          <div className="conf-step__buttons text-center">
            <input type="submit" value="Добавить сеанс" className="conf-step__button conf-step__button-accent" />
            <button className="conf-step__button conf-step__button-regular" onClick={this.props.handler}>Отменить</button>            
          </div>
        </form>
      );

    }
}