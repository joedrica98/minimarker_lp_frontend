import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/producto.entity';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-detail',
  templateUrl: './productos-detail.component.html',
  styleUrls: ['./productos-detail.component.css'],
})
export class ProductosDetailComponent {
  producto: Producto;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      Swal.fire(
        'No se encontro',
        'No se encontro producto con ese Id',
        'error'
      );
    } else {
      this.productoService.getProductoById(id).subscribe({
        next: (data) => {
          this.producto = data;
        },
      });
    }
  }
}
