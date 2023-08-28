import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/producto.entity';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private serverurl = environment.serverurl;

  constructor(private httpClient: HttpClient) {}

  getProductos(): Observable<any> {
    return this.httpClient.get<any>(this.serverurl + 'productos/');
  }

  createEstacion(producto: Producto): Observable<Producto> {
    return this.httpClient.post<any>(this.serverurl + 'productos/', producto);
  }
}
