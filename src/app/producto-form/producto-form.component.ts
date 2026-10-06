import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto.model';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent {

  categorias: string[] = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Juguetes'];

  productoForm: FormGroup;

  enviando = false;
  envioExitoso = false;

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      precio: [null, [Validators.required, Validators.min(0.01)]],
      categoria: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(0)]]
    });
  }

  // Getter para acceder más fácil a los controles desde el HTML
  get f() {
    return this.productoForm.controls;
  }

  // Devuelve la lista de mensajes de error de un control específico
  obtenerErrores(nombreControl: string): string[] {
    const control = this.productoForm.get(nombreControl);
    const errores: string[] = [];

    if (!control || !control.errors || !(control.touched || control.dirty)) {
      return errores;
    }

    if (control.errors['required']) {
      errores.push('Este campo es obligatorio.');
    }
    if (control.errors['minlength']) {
      const requerido = control.errors['minlength'].requiredLength;
      errores.push(`Debe tener al menos ${requerido} caracteres.`);
    }
    if (control.errors['min']) {
      const minimo = control.errors['min'].min;
      errores.push(`El valor debe ser mayor o igual a ${minimo}.`);
    }

    return errores;
  }

  onSubmit(): void {
    this.envioExitoso = false;

    if (this.productoForm.invalid) {
      // Marca todos los campos como tocados para que se muestren los errores
      this.productoForm.markAllAsTouched();
      return;
    }

    this.enviando = true;
    const producto: Producto = this.productoForm.value;

    this.productoService.registrarProducto(producto).subscribe({
      next: (respuesta) => {
        console.log('Producto enviado correctamente:', respuesta);
        this.envioExitoso = true;
        this.enviando = false;
        this.productoForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar el producto:', err);
        this.enviando = false;
      }
    });
  }
}
