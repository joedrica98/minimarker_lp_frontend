import { Component, OnInit } from '@angular/core';
import { Carrito } from '../models/carrito.entity';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: Carrito;

  constructor(private productoService: ProductoService) {}
  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getCarrito().subscribe({
      next: (data) => {
        this.carrito = data;
      },
    });
  }
}
