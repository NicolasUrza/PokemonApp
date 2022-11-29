import { Component, OnInit } from '@angular/core';
import { EncounterMethodService } from 'src/app/services/encounter-method.service';
import { EncounterMethod } from "../../interfaces/EncounterMethod";
@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})

export class PokemonComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  m!:EncounterMethod; 


}
