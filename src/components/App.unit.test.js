import App from './App.js';

describe.only('App', () => {
  describe('updateComment', () => {
    test('with state argument', () => {
      const app = new App();
      app.setState = jest.fn();
      app.updateComment({id: '1234'})
      expect(app.setState).toHaveBeenCalledWith({})
    });
  })
})
