import { FlavorText } from "../interfaces/flavor-text";

export class PokemonDescripcion {
    nombre: string;
    entradas_pokedex: FlavorText[];
    porcentaje_hembra: number;
    porcentaje_macho: number;

    rango_captura: number
    felicidad_base: number;
    is_baby: boolean;
    is_legendary: boolean;
    is_mythical: boolean;
    contador_eclosion: number;
    tiene_diferencia_de_genero: boolean;
    cambia_formas: boolean;
    tiene_genero: boolean;

    /**
     * recibe un numero del 0 al 8 que representa la probabilidad de que el pokemon sea hembra
     * pasa a porcentaje y lo guarda en los atributos de la clase
     * @param probabilidad_hembra: numero del 0 al 8
     */
    calcularPorcentajeGenero(probabilidad_hembra: number) {
        if (probabilidad_hembra !== -1) {
            this.porcentaje_hembra = probabilidad_hembra * 12.5;
            this.porcentaje_macho = 100 - this.porcentaje_hembra;
            this.tiene_genero = true;
        } else {
            this.tiene_genero = false;
        }

    }
}