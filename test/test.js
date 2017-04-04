/* global describe, it */

const assert = require('assert')
const nock = require('nock')
const rdf = require('rdf-ext')
const rdfFetch = require('..')

describe('rdf-fetch', () => {
  it('should be a function', () => {
    assert.equal(typeof rdfFetch, 'function')
  })

  it('should have a defaults object', () => {
    assert.equal(typeof rdfFetch.defaults, 'object')
  })

  it('should return a Promise object', () => {
    let result = rdfFetch('http://example.org/')

    assert.equal(typeof result, 'object')
    assert.equal(typeof result.then, 'function')
  })

  it('should use common formats', () => {
    nock('http://example.org')
      .get('/formats-common')
      .reply(200, function () {
        assert.equal(this.req.headers.accept, [
          'application/ld+json',
          'application/n-triples',
          //'application/rdf+xml',
          'text/n3',
          'text/turtle'
        ].join(', '))

        return [200, '{}']
      })

    return rdfFetch('http://example.org/formats-common')
  })

  it('should use formats given in options', () => {
    nock('http://example.org')
      .get('/formats-options')
      .reply(200, function () {
        assert.equal(this.req.headers.accept, 'application/ld+json, text/turtle')
      })

    let customFormats = {
      parsers: new rdf.Parsers({
        'application/ld+json': {parse: () => {}},
        'text/turtle': {parse: () => {}}
      })
    }

    return rdfFetch('http://example.org/formats-options', {formats: customFormats})
  })

  it('should not replace the accept header', () => {
    nock('http://example.org')
      .get('/accept-header')
      .reply(200, function () {
        assert.equal(this.req.headers.accept, 'application/n-triples')

        return [200, '{}']
      })

    return rdfFetch('http://example.org/accept-header', {headers: {accept: 'application/n-triples'}})
  })
})
