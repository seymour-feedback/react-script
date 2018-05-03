import React from 'react';
import Canvas from './Canvas.js';

describe('Canvas', () => {

  test('is canvas element', () => {
    const wrapper = shallow(<Canvas />);
    expect(wrapper.is('canvas')).toBe(true);
  });

  test('has default props', () => {
    const wrapper = shallow(<Canvas />);
    expect(wrapper.props()).toEqual({
      width: 0,
      height: 0
    });
  });

  test('can set props', () => {
    const wrapper = shallow(<Canvas width="500" height="500" />);
    expect(wrapper.props()).toEqual({
      width: "500",
      height: "500"
    });
  });

  test('setDrawingState', () => {
    const wrapper = shallow(<Canvas />);
    expect(wrapper.em.emit());
  });
});
