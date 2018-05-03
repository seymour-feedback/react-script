import React, { Component } from 'react';

const colours = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

export default class Colour extends Component {

  constructor(props) {
    super(props);
    this.state = {
      colour: 'black'
    };
    this.emitter = props.emitter;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const colour = e.target.value;
    this.emitter.emit('action:colour', {colour});
    this.setState({colour});
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        <option></option>
        {colours.map((e, key) => {
          return <option value={e}>{e}</option>;
        })}
      </select>
    )
  }
};
