import { NamedAPIResource } from "./named-apiresource";

export interface PokemonSpeciesDexEntry {
    /** The index number within the Pokédex. */
    entry_number: number;
    /** The Pokédex the referenced Pokémon species can be found in. */
    pokedex: NamedAPIResource;
}
