import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProveedorService, Proveedor } from '../../../services/proveedor.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css'
})
export class CrearComponent implements OnInit {
  proveedorForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService
  ) {}

  ngOnInit(): void {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      ruc: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.proveedorForm.valid) {
      const formValue = this.proveedorForm.value;
      const proveedor: Proveedor = {
        nombre: formValue.nombre,
        ruc: formValue.ruc,             
        telefono: formValue.telefono,  
        email: formValue.email,
        direccion: formValue.direccion
      };

      this.proveedorService.crearProveedor(proveedor).subscribe({
        next: () => {
          alert('Proveedor creado correctamente');
          this.proveedorForm.reset();
        },
        error: (err) => {
          console.error('Error al crear proveedor', err);
          alert('Error al crear proveedor. Revisa los datos.');
        }
      });
    }
  }
}
