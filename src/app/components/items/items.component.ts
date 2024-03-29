import { compileFactoryFunction } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { NamedAPIResource } from 'src/app/interfaces/named-apiresource';
import { Pagina } from 'src/app/interfaces/pagina';
import { ItemService } from 'src/app/services/item.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { VersionGroupFlavorText } from 'src/app/interfaces/version-group-flavor-text';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  faCircleArrowLeft = faCircleArrowLeft;
  i!: NamedAPIResource[];
  items: Item[] = [];
  RegistrosTotales!: number;
  item: Item;
  Pagina = 1;
  paginas!: number[];
  mostrarFinal = true;
  mostrarInicio = false;

  constructor(private itemService: ItemService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // buscamos los items para mostrar
    if (this.route.snapshot.queryParamMap.get('pagina') == null) {
      this.navegarPagina(1);
    } else {
      this.buscarItems();
    }
  }


  /**
   * busca los items de la pagina solicitada en el paginador
   */
  buscarItems() {
    this.items = [];
    const cantItems = "24";
    this.Pagina = this.route.snapshot.queryParamMap.get('pagina') != null ? parseInt(this.route.snapshot.queryParamMap.get('pagina')) : 1;
    const avance = (this.Pagina - 1) * 24 + "";
    this.itemService.get(cantItems, avance).subscribe((res: any) => {
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
      this.itemService.completar(this.i[j].url).subscribe((res: Item) => { this.items.push(res); });
    }
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
   * busca el nombre en español de un item
   * @param item: elemento de tipo item
   * @returns el nombre en español del item
   */
  buscarNombre(item: Item): string {
    //por defecto el nombre esta en ingles
    let nombre = item.name;
    // busco en el aray de nombres el nombre en español y lo guardo
    item.names.forEach(element => {
      if (element.language.name == "es") {
        nombre = element.name;
      }
    });
    //retorno el nombre
    return nombre;
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
      this.mostrarInicio = false;
      if (this.Pagina - 2 > 1) {
        start = this.Pagina - 2;
        stop = this.Pagina + 1;
        this.mostrarInicio = true;
        this.mostrarFinal = true;
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
      this.mostrarInicio = false;
      if (this.Pagina - 4 > 1) {
        start = this.Pagina - 4;
        stop = this.Pagina + 4;
        this.mostrarFinal = true;
        this.mostrarInicio = true;
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
  ordenar(items: Item[]): Item[] {
    //ordeno el array de items por el id
    return items.sort((a, b) => a.id - b.id);
  }

  navegarPagina(pagina: number) {
    this.router.navigate(['/items'], { queryParams: { pagina: pagina } }).finally(() => {
      this.buscarItems();
    });
  }
}
