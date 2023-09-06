import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosIndexComponent } from './productos/productos-index/productos-index.component';
import { ProductosCreateComponent } from './productos/productos-create/productos-create.component';
import { ProductosDetailComponent } from './productos/productos-detail/productos-detail.component';
import { ProductosUpdateComponent } from './productos/productos-update/productos-update.component';
import { MinimarketComponent } from './minimarket/minimarket.component';
import { CarritoComponent } from './carrito/carrito.component';

const routes: Routes = [
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
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
      {
        path: ':id/update',
        component: ProductosUpdateComponent,
      },
    ],
  },
  { path: 'minimarket', component: MinimarketComponent },
  { path: 'carrito', component: CarritoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
