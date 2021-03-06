const test = require('tap').test
const path = require('path')
const nano = require('nano')

const secure = require('../')

const url = process.env.COUCH || 'http://localhost:5984'
const dbname = 'couchdb-secure-test'
const couch = nano(url)
const db = couch.use(dbname)

function clear (callback) {
  couch.db.destroy(dbname, callback)
}

test('configure from json', function (t) {
  clear(function () {
    secure(url + '/' + dbname, path.join(__dirname, 'fixtures', 'security.json'), function (error, response) {
      t.notOk(error, 'no error occured')
      t.ok(response.ok, 'response is ok')
      t.end()
    })
  })
})

test('configure from commonjs', function (t) {
  clear(function () {
    secure(url + '/' + dbname, path.join(__dirname, 'fixtures', 'security.js'), function (error, response) {
      t.notOk(error, 'no error occured')
      t.ok(response.ok, 'response is ok')
      t.end()
    })
  })
})

test('configure from commonjs/index', function (t) {
  clear(function () {
    secure(url + '/' + dbname, path.join(__dirname, 'fixtures', 'security'), function (error, response) {
      t.notOk(error, 'no error occured')
      t.ok(response.ok, 'response is ok')
      t.end()
    })
  })
})

test('nano object as url', function (t) {
  secure(db, path.join(__dirname, 'fixtures', 'security.json'), function (error, response) {
    t.notOk(error, 'no error occured')
    t.ok(response.ok, 'response is ok')
    t.end()
  })
})
