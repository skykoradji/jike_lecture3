import React, { Component } from 'react';

import ReactBot from '../components/ReactBot';
import '../static/css/demo.css';

/**
 * 1. TODO - update to use function bind for the ref
 */
class APP extends Component {
  constructor(props) {
    super(props);
    this.handleToggle = this.handleToggle.bind(this);
  }

  reactBotRef = (ref) => {
    this.chatRef = ref;
  }

  handleToggle() {
    this.chatRef.handleToggle();
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <button onClick={this.handleToggle}>Toggle Chat</button>
        <ReactBot
          dialogHeightMax={350}
          isMinimized={false}
          title="Test"
          ref={this.reactBotRef}
        />
      </div>
    );
  }
}

export default APP;
