import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransformationComponent } from '../app/Modules/transformations/transformations/transformations.component';

const routes: Routes = [
  { path: '', redirectTo: '/transformations', pathMatch: 'full' },
  { path: 'transformations', component: TransformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
