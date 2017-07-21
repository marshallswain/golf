const { authenticate } = require('feathers-authentication').hooks;
const commonHooks = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { iff, populate } = require('feathers-hooks-common')

const { hashPassword } = require('feathers-authentication-local').hooks;
const restrict = [
  authenticate('jwt'),
  restrictToOwner({
    idField: '_id',
    ownerField: '_id'
  })
];

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [
      ...restrict
    ],
    create: [ hashPassword() ],
    update: [ ...restrict, hashPassword() ],
    patch: [ ...restrict, hashPassword() ],
    remove: [ ...restrict ]
  },

  after: {
    all: [
      commonHooks.when(
        hook => hook.params.provider,
        commonHooks.discard('password')
      )
    ],
    find: [],
    get: [
      iff(
        context => context.params.user && context.params.user._id,
        // function manuallyPopulateGolfClubs (context) {
        //   const { user } = context.params
        //   return context.app.service('golf-clubs').find({
        //     query: { _id: { $in: user.golfClubIds } },
        //     paginate: false
        //   }).then(result => {
        //     context.result.golfClubs = result
        //     return context
        //   })
        // }
        populate({schema: {
          include: {
            service: 'golf-clubs',
            nameAs: 'golfClubs', // name of the field in the user results
            parentField: 'golfClubIds', // name of the field holding the keys we want to populate
            childField: '_id', // Name of the field with the matching keys in the golf-clubs service
            asArray: true
          }
        }})
      )
    ],
    create: [],
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
