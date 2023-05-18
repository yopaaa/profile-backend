import apiKeys from '../js/config.js'
import ResponseApi from '../js/ResponseApi.js'

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.query.apiKey || req.headers['x-api-key']

  const quotaData = apiKeys[apiKey]
  if (!quotaData) {
    return ResponseApi(req, res, 401, null, ['faulty api key'])
  }

  const now = Date.now()
  if (now > quotaData.resetTime) {
    quotaData.resetTime = now + 24 * 60 * 60 * 1000
    quotaData.remaining = quotaData.limit
  }

  if (quotaData.remaining <= 0) {
    const timeDiff = Math.ceil((quotaData.resetTime - now) / 1000)
    return ResponseApi(req, res, 429, null, [`Rate limit exceeded. Try again in ${timeDiff} seconds.`])
  }

  quotaData.remaining--
  next()
}

export default apiKeyMiddleware
