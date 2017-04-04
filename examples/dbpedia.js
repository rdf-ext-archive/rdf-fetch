const rdfFetch = require('..')

rdfFetch('http://dbpedia.org/resource/Eiffel_Tower').then((res) => {
  return res.dataset()
}).then((dataset) => {
  console.log(dataset.toString())
}).catch((err) => {
  console.error(err.stack || err.message)
})
