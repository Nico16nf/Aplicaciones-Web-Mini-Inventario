import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductoService, Producto } from '../../../services/producto.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  productos: Producto[] = [];

  // Filtro
  filtro = {
    nombre: '',
    stock: null as number | null,
    precio: null as number | null,
    categoriaId: null as number | null
  };

  // Dashboard
  stockTotal: number = 0;
  stockCritico: number = 0;
  totalCategorias: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
        this.actualizarDashboard();
      },
      error: (err) => console.error('Error al cargar productos', err)
    });
  }

  actualizarDashboard(): void {
    this.stockTotal = this.productos.reduce((sum, p) => sum + p.stock, 0);
    this.stockCritico = this.productos.filter(p => p.stock <= 5).length;
    const categorias = new Set(this.productos.map(p => p.categoriaId));
    this.totalCategorias = categorias.size;
  }

  productosFiltrados(): Producto[] {
    return this.productos.filter(p => {
      const matchNombre = !this.filtro.nombre || p.nombre.toLowerCase().includes(this.filtro.nombre.toLowerCase());
      const matchStock = this.filtro.stock == null || p.stock >= this.filtro.stock;
      const matchPrecio = this.filtro.precio == null || p.precioVenta <= this.filtro.precio;
      const matchCategoria = this.filtro.categoriaId == null || p.categoriaId === this.filtro.categoriaId;
      return matchNombre && matchStock && matchPrecio && matchCategoria;
    });
  }

  resetFiltro(): void {
    this.filtro = { nombre: '', stock: null, precio: null, categoriaId: null };
  }

  eliminarProducto(producto: Producto): void {
    if (confirm(`¿Seguro que deseas eliminar el producto "${producto.nombre}"?`)) {
      this.productoService.eliminarProducto(producto.id!).subscribe({
        next: () => {
          this.productos = this.productos.filter(p => p.id !== producto.id);
          this.actualizarDashboard();
          console.log('Producto eliminado');
        },
        error: (err) => console.error('Error al eliminar producto', err)
      });
    }
  }
}
