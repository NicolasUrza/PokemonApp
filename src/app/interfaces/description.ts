import { NamedAPIResource } from "./named-apiresource";

export interface Description {
    /** The localized description for an API resource in a specific language. */
    description: string;
    /** The language this name is in. */
    language: NamedAPIResource;

}
