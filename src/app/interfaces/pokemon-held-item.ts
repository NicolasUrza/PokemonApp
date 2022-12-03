import { NamedAPIResource } from "./named-apiresource"
import { PokemonHeldItemVersion } from "./pokemon-held-item-version"

export interface PokemonHeldItem {
    item: NamedAPIResource
    version_details: PokemonHeldItemVersion[]

}
