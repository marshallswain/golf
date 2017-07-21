const feathers = require('feathers/client')
const io = require('socket.io-client')
const axios = require('axios')
const rest = require('feathers-rest/client')
const socketio = require('feathers-socketio/client')
const auth = require('feathers-authentication-client')
const hooks = require('feathers-hooks')

const host = 'http://localhost:3333'

function makeClient (transport = 'socketio') {
  const feathersClient = feathers()

  if (transport === 'socketio') {
    var socket = io(host, {
      transports: ['websocket']
    })
    feathersClient.configure(socketio(socket))
  }
  if (transport === 'rest') {
    feathersClient.configure(rest(host).axios(axios))
  }

  feathersClient.configure(hooks())
    .configure(auth())

  return feathersClient
}

module.exports = [
  makeClient('socketio'),
  makeClient('rest')
]
