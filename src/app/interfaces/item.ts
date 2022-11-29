import { APIResource } from "./apiresource";
import { GenerationGameIndex } from "./generation-game-index";
import { ItemHolderPokemon } from "./item-holder-pokemon";
import { ItemSprites } from "./item-sprites";
import { MachineVersionDetail } from "./machine-version-detail";
import { Name } from "./name";
import { NamedAPIResource } from "./named-apiresource"
import { VerboseEffect } from "./verbose-effect";
import { VersionGroupFlavorText } from "./version-group-flavor-text";
export interface Item {
    id: number;
    name: string
    cost: number;
    fling_power: number;
    fling_effect: NamedAPIResource;
    attributes: NamedAPIResource[];
    category: NamedAPIResource;
    effect_entries: VerboseEffect[];
    flavor_text_entries: VersionGroupFlavorText[];
    game_indices: GenerationGameIndex[];
    names: Name[];
    sprites: ItemSprites;
    held_by_pokemon: ItemHolderPokemon[]
    baby_trigger_for: APIResource;
    machines: MachineVersionDetail[];
}
