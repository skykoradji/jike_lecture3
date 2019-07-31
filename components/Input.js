import React, { Component } from 'react';
import { EntypoPaperPlane } from 'react-entypo';


class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  inputRef = (ref) => {
    this.input = ref;
  }
  /**
   * 6. TODO - focus the input box when component is mounted
   */
  componentDidMount() {
    this.input.focus();
  }

  handleChange(e) {
    const value = e.target.value;
    this.setState({ value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleSendMessage(this.state.value);
    this.setState({ value: '' });
  }

  render() {
    return (
      <form className="text-form" onSubmit={this.handleSubmit}>
        <input
          className="text-input"
          ref={this.inputRef}
          type="text"
          name="inputText"
          placeholder="Enter your message"
          value={this.state.value}
          onChange={this.handleChange}
          autoComplete="false"
          required
        />

        <button className="btn-send" type="submit" value="Send">
          <EntypoPaperPlane /> &nbsp;Send
        </button>
      </form>
    );
  }
}
export default Input;
