import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * Login form
 */
export default class LoginForm extends Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      }

      this.login = this.login.bind(this);
    }

    login(e) {
      e.preventDefault();

      console.log('Loggin in');

      let formData = new FormData(e.target);
  
      this.getSecret()
        .then(secret => {

          formData.set('grant_type', 'password');
          formData.set('client_secret', secret);
          formData.set('client_id', 1);


          fetch('/api/auth/login',{
            method: "POST",
            headers: {
              'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: formData
          }).then(
            resp => resp.json()
          ).then(
            resp => {
              console.log('Login Response')
              if (resp.error === 'invalid_credentials' ) {
                this.state.error = "Неверный пользователь или пароль";

                this.forceUpdate();
              } else {
                localStorage.setItem('access_token', resp.access_token);

                document.location.href = '/admin';
              }
            }
          );
        });


    }

    getSecret() {
      return fetch('/secret/1',{
        method: "POST",
        headers: {
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        },
      }).then(
        resp => resp.text()
      );
    }

    componentWillMount() {
      const token = localStorage.getItem('access_token');
      if (token && token !== "undefined") {
          document.location.href = '/admin';
      }
    }

    render() {
      return (
        <section className="login">
          <header className="login__header">
            <h2 className="login__title">Авторизация</h2>
          </header>
          <div className="login__wrapper">
            <p className="login__error">{this.state.error}</p>
            <form className="login__form" method="post" acceptCharset="utf-8" onSubmit={this.login}>
              <label className="login__label" htmlFor="username">
                E-mail
                <input className="login__input" type="mail" placeholder="example@domain.xyz" name="username" required />
              </label>
              <label className="login__label" htmlFor="password">
                Пароль
                <input className="login__input" type="password" placeholder="" name="password" required />
              </label>
              <div className="text-center">
                <input value="Авторизоваться" type="submit" className="login__button" />
              </div>
            </form>
          </div>
        </section>
      );

    }
}


if (document.getElementById('login')) {
  ReactDOM.render(<LoginForm />, document.getElementById('login'));
}