import { Component, OnInit, HostListener } from '@angular/core';
import { EncounterMethodService } from 'src/app/services/encounter-method.service';
import { EncounterMethod } from "../../interfaces/EncounterMethod";
import { compileFactoryFunction } from '@angular/compiler';
import { Item } from 'src/app/interfaces/item';
import { NamedAPIResource } from 'src/app/interfaces/named-apiresource';
import { Pagina } from 'src/app/interfaces/pagina';
import { ItemService } from 'src/app/services/item.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { VersionGroupFlavorText } from 'src/app/interfaces/version-group-flavor-text';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit {
  faCircleArrowLeft = faCircleArrowLeft;
  i!: NamedAPIResource[];
  pokemon: Pokemon[] =[];
  RegistrosTotales!: number;
  item: Item;
  Pagina = 1;
  paginas!: number[];
  mostrarFinal=true;
  mostrarInicio=false;
  
  constructor(private itemService: ItemService,
    private pokemonService: PokemonService,
    private router: Router) { }

  ngOnInit(): void {
    // buscamos los items para mostrar
    this.buscarPokemon(0);

  }


  /**
   * busca los items de la pagina solicitada en el paginador
   * @param cambioPagina : cantidad en la cambia la que se modifica la pagina actual
   */
  buscarPokemon(cambioPagina: number) {
    this.pokemon = [];
    const cantItems = "24";
    console.log("pagina: " + this.Pagina);
    this.Pagina += cambioPagina;
    console.log("pagina despues: " + this.Pagina);
    const avance = (this.Pagina - 1) * 24 + "";
    console.log("avance" + avance);
    this.pokemonService.get(cantItems, avance).subscribe((res: any) => {
      this.i = res.results;
      this.RegistrosTotales = res.count;
      //this.paginas = this.RegistrosTotales / 24 > 10 ? this.range(10) : this.range(this.RegistrosTotales / 24);
      this.calcularCantPaginas(window.innerWidth);
      this.completar();
    });
  }
  /**
   * completa los datos de los items
   * guardados en la variable this.i
   * y los guarda en la variable this.items
   */
  completar() {
    for (let j = 0; j < this.i.length; j++) {
      this.pokemonService.completar(this.i[j].url).subscribe((res: Pokemon) => { this.pokemon.push(res); });
    }
    this.pokemon.sort((a, b) => a.id - b.id);
  }
  /**
   * 
   * @param start indice de inicio
   * @param stop indice de fin
   * @param step cantidad de pasos para llegar de inicio a fin
   * @returns un array con los numeros desde start hasta stop con un paso de step
   */
  range(start: number, stop: number = undefined, step = 1) {
    // si no hay un stop, entonces el stop es el start e inicio desde 0
    const startArray = stop === undefined ? 0 : start;
    const stopArray = stop === undefined ? start : stop;
    // creo un array de numeros desde start hasta stop con un paso de step
    return Array.from({ length: (stopArray - startArray) / step + 1 }, (_, i) => startArray + (i * step));
  }
  ordenar(listaPokemon:Pokemon[]): Pokemon[] {
    return listaPokemon.sort((a, b) => a.id - b.id);
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

  /**
   * redondea un numero hacia arriba, es decir, al entero siguiente
   * @param numero: numero de coma flotante a redondear
   * @returns numero redondeado
   */
  redondear(numero: number): number {
    return Math.ceil(numero);
  }
 

  /**
   * cuando la ventana cambia de tamaño se ejecuta este metodo
   * cambia la cantidad de paginas que se muestra en el html
   * @param event evento de resize de la ventana
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.calcularCantPaginas(event.target.innerWidth);

  }
  /**
   * busca en el array de paginas el ultimo elemento
   * @returns el ultimo indice de la variable paginas
   */
  obtenerUltimoindice(): number {
    let indice: number = 0;
    this.paginas.forEach(element => {
      indice = element;
    });;
    return indice;
  }
  /**
   * calcula el rango de paginas para el paginador y lo guarda en la variable paginas
   */
  calcularCantPaginas(pageWidth: number) {
    if (pageWidth < 768) {
      let start = 1
      let stop = 4;
      this.mostrarInicio=false;
      if (this.Pagina - 2 > 1) {
        start = this.Pagina - 2;
        stop = this.Pagina + 1;
        this.mostrarInicio=true;
        this.mostrarFinal=true;
      }
      if (this.Pagina + 2 > this.RegistrosTotales / 24) {
        start = this.redondear(this.RegistrosTotales / 24) - 3;
        stop = this.redondear(this.RegistrosTotales / 24);
        this.mostrarFinal = false;
        this.mostrarInicio = true;
      }
      this.paginas = this.RegistrosTotales / 24 > 5 ? this.range(start, stop) : this.range(this.RegistrosTotales / 24);
    }
    else {
      let start = 1
      let stop = 10;
      this.mostrarInicio=false;
      if (this.Pagina - 4 > 1) {
        start = this.Pagina - 4;
        stop = this.Pagina + 4;
        this.mostrarFinal=true;
        this.mostrarInicio=true;
      }
      if (this.Pagina + 4 > this.RegistrosTotales / 24) {
        start = this.redondear(this.RegistrosTotales / 24) - 8;
        stop = this.redondear(this.RegistrosTotales / 24);
        this.mostrarFinal = false;
        this.mostrarInicio = true;
      }
      this.paginas = this.RegistrosTotales / 24 > 10 ? this.range(start, stop) : this.range(this.RegistrosTotales / 24);
    }
  }

  navegar(url: string) {
    this.router.navigate([url]);
  }

}
