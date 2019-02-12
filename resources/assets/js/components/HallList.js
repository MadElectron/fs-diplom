import React, { Component } from 'react';

export default class HallList extends Component {
    render() {
        // console.log('I was triggered during render');
        return (
          <ul class="conf-step__list">
            <li>Зал 1
              <button class="conf-step__button conf-step__button-trash"></button>
            </li>
            <li>Зал 2
              <button class="conf-step__button conf-step__button-trash"></button>
            </li>
          </ul>
        );
    }
}