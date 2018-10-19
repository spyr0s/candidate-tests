import { schema, normalize } from "normalizr";

export const character = new schema.Entity(
  "characters",
  {},
  {
    idAttribute: value => {
      return value.id;
    }
  }
);
export const characters = [character];
const characterNormalizer = characterResult => normalize(characterResult, characters);
export default characterNormalizer;
