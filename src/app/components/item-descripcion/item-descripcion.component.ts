import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { faCircleArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Item } from 'src/app/interfaces/item';
import { VersionGroupFlavorText } from 'src/app/interfaces/version-group-flavor-text';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-descripcion',
  templateUrl: './item-descripcion.component.html',
  styleUrls: ['./item-descripcion.component.css']
})
export class ItemDescripcionComponent implements OnInit {

  faCircleArrowLeft = faCircleArrowLeft;
  item: Item; 
  constructor(private itemService:ItemService,
    private route: ActivatedRoute,
    private location: Location){
    }

    
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = this.route.snapshot.paramMap.get("id");
      this.buscarItem(id);
    });
    
  }

  buscarItem(id: string): void {
    this.itemService.getbyid(id).subscribe((res: Item) => { this.item = res });
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

    volver(): void {
      this.location.back();
    }
}
