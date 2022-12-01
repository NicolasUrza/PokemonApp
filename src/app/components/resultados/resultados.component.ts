import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NamedAPIResource } from 'src/app/interfaces/named-apiresource';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  todos: NamedAPIResource[] = [];
  resultados: NamedAPIResource[] = [];
  constructor(private itemService: ItemService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.cargarResultados();
  }
  cargarResultados() {
    this.route.paramMap.subscribe(params => {
      let value = this.route.snapshot.paramMap.get("res");


      this.itemService.get("24", "0").subscribe((res: any) => {
        this.itemService.getBusqueda(res.count).subscribe((res: any) => {
          this.todos = res.results;
          this.resultados = this.todos.filter((element: NamedAPIResource) => {

            return element.name.toLowerCase().includes(value.toLowerCase());
          });
          this.resultados.forEach((element: NamedAPIResource) => {
            element.name = this.capitalizar(element.name.replaceAll("-", " "));
          });
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

}
