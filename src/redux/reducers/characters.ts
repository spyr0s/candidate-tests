import {
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_ERROR,
  CharacterAction
} from "../actions/characters";

export function charactersReducer(
  state = {
    loading: false,
    characters: {
      entities: { characters: {} },
      result: []
    }
  },
  action: CharacterAction
) {
  switch (action.type) {
    case GET_CHARACTERS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: action.characters,
        loading: false
      };
    case GET_CHARACTERS_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
