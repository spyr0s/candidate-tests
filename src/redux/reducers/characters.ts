import {
  GET_CHARACTERS_REQUEST,
  GET_CHARACTERS_SUCCESS,
  GET_CHARACTERS_ERROR,
  SET_CHARACTERS_FILTERS_SUCCESS,
  RESET_CHARACTERS_FILTERS_SUCCESS,
  CharacterAction
} from "../actions/characters";

export function charactersReducer(
  state = {
    loading: false,
    characters: {
      entities: { characters: {} },
      result: [],
      info: { count: 0, pages: 0, next: "", previous: "" }
    },
    filters: { page: 1, gender: null, species: null, status: null }
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
    case RESET_CHARACTERS_FILTERS_SUCCESS:
      return {
        ...state,
        filters: action.filters
      };
    case SET_CHARACTERS_FILTERS_SUCCESS:
      return {
        ...state,
        filters: Object.assign({}, action.filters)
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
