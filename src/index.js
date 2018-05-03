import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';

const container = document.createElement('div');
container.id = 'seemore-container';
document.body.insertBefore(container, document.body.firstChild);

const app = <App width={document.body.clientWidth} height={window.outerHeight} />;

ReactDOM.render(
  app,
  container
);
