import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { CategoriasService, Categoria } from '../../../services/categoria.service';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent {
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private categoriasService: CategoriasService
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.categoriaForm.valid) {
      const categoria: Categoria = this.categoriaForm.value;
      this.categoriasService.crearCategoria(categoria).subscribe({
        next: () => {
          alert('¡Categoría creada correctamente!');
          this.categoriaForm.reset();
        },
        error: (err: any) => {
          alert('Error al crear la categoría');
          console.error(err);
        }
      });
    }
  }
}
