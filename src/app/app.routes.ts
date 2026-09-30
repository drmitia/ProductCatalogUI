import { Routes } from '@angular/router';
import { ProductListComponent } from './pages/products/product-list/product-list';
import { ProductFormComponent } from './pages/products/product-form/product-form';
import { ImportComponent } from './pages/import/import';
import { LoginComponent } from './pages/login/login';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products/new', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'products/:id/edit', component: ProductFormComponent, canActivate: [adminGuard] },
  { path: 'import', component: ImportComponent, canActivate: [adminGuard] },
  { path: '**', redirectTo: '' }
];