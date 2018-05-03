import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Canvas extends Component {

  constructor(props) {
    super(props);

    this.emitter = props.emitter;

    this.state = {
      prevX: 0,
      currX: 0,
      prevY: 0,
      currY: 0,
      isDrawing: false,
      type: false,
      colour:  '#000',
      size: 1
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseOff = this.handleMouseOff.bind(this);
  }

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.emitter.on('action', this.setState.bind(this));
  }

  componentWillUnmount() {
    this.emitter.off('action');
  }

  handleMouseOff() {
    this.setState({isDrawing: false});
  }

  handleMouseMove(event) {
    if (this.state.type === 'sketch' &&  this.state.isDrawing) {
      this.state.prevX = this.state.currX;
      this.state.prevY = this.state.currY;
      this.state.currX = event.clientX;
      this.state.currY = event.clientY;
      this.draw();
    }
  }

  handleMouseDown(event) {
    if (this.state.type === 'sketch') {
      this.setState({isDrawing: true});
      this.state.prevX = this.state.currX;
      this.state.prevY = this.state.currY;
      this.state.currX = event.clientX;
      this.state.currY = event.clientY;
      this.ctx.beginPath();
      this.ctx.fillStyle = this.state.colour;
      this.ctx.fillRect(this.state.currX, this.state.currY, 2, 2);
      this.ctx.closePath();
    } else if (this.state.type === 'comment') {
      this.emitter.emit('add-comment', {
        left: event.clientX,
        top: event.clientY
      });
    }
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.state.prevX, this.state.prevY);
    this.ctx.lineTo(this.state.currX, this.state.currY);
    this.ctx.strokeStyle = this.state.colour;
    this.ctx.lineWidth = this.state.size;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  render() {
    const width = this.props.width || 0;
    const height = this.props.height || 0;
    return (
      <canvas
        ref="canvas"
        id="seymour-canvas"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseOff}
        onMouseOut={this.handleMouseOff}
        width={width}
        height={height}
      >
      </canvas>
    );
  }

}
