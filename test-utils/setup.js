'use strict'

const app = require('../src/app')

let server

before(done => {
  const port = app.get('port')
  server = app.listen(port)
  server.once('listening', () => {
    setTimeout(done, 500)
  })
})

after(done => {
  server.close()
  done()
})
