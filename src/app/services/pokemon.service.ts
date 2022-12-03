import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  resourceUrl: string;
  constructor(private httpClient: HttpClient) { this.resourceUrl = environment.ConexionWebApiProxy + 'pokemon/'; }
  
  get(paginas: string, avance: string) {
    const params = new HttpParams()
    .set("limit", paginas)
    .set("offset", avance);
    return this.httpClient.get(this.resourceUrl, {params});
  }
  completar(url: string) {
    return this.httpClient.get<Pokemon>(url);
  }
}
