import { NamedAPIResource } from "./named-apiresource"

export interface PokemonStat {
    stat: NamedAPIResource
    effort: number
    base_stat: number

}
