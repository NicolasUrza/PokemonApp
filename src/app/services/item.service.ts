import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Item } from '../interfaces/item';
import { Pagina } from '../interfaces/pagina';
import { ItemFlingEffect } from '../interfaces/item-fling-effect';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
 

  resourceUrl: string;
  constructor(private httpClient: HttpClient) { this.resourceUrl = environment.ConexionWebApiProxy + 'item/'; }
  
  get(paginas: string, avance: string) {
    const params = new HttpParams()
    .set("limit", paginas)
    .set("offset", avance);
    return this.httpClient.get(this.resourceUrl, {params});
  }

  completar(url: string) {
    return this.httpClient.get<Item>(url);
  }

  completarEfectoArrojar(url: string) {
    return this.httpClient.get<ItemFlingEffect>(url);
  }
  getbyid(id:string){
    return this.httpClient.get<Item>(this.resourceUrl + id);
  }

  getBusqueda(cantidad:string){
    const params = new HttpParams()
    .set("limit", cantidad)
    .set("offset", "0");
    return this.httpClient.get(this.resourceUrl, {params});
  }
}
