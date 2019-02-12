import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallManagementBlock from './HallManagementBlock';
import HallConfigurationBlock from './HallConfigurationBlock';
import HallPriceBlock from './HallPriceBlock';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    }
  }

  getHallList() {
    return fetch('/halls/list',{
      method: "POST",
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      },
    }).then(
      resp => resp.json()
    );
  }

  componentDidMount() {
    this.getHallList()
      .then(json => {
        this.setState(
          {data : json
        });
      });
  }

  render() {
    return (
      <div>
      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Управление залами</h2>
        </header>

        <HallManagementBlock data={this.state.data} />
        
      </section>
      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Конфигурация залов</h2>
        </header>
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>

          <HallConfigurationBlock data={this.state.data} />

        </div>    
      </section>
      <section className="conf-step">
        <header className="conf-step__header conf-step__header_opened">
          <h2 className="conf-step__title">Конфигурация цен</h2>
        </header>
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>

          <HallPriceBlock data={this.state.data} />    
          
        </div>
      </section>
    </div>
    );
  }
}

if (document.getElementById('app')) {
  ReactDOM.render(<App />, document.getElementById('app'));
}