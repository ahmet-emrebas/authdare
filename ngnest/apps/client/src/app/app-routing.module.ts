import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'material-doc',
    loadChildren: () =>
      import('./material-doc/material-doc.module').then(
        (m) => m.MaterialDocModule
      ),
  },
  {
    path: '**',
    redirectTo: '/authdare/materials',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
