import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoService, Producto } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  producto!: Producto;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.productoService.getProducto(id).subscribe({
        next: (data) => this.producto = data,
        error: (err) => {
          console.error('Error al cargar producto', err);
          alert('Producto no encontrado');
          this.router.navigate(['/productos/listar']);
        }
      });
    }
  }

  actualizarProducto(): void {
    if (this.producto.id) {
      this.productoService.actualizarProducto(this.producto.id, this.producto).subscribe({
        next: () => {
          alert('Producto actualizado correctamente');
          this.router.navigate(['/productos/listar']);
        },
        error: (err) => {
          console.error('Error al actualizar producto', err);
          alert('Ocurrió un error al actualizar el producto');
        }
      });
    }
  }
}
