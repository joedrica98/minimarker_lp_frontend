import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosIndexComponent } from './productos/productos-index/productos-index.component';
import { HttpClientModule } from '@angular/common/http';
import { FeatherModule } from 'angular-feather';
import { Edit, Eye, Trash2 } from 'angular-feather/icons';
import { ProductosCreateComponent } from './productos/productos-create/productos-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ProductosDetailComponent } from './productos/productos-detail/productos-detail.component';
import { ProductosUpdateComponent } from './productos/productos-update/productos-update.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosIndexComponent,
    ProductosCreateComponent,
    ProductosDetailComponent,
    ProductosUpdateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FeatherModule.pick({ Eye, Edit, Trash2 }),
    ReactiveFormsModule,
    FormsModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
