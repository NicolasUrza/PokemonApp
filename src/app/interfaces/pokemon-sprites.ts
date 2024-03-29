import { VersionSprites } from "./version-sprites"

export interface PokemonSprites {
    // urls
    front_default: string
    front_shiny: string
    front_female: string
    front_shiny_female: string
    back_default: string
    back_shiny: string
    back_female: string
    back_shiny_female: string
    other: PokemonSprites[];
    versions: VersionSprites;
}
