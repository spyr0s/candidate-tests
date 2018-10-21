import { Http, HttpResponse } from "./Http";

export interface Query {
  [key: string]: string | number;
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

  getCharacters(filters: Query = null, page?: number): Promise<HttpResponse> {
    if (page) {
      filters["page"] = page;
    }
    const filterQuery = filters !== null ? this.createUrlQuery(filters) : "";
    const url = Api.ENDPOINT + "character/" + filterQuery;
    return this.getRequest(url);
  }

  getCharacter(id: number): Promise<HttpResponse> {
    const url = Api.ENDPOINT + "character/" + id;
    return this.getRequest(url);
  }
}
