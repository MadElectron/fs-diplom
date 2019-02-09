import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import HallAddButton from './HallAddButton';
import HallAddPopup from './HallAddPopup';

export default class HallManagementBlock extends Component {
    constructor(props) {
      super(props);

      this.state = {
        popupOn: false
      };

      this.handleClick = this.handleClick.bind(this);

    }

    handleClick() {
      console.log('click');
      this.setState({
        popupOn: !this.state.popupOn
      });
    }

    componentDidUpdate() {
      console.log('update');
        if (document.getElementById('popups')) {
          console.log('rerender');
          ReactDOM.render(<HallAddPopup active={this.state.popupOn}/>, document.getElementById('popups'));
        }
    }

    render() {

      return (
        <div>
          <HallAddButton handler={this.handleClick} />
        </div>
      );
    }
}

if (document.getElementById('root')) {
  ReactDOM.render(<HallManagementBlock />, document.getElementById('root'));
}