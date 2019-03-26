import React, { Component } from 'react';

/**
 * Movie adding form
 */
export default class MovieEditForm extends Component {
    constructor(props) {
      super(props);

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    // /**
    //  * Preview uploaded image file
    //  */
    // previewFile() {
    //   let preview = document.getElementById('preview');
    //   let file    = document.querySelector('input[name="image"]').files[0];
    //   let reader  = new FileReader();

    //   reader.onloadend = function () {
    //       preview.src = reader.result;
    //   }

    //   if (file) {
    //       reader.readAsDataURL(file);
    //   } else {
    //       preview.src = "";
    //   }      
    // }


    /**
     * Handle form submit
     * @param {Event} e
     */
    handleSubmit(e) {
      e.preventDefault();

      console.log('Editing')

      const formData = new FormData(e.target);

      fetch(`/movies/edit/${this.props.editedMovie.id}`,{
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
      console.log(this.props.editedMovie);

      if (!this.props.editedMovie) 
        return null;

      return (
        <form action="add_movie" method="post" acceptCharset="utf-8" onSubmit={this.handleSubmit}>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="title">
            Название фильма
            <input className="conf-step__input" defaultValue={this.props.editedMovie.title}
              type="text" placeholder="Например, &laquo;Гражданин Кейн&raquo;" name="title" required/>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="country">
            Страна происхождения
            <input className="conf-step__input" defaultValue={this.props.editedMovie.country}
            type="text" placeholder="Например, &laquo;США&raquo;" name="country" required/>
          </label>          
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="description">
            Описание(синопсис) фильма
            <textarea className="conf-step__input" type="text" name="description" defaultValue={this.props.editedMovie.description} required>
              
            </textarea>
          </label>
          <label className="conf-step__label conf-step__label-fullsize" htmlFor="duration"> 
            Длительность, мин.
            <input className="conf-step__input" defaultValue={this.props.editedMovie.duration}
              type="number" min="0" name="duration" required/>
          </label>
          <img id="preview" src={`i/posters/${this.props.editedMovie.id}.jpg`} height="150"/>
          <div className="conf-step__buttons text-center">
            <input type="submit" defaultValue="Сохранить" className="conf-step__button conf-step__button-accent" />
            <button className="conf-step__button conf-step__button-regular" onClick={this.props.handler}>Отменить</button>            
            <button className="conf-step__button conf-step__button-danger" onClick={this.props.handleDelete}>Удалить</button>            
          </div>
        </form>
      );

    }
}