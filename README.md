# RDF-Ext Fetch

[![Build Status](https://travis-ci.org/rdf-ext/rdf-fetch.svg?branch=master)](https://travis-ci.org/rdf-ext/rdf-fetch)
[![npm version](https://badge.fury.io/js/rdf-fetch.svg)](https://badge.fury.io/js/rdf-fetch)

Uses [Fetch](https://fetch.spec.whatwg.org/) to send and receive [RDFJS quad streams](https://github.com/rdfjs/representation-task-force/) over HTTP.
`rdf-format-commons` is used to serialize and parse the quads.

## Usage

`rdf-fetch` serializes the quad stream given in the `body` options based on the `Content-Type` header, `rdfFetch.defaults.contentType` or the first serializer found in the formats bundle.
The response object contains the `quadStream` methods which returns parser stream as a `Promise`.

    const rdfFetch = require('rdf-fetch')

    rdfFetch('http://...', {method: 'post', body: requestStream}).then((response) => {
      return response.quadStream()
    }).then((responseStream) => {
      ...
    })

The `dataset` method of the response pipes the quad stream into a Dataset and returns it as a `Promise`.


    rdfFetch('http://...', {method: 'post', body: requestStream}).then((response) => {
      return response.dataset()
    }).then((dataset) => {
      ...
    })

## Examples

The examples folder contains examples how to send and receive quads.

## Options

- `fetch` can be used to replace the default [isomorphic-fetch](https://www.npmjs.com/package/isomorphic-fetch) Fetch library.
- `formats` can be used to replace the default parser and serializer bundle [rdf-formats-commons](https://www.npmjs.com/package/rdf-formats-common).
