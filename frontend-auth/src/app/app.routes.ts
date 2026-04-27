import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'usuarios', component:UsuariosComponent, canActivate:[authGuard]}
];
