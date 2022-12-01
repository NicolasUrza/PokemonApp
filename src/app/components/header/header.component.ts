import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/item';
import { NamedAPIResource } from 'src/app/interfaces/named-apiresource';
import { ItemService } from 'src/app/services/item.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  resultados: NamedAPIResource[] = [];
  resultadosBusqueda: NamedAPIResource[] = [];
  BuscadorActivo: boolean = false;
  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit(): void {
    this.cargarResultados();
  }

  cargarResultados() {
    this.itemService.get("24", "0").subscribe((res: any) => {
      this.itemService.getBusqueda(res.count).subscribe((res: any) => {
        const items = res.results;
        items.forEach((element: NamedAPIResource) => {
          this.resultados.push({ name: this.capitalizar(element.name.replaceAll("-", " ")), url: element.url });
        });
      });
    });
  }

  capitalizar(oracion: string): string {
    const palabras = oracion.split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    return palabras.join(" ");
  }
  // event listener si se ingresa una letra a la barra de busqueda
  @HostListener('input') oninput() {
    const input = document.getElementById('buscador') as HTMLInputElement;
    const value = input.value;
    if (value.length > 0) {
      this.BuscadorActivo = true;
      this.resultadosBusqueda = this.resultados.filter((res: NamedAPIResource) => {

        return res.name.toLowerCase().includes(value.toLowerCase());
      });
    } else {
      this.BuscadorActivo = false;
      this.resultadosBusqueda = [];
    }

  }
  // event listener si deja de estar en focus
  @HostListener('focusout') onfocusout() {

    this.BuscadorActivo = false;
  }
  // event listener si se hace click 
  @HostListener('click', ['$event']) onclick(event: any) {
    // si se hace click en el input del buscador
    if (event.target.id === "buscador") {
      if (this.resultadosBusqueda.length > 0) {
        this.BuscadorActivo = true;
      }
    }

  }

  identificar(palabra: string, devolver: number) {
    const input = document.getElementById('buscador') as HTMLInputElement;
    const value = input.value;
    const index = palabra.toLowerCase().indexOf(value.toLowerCase());
    let palabras = [];
    palabras.push(palabra.substring(0, index));
    palabras.push(palabra.substring(index, index + value.length));
    palabras.push(palabra.substring(index + value.length));
    return palabras[devolver];
  }

  navegar(url: string) {
    this.itemService.completar(url).subscribe((res: Item) => {
      this.router.navigate(["/items/" + res.id.toString()]);
    });
  }

  buscarResultados() {
    const input = document.getElementById("buscador") as HTMLInputElement;
    const value = input.value;
    console.log(value);
    if (value.length > 0) {
      this.router.navigate(["/busqueda/" + value]);
    }
  }
}
