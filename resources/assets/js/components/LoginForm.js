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

      let formData = new FormData(e.target);

      formData.set('grant_type', 'password');
      formData.set('client_secret', 'O5Wq3Sy8QoEc8i7049WprMBZEpFwzEcWIrMbLORj');
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
          if (resp.error === 'invalid_credentials' ) {
            this.state.error = "Неверный пользователь или пароль";

            this.forceUpdate();
          } else {
            localStorage.setItem('access_token', resp.access_token);

            document.location.href = '/admin';
          }
        }
      );
    }

    componentWillMount() {
      if (localStorage.getItem('access_token')) {
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
            <form className="login__form" action="login_submit" method="post" acceptCharset="utf-8" onSubmit={this.login}>
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