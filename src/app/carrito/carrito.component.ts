import { Component, OnInit } from '@angular/core';
import { Carrito } from '../models/carrito.entity';
import { ProductoService } from '../services/producto.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent implements OnInit {
  carrito: Carrito;

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}
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

  confirmarCompra() {
    this.productoService.finalizarCompra().subscribe({
      next: (data) => {
        Swal.fire(
          'Compra completada',
          'Compra completada exitosamente',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/minimarket']);
          }
        });
      },
    });
  }
}
