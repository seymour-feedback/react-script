import React, { Component } from 'react';

const commentStyle = {
  color: 'blue',
  backgroundImage: 'url(' + imgUrl + ')',
};


export default class Comment extends Component {

  constructor(props) {
    super(props);
    this.props = props;
    this.state = {
      value: props.value,
      id: props.id,
      left: props.left,
      top: props.top,
      width: 200,
      edit: true,
      colour: props.colour || 'black',
      fontSize: 16
    }
    this.emitter = props.emitter;
    this.handleInput = this.handleInput.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnd = this.dragEnd.bind(this);
  }

  handleInput(e) {
    this.setState({value: e.target.value})
  }

  handleResize(e) {
    this.setState({width: e.target.width})
  }

  handleSave() {
    this.setState({edit: false});
    this.emitter.emit('update-comment', {
      id: this.state.id,
      value: this.state.value
    });
  }

  handleEdit() {
    this.setState({edit: true});
  }

  handleDelete() {
    this.emitter.emit('remove-comment', {
      id: this.state.id
    });
  }

  dragEnd(e) {
    this.setState({
      top: e.clientY - this.state.offsets.offsetTop,
      left: e.clientX - this.state.offsets.offsetLeft
    });
    e.target.style.opacity = "1";
  }

  dragStart(e) {
    e.dataTransfer.dropEffect = "move";
    e.target.style.opacity = "0.4";
    this.setState({
      offsets: {
        offsetTop: e.clientY - e.target.offsetTop,
        offsetLeft: e.clientX - e.target.offsetLeft
      }
    });
  }

  render() {
    const editMode = this.state.edit;
    return (
      <div
        draggable="true"
        onDragStart={this.dragStart}
        onDragEnd={this.dragEnd}
        role="comment"
        id={this.state.id}
        key={this.props.key}
        style={{
          position: 'absolute',
          top: this.state.top,
          left: this.state.left,
          padding: '10px 10px 10px',
          border: '1px solid',
          borderRadius: '4px',
          border: '1px solid',
          borderRadius: '4px',
          background: 'rgba(238, 237, 238, 0.92)',
          boxShadow: 'rgb(102, 102, 102) 1px 1px 3px'
        }}>
        {editMode &&
          <textarea
            autofocus
            placeholder="Comment here..."
            style={{
              background: '#ffffffba',
              fontSize: this.state.fontSize,
              fontFamily: 'Arial',
              color: this.state.colour,
              width: '200px',
              border: '1px solid #000',
              width: this.state.width
            }}
            value={this.state.value}
            onInput={this.handleInput}
            onResize={this.handleResize}
          >
          </textarea>
        }
        {!editMode &&
          <span style={{
            background: 'transparent',
            fontSize: '12px',
            fontFamily: 'Arial',
            width: this.state.width
          }}>
            {this.state.value}
          </span>
        }
        <div>
          {editMode && <button type="button" onClick={this.handleSave}>Save</button>}
          {!editMode && <button type="button" onClick={this.handleEdit}>Edit</button>}
          <button type="button" onClick={this.handleDelete}>Delete</button>
        </div>
      </div>
    )
  }
}
