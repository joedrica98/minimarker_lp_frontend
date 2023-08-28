import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosIndexComponent } from './productos/productos-index/productos-index.component';
import { ProductosCreateComponent } from './productos/productos-create/productos-create.component';
import { ProductosDetailComponent } from './productos/productos-detail/productos-detail.component';

const routes: Routes = [
  {
    path: 'productos',
    children: [
      {
        path: '',
        component: ProductosIndexComponent,
      },
      {
        path: 'create',
        component: ProductosCreateComponent,
      },
      {
        path: ':id',
        component: ProductosDetailComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
