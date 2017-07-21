// Initializes the `golf-clubs` service on path `/golf-clubs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/golf-clubs.model');
const hooks = require('./golf-clubs.hooks');
const filters = require('./golf-clubs.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'golf-clubs',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/golf-clubs', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('golf-clubs');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
