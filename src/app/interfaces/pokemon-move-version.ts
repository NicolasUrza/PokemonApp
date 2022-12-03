import { NamedAPIResource } from "./named-apiresource"

export interface PokemonMoveVersion {

    move_learn_method: NamedAPIResource
    version_group: NamedAPIResource
    level_learned_at: number
}
