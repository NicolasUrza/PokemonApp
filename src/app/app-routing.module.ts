import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { ItemDescripcionComponent } from './components/item-descripcion/item-descripcion.component';
import { ItemsComponent } from './components/items/items.component';
import { ResultadosComponent } from './components/resultados/resultados.component';

const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'items', component: ItemsComponent },
  { path: 'items/:id', component: ItemDescripcionComponent },
  { path: 'busqueda/:res', component: ResultadosComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
