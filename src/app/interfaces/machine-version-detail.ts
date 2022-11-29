import { APIResource } from "./apiresource";
import { NamedAPIResource } from "./named-apiresource";

export interface MachineVersionDetail {
    machine: APIResource;
    version_group: NamedAPIResource;
}
