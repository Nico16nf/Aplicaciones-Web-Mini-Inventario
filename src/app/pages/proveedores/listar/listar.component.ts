import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProveedorService, Proveedor } from '../../../services/proveedor.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})
export class ListarComponent implements OnInit {
  proveedores: Proveedor[] = [];

  constructor(private proveedorService: ProveedorService) {}

  ngOnInit(): void {
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.proveedorService.getProveedores().subscribe({
      next: (data) => this.proveedores = data,
      error: (err) => console.error('Error al cargar proveedores', err)
    });
  }

  eliminarProveedor(proveedor: Proveedor): void {
    if (confirm(`¿Seguro que deseas eliminar al proveedor "${proveedor.nombre}"?`)) {
      this.proveedorService.eliminarProveedor(proveedor.id!).subscribe({
        next: () => {
          this.proveedores = this.proveedores.filter(p => p.id !== proveedor.id);
          alert('Proveedor eliminado');
        },
        error: (err) => console.error('Error al eliminar proveedor', err)
      });
    }
  }
}
