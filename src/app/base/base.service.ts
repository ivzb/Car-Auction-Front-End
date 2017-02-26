import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BaseService {

  private serviceUrl: string = 'http://localhost:13165/odata';
  private headers: Headers = new Headers({
    'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  })

  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(
        `${this.serviceUrl}${url}`,
        { headers: this.headers })
      .map(this.checkForErrors)
      .catch(error => Observable.throw(error))
      .map(this.getResult)
  }

  post(url: string, data) {
    return this.http.post(
        `${this.serviceUrl}${url}`,
        JSON.stringify(data),
        { headers: this.headers })
      .map(this.checkForErrors)
      .catch(error => Observable.throw(error))
      .map(this.getResult)
  }

  delete(url: string) {
    return this.http.delete(
        `${this.serviceUrl}${url}`,
        { headers: this.headers })
      .map(this.checkForErrors)
      .catch(error => Observable.throw(error))
      .map(this.getResult)
  }

  private checkForErrors(response: Response) {
    if (response.status >= 200 && response.status < 300) {
      return response
    } else {
      let error = new Error(response.statusText)
      error['response'] = response
      console.log(error)
      throw error
    }
  }

  private getResult(response: Response) {
    let result = response.json()

    if (result.value && Array.isArray(result.value)) {
      result = result['value']
    }

    return result
  }
}