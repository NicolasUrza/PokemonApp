import { Effect } from "./effect";
import { NamedAPIResource } from "./named-apiresource";

export interface ItemFlingEffect {
    id: number;
    name: string;
    effect_entries: Effect[];
    items: NamedAPIResource[];
}
