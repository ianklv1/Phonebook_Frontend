export default class HttpResponse {
  constructor(response) {
    this.status = response.status
    this.data = response.data
  }
}
