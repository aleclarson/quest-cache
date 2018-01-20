
const quest = require('quest')

const cache = Object.create(null)

exports.fetch = function(url, transform) {
  let headers
  if (arguments.length > 2) {
    headers = arguments[1]
    transform = arguments[2]
  }
  let res = cache[url]
  const req = {
    url,
    headers,
    cached: res !== undefined,
  }
  if (!req.cached) {
    res = quest.fetch(url, headers)
  }
  if (typeof transform == 'function') {
    res = res.then(res => transform(req, res))
  }
  if (!req.cached) {
    cache[url] = res
  }
  return res
}
