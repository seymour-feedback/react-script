import React, { Component } from 'react';

const types = [{
  value: 'sketch',
  title: 'Sketch'
}, {
  value: 'comment',
  title: 'Comment'
}];

export default class Type extends Component {

  constructor(props) {
    super(props);
    this.emitter = props.emitter;
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const type = e.target.value;
    this.emitter.emit('action', {type});
  }

  render() {
    return (
      <select onChange={this.handleChange}>
        <option>Choose</option>
        {types.map(type => {
          return <option value={type.value}>{type.title}</option>;
        })}
      </select>
    )
  }
}

