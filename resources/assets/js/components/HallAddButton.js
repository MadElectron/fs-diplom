import React, { Component } from 'react';

export default class HallAddButton extends Component {


    render() {
        return (
            <button className="conf-step__button conf-step__button-accent" onClick={this.props.handler}>
                Создать зал
            </button>
        );
  }
}
