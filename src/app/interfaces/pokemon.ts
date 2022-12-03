import { NamedAPIResource } from "./named-apiresource"
import { PokemonAbility } from "./pokemon-ability"
import { PokemonHeldItem } from "./pokemon-held-item"
import { PokemonMove } from "./pokemon-move"
import { PokemonSprites } from "./pokemon-sprites"
import { PokemonStat } from "./pokemon-stat"
import { PokemonType } from "./pokemon-type"
import { PokemonTypePast } from "./pokemon-type-past"
import { VersionGameIndex } from "./version-game-index"

export interface Pokemon {
    id: number
    name: string
    // experiencia base que brinda el derrotar a este pokemon
    base_experience: number
    //tamaño del pokemon en decimetros
    height: number
    // seteado exactamente para un pokemon usado como default para cada especie
    is_default: boolean
    order: number
    // peso del pokemon en hectogramos
    weight: number
    abilities: PokemonAbility[]
    forms: NamedAPIResource[]
    game_indices: VersionGameIndex[]
    //lista de items que el pokemon puede llevar cuando se lo encuentra salvaje
    held_items: PokemonHeldItem[]
    //link a una lista de areas en la que se encuentra el pokemon
    location_area_encounters: string
    moves: PokemonMove[]
    //lista de tipos que tuvo el pokemon en el pasado
    past_types: PokemonTypePast[]
    sprites: PokemonSprites
    species: NamedAPIResource
    stats: PokemonStat[]
    types: PokemonType[]
}
