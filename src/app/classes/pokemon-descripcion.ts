import { FlavorText } from "../interfaces/flavor-text";
import { PokemonSprites } from "../interfaces/pokemon-sprites";
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
    //255 × (hatch_counter + 1)
    contador_eclosion: number;
    tiene_diferencia_de_genero: boolean;
    cambia_formas: boolean;
    tiene_genero: boolean;
    sprites: PokemonSprites;

    /**
     * recibe un numero del 0 al 8 que representa la probabilidad de que el pokemon sea hembra
     * pasa a porcentaje y lo guarda en los atributos de la clase
     * @param probabilidad_hembra: numero del 0 al 8
     */
    calcularPorcentajeGenero(probabilidad_hembra: number): void {
        if (probabilidad_hembra !== -1) {
            this.porcentaje_hembra = probabilidad_hembra * 12.5;
            this.porcentaje_macho = 100 - this.porcentaje_hembra;
            this.tiene_genero = true;
        } else {
            this.tiene_genero = false;
        }

    }

    tieneCaracteristicas(): boolean {
        return this.is_baby || this.is_legendary || this.is_mythical;
    }

    caracteristicas(): string[] {
        let caracteristicas: string[] = [];
        if (this.is_baby) {
            caracteristicas.push('Bebe');
        }
        if (this.is_legendary) {
            caracteristicas.push('Legendario');
        }
        if (this.is_mythical) {
            caracteristicas.push('Mitico');
        }
        return caracteristicas;
    }

    pasosParaEclosionar(): number {
        return 255 * (this.contador_eclosion + 1);
    }

}