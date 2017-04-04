const rdf = require('rdf-ext')
const rdfFetch = require('..')

let subject = rdf.blankNode()

let dataset = rdf.dataset([
  rdf.quad(
    subject,
    rdf.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    rdf.namedNode('http://www.markus-lanthaler.com/hydra/api-demo/vocab#User')
  ),
  rdf.quad(
    subject,
    rdf.namedNode('http://www.markus-lanthaler.com/hydra/api-demo/vocab#User/name'),
    rdf.literal('test name')
  ),
  rdf.quad(
    subject,
    rdf.namedNode('http://www.markus-lanthaler.com/hydra/api-demo/vocab#User/email'),
    rdf.literal('test@test.com')
  ),
  rdf.quad(
    subject,
    rdf.namedNode('http://www.markus-lanthaler.com/hydra/api-demo/vocab#User/password'),
    rdf.literal('testpassword')
  )
])

rdfFetch('http://www.markus-lanthaler.com/hydra/api-demo/users/', {
  method: 'post',
  headers: {'Content-Type': 'application/ld+json', 'Accept': 'application/ld+json'},
  body: dataset.toStream()
}).then((res) => {
  console.log(res.status)

  return res.dataset()
}).then((result) => {
  console.log(result.toString())
}).catch((err) => {
  console.error(err.stack || err.message)
})
