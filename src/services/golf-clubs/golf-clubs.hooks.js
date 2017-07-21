const { authenticate } = require('feathers-authentication').hooks;

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      hook => {
        console.log(hook)
      }
    ],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      hook => {
        const { user } = hook.params
        return hook.app.service('users').patch(user._id, { $push: { golfClubIds: hook.result._id } })
          .then(result => hook)
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
