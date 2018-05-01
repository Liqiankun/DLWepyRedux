import wepy from 'wepy'
import Tips from './tips'
const USER_TOKEN_KEY = 'user_token_key'
export default class WXRequest {
  static async request (method, url, data, loading = true) {
    if (loading) {
      Tips.navLoading()
    }
    let reqURL = 'https://still-castle-28094.herokuapp.com/todos' + url
    return wepy.request({
      url: reqURL,
      method: method || 'GET',
      data: data,
      header: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      Tips.loaded()
      if (res.statusCode >= 200 && res.statusCode < 400) {
        return res.data
      } else {
        var error = {}
        error.statusCode = res.statusCode
        error.code = res.data.code
        error.message = res.data.error
        Tips.error(error.message)
        throw error
      }
    })
  }

  static get (url, data, loading = true) {
    return this.request('GET', url, data, loading)
  }

  static put (url, data, loading = true) {
    return this.request('PUT', url, data, loading)
  }

  static post (url, data, loading = true) {
    return this.request('POST', url, data, loading)
  }

  static patch (url, data, loading = true) {
    return this.request('PATCH', url, data, loading)
  }

  static delete (url, data, loading = true) {
    return this.request('DELETE', url, data, loading)
  }
}
