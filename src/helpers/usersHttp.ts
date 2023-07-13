import { httpHeadersFactory } from '../factory/http.factory'
import { api } from './api'
import { Payload } from '../components/Menu'

export class UsersHttpHelper {
  static getAll() {
    return new Promise((resolve, reject) => {
      api.get('/users', { headers: httpHeadersFactory() })
      .then(resolve)
      .catch(reject)
    })
  }

  static registerEmployee(payload: Payload) {
    return new Promise((resolve, reject) => {
      api.post('/users/register', payload, { headers: httpHeadersFactory() })
      .then(resolve)
      .catch(reject)
    })
  }
}