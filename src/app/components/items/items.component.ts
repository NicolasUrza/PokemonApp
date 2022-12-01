import { compileFactoryFunction } from '@angular/compiler';
import { Component, HostListener, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { NamedAPIResource } from 'src/app/interfaces/named-apiresource';
import { Pagina } from 'src/app/interfaces/pagina';
import { ItemService } from 'src/app/services/item.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { VersionGroupFlavorText } from 'src/app/interfaces/version-group-flavor-text';
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
  mostrarUno = false;
  Pagina = 1;
  paginas!: number[];
  constructor(private itemService: ItemService) { }
  ngOnInit(): void {
    // buscamos los items para mostrar
    this.buscarItems(0);
  }

  buscarItem(id: string) {  
    this.item = null;
    this.mostrarUno = true;
    this.itemService.getbyid(id).subscribe((res: Item) => { this.item = res });
  }

  BuscarEfectoArrojar(url: string):any {
    let efecto = null;
    this.itemService.completarEfectoArrojar(url).subscribe((res: any) => {

    });
    return efecto;
  }

  buscarItems(cambioPagina: number) {
    this.items = [];
    const cantItems = "24";
    console.log("pagina: " + this.Pagina);
    this.Pagina += cambioPagina;
    console.log("pagina despues: " + this.Pagina);
    const avance = (this.Pagina - 1) * 24 + "";
    console.log("avance" + avance);
    this.itemService.get(cantItems, avance).subscribe((res: any) => {
      this.i = res.results;
      this.RegistrosTotales = res.count;
      //this.paginas = this.RegistrosTotales / 24 > 10 ? this.range(10) : this.range(this.RegistrosTotales / 24);
      this.calcularCantPaginas(window.innerWidth);
      this.completar();
    });
  }

  completar() {
    for (let j = 0; j < this.i.length; j++) {
      this.itemService.completar(this.i[j].url).subscribe((res: Item) => { this.items.push(res); });
    }
  }
  /**
   * 
   * @param start indice de inicio
   * @param stop 
   * @param step 
   * @returns 
   */
  range(start: number, stop:number = undefined, step = 1) {
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
  redondear(numero: number): number {
    return Math.ceil(numero);
  }
  descripciones(item: Item): VersionGroupFlavorText[] {
    // array de versionGrouplavorText
    let items: VersionGroupFlavorText[] = [];

    item.flavor_text_entries.forEach(element => {
      if (element.language.name == "es") {
        items.push(element);
      }
    });
    return items;
  }
/**
 * cuando la ventana cambia de tamaño se ejecuta este metodo
 * cambia la cantidad de paginas que se muestra en el html
 * @param event evento de resize de la ventana
 */
  @HostListener('window:resize', ['$event'])
  onResize(event: any ){
    this.calcularCantPaginas(event.target.innerWidth);

  }
  obtenerUltimoindice(): number {
    let indice:number=0;
    this.paginas.forEach(element => {
      indice=element;
    });;
    return indice;
  }
  calcularCantPaginas(pageWidth: number){
    if(pageWidth<768){
      this.paginas = this.RegistrosTotales / 24 > 5 ? this.range(5) : this.range(this.RegistrosTotales / 24);
    }
    else{
      this.paginas = this.RegistrosTotales / 24 > 10 ? this.range(10) : this.range(this.RegistrosTotales / 24);
    }
  }
}
