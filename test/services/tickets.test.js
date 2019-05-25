const app = require('../../src/app');

describe('\'tickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('tickets');
    expect(service).toBeTruthy();
  });
});
