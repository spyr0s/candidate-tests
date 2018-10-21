import { AnyAction } from "redux";
import { RickAndMorty } from "../../app/namespaces";
import Api, { Query } from "../../services/Api";
import { HttpResponse } from "../../services/Http";
import characterNormalizer from "../normalizers/CharacterNormalizer";

export const GET_CHARACTERS_REQUEST = "GET_CHARACTERS_REQUEST";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

export const SET_CHARACTERS_FILTERS_SUCCESS = "SET_CHARACTERS_FILTERS_SUCCESS";
export const RESET_CHARACTERS_FILTERS_SUCCESS =
  "RESET_CHARACTERS_FILTERS_SUCCESS";
export interface CharactersResult {
  entities: { characters: { [key: number]: RickAndMorty.Character } };
  result: Array<number>;
}

export interface CharacterAction extends AnyAction {
  type: string;
  error?: any;
  info?: RickAndMorty.ResponseInfo;
  characters?: CharactersResult;
  append?: boolean;
  filters?: Query;
}

/********** GET CHARACTERS ****************/
function getCharactersRequest(): CharacterAction {
  return {
    type: GET_CHARACTERS_REQUEST
  };
}

function getCharactersSuccess(
  info: RickAndMorty.ResponseInfo,
  characters: Array<RickAndMorty.Character>,
  append: boolean
): CharacterAction {
  return {
    type: GET_CHARACTERS_SUCCESS,
    info,
    characters: characterNormalizer(characters),
    append
  };
}

function getCharactersError(error: any): CharacterAction {
  return {
    type: GET_CHARACTERS_ERROR,
    error
  };
}

export function getCharacters(
  filters: Query = null,
  page: number = 1,
  append: boolean = true
) {
  console.log(filters, page);
  return function(dispatch) {
    dispatch(getCharactersRequest());
    return new Api()
      .getCharacters(filters, page)
      .then((response: HttpResponse) => {
        const data: RickAndMorty.Response = response.data;
        const info = data.info;
        const characters: Array<RickAndMorty.Character> = data.results;
        dispatch(getCharactersSuccess(info, characters, append));
      })
      .catch(e => dispatch(getCharactersError(e)));
  };
}

/*************** SET FILTERS ***************/
function setFiltersSuccess(filters) {
  return {
    type: SET_CHARACTERS_FILTERS_SUCCESS,
    filters
  };
}
export function setFilters(filters: Query) {
  return function(dispatch) {
    return dispatch(setFiltersSuccess(filters));
  };
}

/*************** RESET FILTERS ***************/
function resetFiltersSuccess(filters: Query) {
  return {
    type: RESET_CHARACTERS_FILTERS_SUCCESS,
    filters
  };
}
export function resetFilters() {
  return function(dispatch) {
    const filters = { page: 1, gender: null, status: null, species: null };
    return dispatch(resetFiltersSuccess(filters));
  };
}
