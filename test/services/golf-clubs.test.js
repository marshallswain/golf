const assert = require('assert');
const app = require('../../src/app');

describe('\'golf-clubs\' service', () => {
  it('registered the service', () => {
    const service = app.service('golf-clubs');

    assert.ok(service, 'Registered the service');
  });
});
