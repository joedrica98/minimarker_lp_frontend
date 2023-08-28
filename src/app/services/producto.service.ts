import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private serverurl = environment.serverurl;

  constructor(private httpClient: HttpClient) {}

  getProductos(): Observable<any> {
    return this.httpClient.get<any>(this.serverurl + 'productos/');
  }

  getProductoById(id: string): Observable<Producto> {
    return this.httpClient.get<any>(this.serverurl + `productos/${id}/`);
  }

  crearProducto(producto: Producto): Observable<Producto> {
    return this.httpClient.post<any>(this.serverurl + 'productos/', producto);
  }

  updateProducto(productoData: Producto, id: string): Observable<Producto> {
    return this.httpClient.patch<any>(this.serverurl + `productos/${id}/`,
      productoData
    );
  }

  destroyProducto(id: string): Observable<Producto> {
    return this.httpClient.delete<any>(this.serverurl + `productos/${id}/`);
  }
}
