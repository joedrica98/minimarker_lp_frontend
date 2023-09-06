import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Producto } from '../models/producto.entity';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-minimarket',
  templateUrl: './minimarket.component.html',
  styleUrls: ['./minimarket.component.css'],
})
export class MinimarketComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
    });
  }

  borrarProducto(producto: Producto) {
    Swal.fire({
      title: '¿Seguro quieres borrar?',
      html: `
      <p>Estarias borrando el producto "${producto.nombre}"</p>
    `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.destroyProducto(producto.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Producto',
              text: 'El producto fue borrado',
              icon: 'success',
            });
            // Fetch the updated list of stations here
            this.cargarProductos();
          },
        });
      }
    });
  }

  agregarCarrito(producto: Producto, cantidad: number) {
    if (cantidad < 1 || cantidad > producto.stock) {
      Swal.fire({
        title: 'Cantidad no válida',
        text: `La cantidad debe estar entre 1 y ${producto.stock}`,
        icon: 'error',
      });
      return;
    }

    this.productoService.addCarrito(producto.id, cantidad).subscribe(
      (response: any) => {
        Swal.fire({
          title: `${producto.nombre}`,
          text: `${response.message}`,
          icon: 'success',
        });
        // Optionally, refresh the products to get updated stock numbers
        this.cargarProductos();
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo añadir el producto al carrito.',
          icon: 'error',
        });
      }
    );
  }
}
