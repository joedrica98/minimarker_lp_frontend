import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto.entity';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos-create',
  templateUrl: './productos-create.component.html',
  styleUrls: ['./productos-create.component.css'],
})
export class ProductosCreateComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService,
    private router: Router
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(255)]],
      descripcion: [null, [Validators.required, Validators.maxLength(255)]],
      precio: [null, [Validators.required]],
      stock: [null, [Validators.required]],
      image_url: [null, [Validators.required]],
    });
  }

  crearProducto(producto: Producto) {
    this.productoService.crearProducto(producto).subscribe({
      next: (data) => {
        Swal.fire(
          'Producto creado',
          'Producto creado exitosamente',
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
      this.crearProducto(this.form.value);
    } else {
      this.showFormErrors();
      this.highlightInvalidControls();
    }
  }
}
