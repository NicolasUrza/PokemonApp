import { NamedAPIResource } from "./named-apiresource"
import { PokemonMoveVersion } from "./pokemon-move-version"

export interface PokemonMove {
    move: NamedAPIResource
    version_group_details: PokemonMoveVersion[]
}