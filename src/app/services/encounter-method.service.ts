import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { EncounterMethod } from '../interfaces/EncounterMethod';
@Injectable({
  providedIn: 'root'
})
export class EncounterMethodService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) { this.resourceUrl = environment.ConexionWebApiProxy + 'encounter-method/'; }
  getById(Id: string) {
    return this.httpClient.get<EncounterMethod>(this.resourceUrl + Id);
  }
}
