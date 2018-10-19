export const validResponses = [200, 201, 204];

export interface HttpResponse {
  data: any;
  headers: Headers | null;
}
export abstract class Http {
  protected abstract getDefaultHeaders();

  postRequest(url: string, body: {} = {}, headers: {} = null): Promise<any> {
    if (headers === null) {
      headers = this.getDefaultHeaders();
    }
    return fetch(url, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    }).then(response => {
      if (validResponses.filter(item => item == response.status).length > 0) {
        return response.json().then(data => {
          const httpResponse: HttpResponse = {
            data,
            headers: response.headers
          };
          return new Promise(resolve => {
            resolve(httpResponse);
          });
        });
      }
      throw Error(response.statusText);
    });
  }

  putRequest(url: string, body: {}, headers: {} = {}): Promise<any> {
    if (headers === null) {
      headers = this.getDefaultHeaders();
    }
    return fetch(url, {
      method: "PUT",
      headers: headers,
      body: JSON.stringify(body)
    }).then(response => {
      if (validResponses.filter(item => item == response.status).length > 0) {
        return response.json().then(data => {
          const httpResponse: HttpResponse = {
            data,
            headers: response.headers
          };
          return new Promise(resolve => {
            resolve(httpResponse);
          });
        });
      }
      throw Error(response.statusText);
    });
  }

  getRequest(url: string, headers: {} = null): Promise<any> {
    if (headers === null) {
      headers = this.getDefaultHeaders();
    }
    console.log(url, headers);
    return fetch(url, {
      method: "GET",
      headers: headers
    }).then(response => {
      if (validResponses.filter(item => item == response.status).length > 0) {
        return response.json().then(data => {
          const httpResponse: HttpResponse = {
            data,
            headers: response.headers
          };
          return new Promise(resolve => {
            resolve(httpResponse);
          });
        });
      } else {
        throw Error(response.statusText);
      }
    });
  }

  deleteRequest(url: string, headers: {} = null): Promise<void> {
    if (headers === null) {
      headers = this.getDefaultHeaders();
    }
    return fetch(url, {
      method: "DELETE",
      headers: headers
    }).then(response => {
      if (validResponses.filter(item => item == response.status).length > 0) {
        return null;
      }
      throw Error(response.statusText);
    });
  }
}
