import React, { Component } from 'react';
import EventEmitter from 'state-event-emitter';
import Canvas from './Canvas.js';
import Type from './Type.js';
import Colour from './Colour.js';
import Size from './Size.js';
import Comment from './Comment.js';
import uuidv1 from 'uuid/v1';

export default class App extends Component {

  constructor() {
    super();
    this.emitter = new EventEmitter();
    this.state = {
      prevX: 0,
      currX: 0,
      prevY: 0,
      currY: 0,
      canDraw: false,
      isDrawing: false,
      colour:  '#000',
      width: 1,
      comments: []
    };
    this.emitter.load(this.state);
    this.emitter.on('action', this.setState.bind(this))
    this.emitter.on('add-comment', this.addComment.bind(this));
    this.emitter.on('update-comment', this.updateComment.bind(this));
    this.emitter.on('remove-comment', this.removeComment.bind(this));
    this.dragOver = this.dragOver.bind(this);
    this.drop = this.drop.bind(this);
  }

  addComment(state) {
    let comment = {
      id: uuidv1(),
      left: state.left,
      top: state.top
    }
    const comments = this.state.comments.concat(comment);
    this.setState({comments: comments});
  }

  updateComment(arg) {
    const comments = this.state.comments;
    const comment = comments.find(c => c.id === arg.id);
    const index = comments.findIndex(c => c.id === arg.id);
    Object.assign(comment, arg);
    comments.splice(index, 1, comment);
    this.setState({comments: comments});
  }

  removeComment(state) {
    const comments = this.state.comments;
    const index = comments.findIndex(comment => comment.id === state.id);
    comments.splice(index, 1);
    this.setState({comments: comments});
  }

  dragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.effectAllowed = "move"
  }

  drop(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"
    e.dataTransfer.effectAllowed = "move"
  }

  render() {
    const width = this.props.width;
    const height = this.props.height;
    const emitter = this.emitter;
    const comments = this.state.comments;
    return (
      <div
        id="seymour-app"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 101
        }}
        onDrop={this.drop}
        onDragOver={this.dragOver}
      >
        <Canvas width={width} height={height} emitter={emitter} />
        {comments.map((c) =>
          <Comment
            key={c.id}
            id={c.id}
            left={c.left}
            top={c.top}
            emitter={emitter}
          />
        )}
        <form
          id='seymour-form'
          name='seymour-form'
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 101
          }}
        >
          <Type emitter={emitter} />
          <Colour emitter={emitter} />
          <Size emitter={emitter} />
        </form>
      </div>
    );
  }
}
