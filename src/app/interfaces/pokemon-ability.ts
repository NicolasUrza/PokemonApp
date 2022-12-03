import { NamedAPIResource } from "./named-apiresource"

export interface PokemonAbility {
    is_hidden: boolean
    slot: number
    ability: NamedAPIResource
}
