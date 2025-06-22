import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Import para ngModel
import { CategoriasService, Categoria } from '../../../services/categoria.service';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  categorias: Categoria[] = [];
  filtroNombre: string = '';

  constructor(private categoriasService: CategoriasService) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (data) => {
        this.categorias = data;
      },
      error: (err: any) => {
        console.error('Error al obtener categorías', err);
      }
    });
  }

  categoriasFiltradas(): Categoria[] {
    if (!this.filtroNombre.trim()) {
      return this.categorias;
    }
    return this.categorias.filter(c =>
      c.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
    );
  }

  eliminarCategoria(categoria: Categoria): void {
    if (categoria.id == null) {
      console.error('ID de categoría no válido');
      return;
    }

    if (confirm(`¿Estás seguro de eliminar la categoría "${categoria.nombre}"?`)) {
      this.categoriasService.eliminarCategoria(categoria.id).subscribe({
        next: () => {
          console.log('Categoría eliminada');
          this.cargarCategorias();
        },
        error: (err: any) => {
          console.error('Error al eliminar categoría', err);
        }
      });
    }
  }
}
