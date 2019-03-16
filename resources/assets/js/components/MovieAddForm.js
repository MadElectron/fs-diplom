import React, { Component } from 'react';

/**
 * Movie adding form
 */
export default class MovieAddForm extends Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     * Preview uploaded image file
     */
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


    /**
     * Handle form submit
     * @param {Event} e
     */
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
    }


    render() {
      return (
        <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={this.handleSubmit}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="title">
            Название фильма
            <input className="conf-step__input" type="text" placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="title" required/>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="country">
            Страна происхождения
            <input className="conf-step__input" type="text" placeholder="Например, &laquo;США&raquo;" name="country" required/>
          </label>          
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
            Описание(синопсис) фильма
            <textarea className="conf-step__input" type="text" name="description" required></textarea>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration"> 
            Длительность, мин.
            <input className="conf-step__input" type="number" min="0" name="duration" required/>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
            Добавить изображение
            <input className="conf-step__input" type="file" 
              name="image" onChange={this.previewFile} required />
          </label>          
          <img id="preview" src="" height="150" alt="Image preview..." />
          <div className="conf-step__buttons text-center">
            <input type="submit" value="Добавить фильм" className="conf-step__button conf-step__button-accent" />
            <button className="conf-step__button conf-step__button-regular" onClick={this.props.handler}>Отменить</button>            
          </div>
        </form>
      );

    }
}