import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import DialogGroup from './Message';

/**
 * 2. TODO - update the ref to use createRef()
 */
class Dialog extends Component {
  scrollToBottom() {
    const end = ReactDOM.findDOMNode(this.scrollTarget);
    end.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  render() {
    const { dialogHeight, messages } = this.props;
    return (
      <section className="messages-wrapper" style={{ height: `${dialogHeight}px` }}>
        <div className="messages">
          {messages.map((group, i) => (
            <DialogGroup key={i} group={group} />
          ))}
          <div style={{ float: 'left', clear: 'both' }} ref={el => (this.scrollTarget = el)} />
        </div>
      </section>
    );
  }
}
export default Dialog;
