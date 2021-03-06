import { Http, HttpResponse } from "./Http";

export interface Query {
  [key: string]: any;
}
export default class Api extends Http {
  static ENDPOINT = "https://rickandmortyapi.com/api/";

  getDefaultHeaders = () => {
    return {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  };

  createUrlQuery(query: Query) {
    let q = [];
    Object.keys(query).forEach((key: string) => {
      query[key] !== null && q.push(key + "=" + query[key]);
    });
    return q.length === 0 ? "" : "?" + q.join("&");
  }

  getCharacters(filters: Query = null): Promise<HttpResponse> {
    const filterQuery = filters !== null ? this.createUrlQuery(filters) : "";
    const url = Api.ENDPOINT + "character/" + filterQuery;
    return this.getRequest(url);
  }
}
