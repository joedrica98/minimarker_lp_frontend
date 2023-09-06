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
      // preConfirm: () => {
      //   const selectElement = document.getElementById(
      //     "selectElement"
      //   ) as HTMLSelectElement;
      //   const selectedValue = selectElement.value;
      //   if (!selectedValue) {
      //     Swal.showValidationMessage("Por favor selecciona un valor");
      //     return false;
      //   }
      //   return selectedValue;
      // },
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
}
