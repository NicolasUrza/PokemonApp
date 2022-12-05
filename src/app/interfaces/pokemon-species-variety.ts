import { NamedAPIResource } from "./named-apiresource";

export interface PokemonSpeciesVariety {
    /** Whether this variety is the default variety. */
    is_default: boolean;
    /** The Pokémon variety. */
    pokemon: NamedAPIResource;
}
