import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto.entity';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-productos-index',
  templateUrl: './productos-index.component.html',
  styleUrls: ['./productos-index.component.css'],
})
export class ProductosIndexComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
    });
  }
}
