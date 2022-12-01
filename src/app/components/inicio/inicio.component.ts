import { Component } from '@angular/core';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import { TituloComponent } from '../titulo/titulo.component';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  faCircleArrowRight = faCircleArrowRight;
}
