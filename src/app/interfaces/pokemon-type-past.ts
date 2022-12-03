import { NamedAPIResource } from "./named-apiresource"
import { PokemonType } from "./pokemon-type"

export interface PokemonTypePast {
    // ultima generacion en la que tuvo este tipo
    generation: NamedAPIResource
    types: PokemonType[]
}
