import axios from 'axios'
import HttpResponse from '../response'

export default class HttpClient {
  static get instance() {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_PUBLIC_BASE_API
    })
    const token = localStorage.getItem('userToken')

    instance.interceptors.request.use(
      config => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }

        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
    instance.interceptors.response.use(
      response => {
        return response
      },
      async function (error) {
        return Promise.reject(error)
      }
    )

    return instance
  }

  static async get(url) {
    try {
      const request = await HttpClient.instance.get(url)

      return new HttpResponse(request)
    } catch (error) {
      if (error.response) {
        return new HttpResponse(error.response)
      }

      return new HttpResponse({ status: 500 })
    }
  }

  static async post(url, data, headers = null) {
    try {
      const request = await HttpClient.instance.post(url, data, headers)

      return new HttpResponse(request)
    } catch (error) {
      if (error.response) {
        return new HttpResponse(error.response)
      }

      return new HttpResponse({ status: error })
    }
  }

  static async patch(url, data) {
    try {
      const request = await HttpClient.instance.patch(url, data)

      return new HttpResponse(request)
    } catch (error) {
      if (error.response) {
        return new HttpResponse(error.response)
      }

      return new HttpResponse({ status: 500 })
    }
  }

  static async put(url, data) {
    try {
      const request = await HttpClient.instance.put(url, data)

      return new HttpResponse(request)
    } catch (error) {
      if (error.response) {
        return new HttpResponse(error.response)
      }

      return new HttpResponse({ status: 500 })
    }
  }

  static async delete(url) {
    try {
      const request = await HttpClient.instance.delete(url)

      return new HttpResponse(request)
    } catch (error) {
      if (error.response) {
        return new HttpResponse(error.response)
      }

      return new HttpResponse({ status: 500 })
    }
  }
}
