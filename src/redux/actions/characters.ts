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
  characters?: CharactersResult;
}

/********** GET CHARACTERS ****************/
function getCharactersRequest(): CharacterAction {
  return {
    type: GET_CHARACTERS_REQUEST
  };
}

function getCharactersSuccess(
  characters: Array<RickAndMorty.Character>
): CharacterAction {
  return {
    type: GET_CHARACTERS_SUCCESS,
    characters: characterNormalizer(characters)
  };
}

function getCharactersError(error: any): CharacterAction {
  return {
    type: GET_CHARACTERS_ERROR,
    error
  };
}

export function getCharacters(filter: Query = null) {
  return function(dispatch) {
    dispatch(getCharactersRequest());
    return new Api()
      .getCharacters(filter)
      .then((response: HttpResponse) => {
        console.log(response.data);
        dispatch(getCharactersSuccess(response.data.results));
      })
      .catch(e => dispatch(getCharactersError(e)));
  };
}
