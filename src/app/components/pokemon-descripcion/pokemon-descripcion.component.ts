import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
import { Location } from '@angular/common';
import { PokemonSpecies } from 'src/app/interfaces/pokemon-species';
import { Pokedex } from 'src/app/interfaces/pokedex';
import { PokemonDescripcion } from 'src/app/classes/pokemon-descripcion';
import { FlavorText } from 'src/app/interfaces/flavor-text';
@Component({
  selector: 'app-pokemon-descripcion',
  templateUrl: './pokemon-descripcion.component.html',
  styleUrls: ['./pokemon-descripcion.component.css']
})
export class PokemonDescripcionComponent {
  faCircleArrowLeft = faCircleArrowLeft;
  pokemon: Pokemon;
  especie: PokemonSpecies;
  pokemonDescripcion: PokemonDescripcion = new PokemonDescripcion();
  mostrarDescripcion: boolean = false;
  constructor(private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private location: Location) {
  }


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = this.route.snapshot.paramMap.get("id");
      this.buscarPokemon(id);
    });

  }

  buscarPokemon(id: string): void {
    this.pokemonService.getbyid(id).subscribe((res: Pokemon) => {
      this.pokemon = res
      this.pokemonService.getSpecies(res.species.url).subscribe((res: PokemonSpecies) => {
        this.especie = res;
        this.completarPokemonDescripcion();
      });
    });
  }
  completarPokemonDescripcion() {
    this.pokemonDescripcion.nombre = this.pokemon.name;
    this.pokemonDescripcion.entradas_pokedex = this.buscarEntradasEspañol();
  }


  buscarEntradasEspañol(): FlavorText[] {
    let entradas: FlavorText[] = [];
    this.especie.flavor_text_entries.forEach(element => {
      if (element.language.name === "es") {
        entradas.push(element);
      }
    });
    return entradas;
  }

  /**
 * 
 * @param oracion string a convertir
 * @returns una cadena con la primera letra de cada palabra en mayuscula 
 */
  capitalizar(oracion: string): string {
    const palabras = oracion.split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    return palabras.join(" ");
  }

  volver(): void {
    this.location.back();
  }
}
