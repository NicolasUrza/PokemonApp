import { NamedAPIResource } from "./named-apiresource";

export interface Pagina {
    count: number
    next: string
    previous: string
    results: NamedAPIResource[];
}
