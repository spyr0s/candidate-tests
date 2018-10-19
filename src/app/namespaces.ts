export namespace RickAndMorty {
  export interface Origin {
    name: string;
    url: string;
  }
  export interface Location {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: Array<string>;
    url: string;
    created: string;
  }
  export interface Character {
    id: number;
    name: string;
    status: "Alive" | "Dead" | "unknown";
    species: string;
    type: string;
    gender: "Female" | "Male" | "Genderless" | "unknown";
    origin: Origin;
    location: Location;
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
  }
}
