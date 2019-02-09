import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CreateHallForm extends Component {
    

    render() {
        // console.log('I was triggered during render');
        return (
            <button className="conf-step__button conf-step__button-accent">
                Создать зал
            </button>
            );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<CreateHallForm />, document.getElementById('root'));
}