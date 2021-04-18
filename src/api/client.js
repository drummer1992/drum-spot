import Request from 'backendless-request'
import drumSpotAPI from './drum-spot'

class Context {
  constructor(userToken) {
    this.userToken = userToken
  }

  setUserToken(userToken) {
    this.userToken = userToken
  }

  apply(req) {
    if (this.userToken) {
      req.set('authorization', this.userToken)
    }

    return req
  }
}

const createClient = (context, serverUrl) => {
  const ApiClient = {}

  const addServerUrl = (path) => {
    return serverUrl && !path.startsWith(serverUrl) ? serverUrl + path : path
  }

  Request.methods.forEach((method) => {
    ApiClient[method] = (path, body) =>
      context.apply(new Request(addServerUrl(path), method, body))
  })

  return ApiClient
}

export default (serverUrl, userToken) => {
  const context = new Context(userToken)

  return {
    api: drumSpotAPI(createClient(context, serverUrl)),
    context,
  }
}
