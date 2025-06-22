import { Routes } from '@angular/router';

import { InicioComponent } from './pages/inicio/inicio.component';

import { CrearComponent as CrearProductoComponent } from './pages/productos/crear/crear.component';
import { ListarComponent as ListarProductoComponent } from './pages/productos/listar/listar.component';
import { EditarComponent as EditarProductoComponent } from './pages/productos/editar/editar.component';

import { CrearComponent as CrearCategoriaComponent } from './pages/categorias/crear/crear.component';
import { ListarComponent as ListarCategoriaComponent } from './pages/categorias/listar/listar.component';

import { CrearComponent as CrearProveedorComponent } from './pages/proveedores/crear/crear.component';
import { ListarComponent as ListarProveedorComponent } from './pages/proveedores/listar/listar.component';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'productos/crear', component: CrearProductoComponent },
  { path: 'productos/listar', component: ListarProductoComponent },
  { path: 'productos/editar/:id', component: EditarProductoComponent },
  { path: 'categorias/crear', component: CrearCategoriaComponent },
  { path: 'categorias/listar', component: ListarCategoriaComponent },
  { path: 'proveedores/crear', component: CrearProveedorComponent },
  { path: 'proveedores/listar', component: ListarProveedorComponent }
];
