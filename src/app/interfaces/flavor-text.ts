import { NamedAPIResource } from "./named-apiresource";

export interface FlavorText {
    /** The localized flavor text for an API resource in a specific language. */
    flavor_text: string;
    /** The language this name is in. */
    language: NamedAPIResource;
    /** The game version this flavor text is extracted from. */
    version: NamedAPIResource;
    
}
