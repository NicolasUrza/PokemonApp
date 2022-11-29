import { compileFactoryFunction } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { NamedAPIResource } from 'src/app/interfaces/named-apiresource';
import { Pagina } from 'src/app/interfaces/pagina';
import { ItemService } from 'src/app/services/item.service';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { VersionGroupFlavorText } from 'src/app/interfaces/version-group-flavor-text';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.sass']
})
export class ItemsComponent implements OnInit {
  faCircleArrowLeft = faCircleArrowLeft;
  i!: NamedAPIResource[];
  items: Item[] = [];
  RegistrosTotales!: number;
  item!: Item;
  mostrarUno = false;
  Pagina = 1;
  paginas!: number[];
  constructor(private itemService: ItemService) { }
  ngOnInit(): void {
    this.buscarItems(0);

  }

  buscarItem(id: string) {
    this.mostrarUno = true;
    this.itemService.getbyid(id).subscribe((res: Item) => { this.item = res });
  }

  BuscarEfectoArrojar(url: string) {
    let efecto = null;
    this.itemService.completarEfectoArrojar(url).subscribe((res: any) => {

    });
    return efecto;
  }

  buscarItems(cambioPagina: number) {
    this.items = [];
    const cantItems = "24";
    this.Pagina += cambioPagina;
    const avance = (this.Pagina - 1) * 24 + "";
    this.itemService.get(cantItems, avance).subscribe((res: any) => {
      this.i = res.results;
      this.RegistrosTotales = res.count;
      this.paginas = this.RegistrosTotales / 24 > 10 ? this.range(10) : this.range(this.RegistrosTotales / 24);
      this.completar();
    });
  }

  completar() {
    console.log(this.i.length);
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
  range(start: number, stop = undefined, step = 1) {
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
}
