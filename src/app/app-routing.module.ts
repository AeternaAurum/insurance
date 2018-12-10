import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './components/table/table.component';
import { HomeComponent } from './components/home/home.component';
import { PlaceholderComponent } from './components/placeholder/placeholder.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'placeholder', component: PlaceholderComponent },
  { path: 'table', component: TableComponent },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
