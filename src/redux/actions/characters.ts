import { AnyAction } from "redux";
import { RickAndMorty } from "../../app/namespaces";
import Api, { Query } from "../../services/Api";
import { HttpResponse } from "../../services/Http";
import characterNormalizer from "../normalizers/CharacterNormalizer";

export const GET_CHARACTERS_REQUEST = "GET_CHARACTERS_REQUEST";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

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
  filter: Query = null,
  page: number = 1,
  append: boolean = true
) {
  console.log(filter, page);
  return function(dispatch) {
    dispatch(getCharactersRequest());
    return new Api()
      .getCharacters(filter, page)
      .then((response: HttpResponse) => {
        const data: RickAndMorty.Response = response.data;
        const info = data.info;
        const characters: Array<RickAndMorty.Character> = data.results;
        dispatch(getCharactersSuccess(info, characters, append));
      })
      .catch(e => dispatch(getCharactersError(e)));
  };
}
