import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // Simula una base de datos en memoria mientras no hay backend real
  private productosRegistrados: Producto[] = [];

  constructor() { }

  // Simula el envío del producto a un backend (reemplazar por HttpClient cuando exista una API real)
  registrarProducto(producto: Producto): Observable<Producto> {
    return of(producto).pipe(
      delay(800), // simula la latencia de una petición HTTP
      tap((productoRecibido) => {
        this.productosRegistrados.push(productoRecibido);
        console.log('Producto recibido en el servicio:', productoRecibido);
        console.log('Total de productos registrados:', this.productosRegistrados.length);
      })
    );
  }

  obtenerProductos(): Producto[] {
    return this.productosRegistrados;
  }
}
