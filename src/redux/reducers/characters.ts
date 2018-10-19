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
      result: [],
      info: { count: 0, pages: 0, next: "", previous: "" }
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
      let characters;
      if (action.append) {
        characters = {
          entities: {
            characters: Object.assign(
              {},
              state.characters.entities.characters,
              action.characters.entities.characters
            )
          },
          result: state.characters.result.concat(action.characters.result)
        };
      } else {
        characters = action.characters;
      }
      return {
        ...state,
        info: action.info,
        characters,
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
