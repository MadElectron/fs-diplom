import React, { Component } from 'react';

export default class ShowtimeAddForm extends Component {
    constructor(props) {
      super(props);
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
      ));

      return result;      
    }

    render() {
      return (
        <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={this.props.handleSubmit}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="title">
            Зал
            <select defaultValue={this.props.data ? this.props.data.hallId : ''} className="conf-step__input" 
            type="text" name="title" onChange={this.props.handleChangeHall} required>
              {this.buildHallList()}
            </select>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="time">
            Время
            <input className="conf-step__input" type="time"  step="300" name="start_time" defaultValue={this.props.time} 
              onChange={this.props.handleChangeTime} required/>
          </label>          
          
          <div className="conf-step__buttons text-center">
            <input type="submit" value="Добавить сеанс" 
              className="conf-step__button conf-step__button-accent" />
            <button className="conf-step__button conf-step__button-regular" onClick={this.props.handleCancel}>Отменить</button>            
          </div>
        </form>
      );

    }
}