import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Pokedex } from '../interfaces/pokedex';
import { Pokemon } from '../interfaces/pokemon';
import { PokemonSpecies } from '../interfaces/pokemon-species';

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
  getbyid(id: string) {
    return this.httpClient.get<Pokemon>(this.resourceUrl + id);
  }
  getAny(id: string) {
    return this.httpClient.get(this.resourceUrl + id);
  }
  getSpecies(url:string){
    return this.httpClient.get<PokemonSpecies>(url);
  }

  getPokedexEntry(url:string){
    return this.httpClient.get<Pokedex>(url);
  }
}
