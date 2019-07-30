import React, { Component } from 'react';
import Header from './Header';
import Dialog from './Dialog';
import Input from './Input';
import '../css/main.css';


export default class ReactBot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      messages: [],
      dialogHeight: 300,
      isOpen: props.isOpen !== undefined ? props.isOpen : true,
      isMinimized: props.isMinimized !== undefined ? props.isMinimized : true
    };

    this.handleResize = this.handleResize.bind(this);

    this.handleToggle = this.handleToggle.bind(this);
  }

  /**
   * 11. TODO - add send message
   * 
   */

  handleResize(e) {
    const window = e.target || e;
    const y = window.innerHeight;
    const header = document.querySelector('.container header');
    const input = document.querySelector('.container .text-form');
    let dialogHeight = y - header.offsetHeight - input.offsetHeight;
    if (dialogHeight < 0 || !dialogHeight) {
      dialogHeight = 0;
    } else if (this.props.dialogHeightMax && dialogHeight > this.props.dialogHeightMax) {
      dialogHeight = this.props.dialogHeightMax;
    }
    this.setState({ dialogHeight });
  }

  handleToggle() {
    if (this.state.isMinimized) {
      this.setState({ isOpen: !this.state.isOpen });
    } else {
      this.setState({ isMinimized: true });
    }
  }

  /**
   * 9. TODO - add component resize when component is mounted
   */

  /**
   * 10. TODO - remove component resize when component is unmounted
   */


  render() {
    /**
     * 8. TODO - change to use destructing
     */
    return (
      <div
        className="container"
        style={this.state.isMinimized ? { display: 'block' } : { display: 'none' }}
      >
        <Header title={this.state.title} onClick={this.handleToggle} />
        <div
          style={
            this.state.isOpen
              ? { minHeight: `${this.state.dialogHeight}px` }
              : { maxHeight: 0, overflow: 'hidden' }
          }
        >
          <Dialog
            messages={this.state.messages}
            dialogHeight={this.state.dialogHeight}
          />
          <Input />
        </div>
      </div>
    );
  }
}
