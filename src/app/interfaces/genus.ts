import { NamedAPIResource } from "./named-apiresource";

export interface Genus {
    /** The localized genus for the referenced type. */
    genus: string;
    /** The language this genus is in. */
    language: NamedAPIResource;
   
}
