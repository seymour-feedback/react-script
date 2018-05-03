import React, { Component } from 'react';

const sizes = [
  '9',
  '11',
  '12',
  '13',
  '14'
];

export default class Size extends Component {

  constructor(props) {
    super(props);
    this.state = {
      width: '11'
    };
    this.emitter = props.emitter;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const size = e.target.value;
    this.emitter.emit('action:size', {width: size});
    this.setState({width: size});
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        <option></option>
        {sizes.map((e, key) => {
          return <option value={e}>{e}</option>;
        })}
      </select>
    )
  }
};
