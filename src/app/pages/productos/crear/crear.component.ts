import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService, Producto } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent {
  producto: Producto = {
    nombre: '',
    descripcion: '',
    precioCompra: 0,
    precioVenta: 0,
    stock: 0,
    categoriaId: 0,
    proveedorId: 0
  };

  constructor(private productoService: ProductoService, private router: Router) {}

  crearProducto() {
    this.productoService.crearProducto(this.producto).subscribe({
      next: (data) => {
        console.log('Producto creado:', data);
        alert('Producto creado exitosamente');
        this.router.navigate(['/productos/listar']);
      },
      error: (err) => {
        console.error('Error al crear producto', err);
        alert('Error al crear el producto');
      }
    });
  }
}
