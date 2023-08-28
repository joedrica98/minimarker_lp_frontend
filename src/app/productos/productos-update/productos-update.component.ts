import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.entity';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-update',
  templateUrl: './productos-update.component.html',
  styleUrls: ['./productos-update.component.css'],
})
export class ProductosUpdateComponent {
  producto: Producto;
  form: FormGroup;

  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: [null, [Validators.required, Validators.maxLength(255)]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarProducto();
  }

  cargarProducto(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      Swal.fire(
        'No se encontro',
        'No se encontro estación con ese Id',
        'error'
      );
      return; // exit the function early if no ID found
    }

    this.productoService.getProductoById(id).subscribe({
      next: (data) => {
        this.producto = data;
        this.form.patchValue({
          nombre: this.producto.nombre,
          descripcion: this.producto.descripcion,
          precio: this.producto.precio,
          stock: this.producto.stock,
        });
      },
      error: (error) => {
        // Handle any error that might occur when fetching the data
        Swal.fire('Error', 'Error obteniendo Estación.', 'error');
      },
    });
  }

  actualizarProducto(productoData: Producto) {
    this.productoService
      .updateProducto(productoData, this.producto.id)
      .subscribe({
        next: (data) => {
          Swal.fire(
            'Producto actualizado',
            'Producto actualizado exitosamente',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/productos']);
            }
          });
        },
      });
  }

  showFormErrors(): void {
    let errorMessage = '';
    for (const key in this.form.controls) {
      if (this.form.controls[key].invalid) {
        errorMessage += `Campo ${key} es inválido.<br>`;
      }
    }

    Swal.fire({
      icon: 'error',
      title: 'Error en el formulario',
      html: errorMessage,
    });
  }

  highlightInvalidControls(): void {
    for (const key in this.form.controls) {
      this.form.controls[key].markAsTouched();
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.actualizarProducto(this.form.value);
    } else {
      this.showFormErrors();
      this.highlightInvalidControls();
    }
  }
}
