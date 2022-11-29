import { ItemHolderPokemonVersionDetail } from "./item-holder-pokemon-version-detail";
import { NamedAPIResource } from "./named-apiresource";

export interface ItemHolderPokemon {
    pokemon: NamedAPIResource;
    version_details: ItemHolderPokemonVersionDetail[];
}
