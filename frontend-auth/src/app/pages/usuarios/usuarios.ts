import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { privateDecrypt } from 'crypto';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css'],
})
export class UsuariosComponent implements OnInit {

  usuarios: any[] = [];

  nombre = '';
  email = '';
  password = '';
  rol = 'user';

  modoEdicion = false;
  usuarioEditandoId: number | null = null;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getUsuarios();
  }

 getUsuarios() {
  this.auth.getUsuarios().subscribe({
    next: (res: any) => {
      this.usuarios = res;
      this.cd.detectChanges(); // 🔥 ESTA LÍNEA ARREGLA TODO
    },
    error: (err: any) => console.error(err)
  });
}

  crearUsuario() {
    this.auth.crearUsuario({
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol,
    }).subscribe(() => {
      this.getUsuarios();
      this.limpiarFormulario();
    });
  }

  editar(u: any) {
    this.modoEdicion = true;
    this.usuarioEditandoId = u.id;

    this.nombre = u.nombre;
    this.email = u.email;
    this.rol = u.rol;
  }

  guardarEdicion() {
    if (!this.usuarioEditandoId) return;

    this.auth.actualizarUsuario(this.usuarioEditandoId, {
      nombre: this.nombre,
      email: this.email,
      rol: this.rol
    }).subscribe(() => {
      this.getUsuarios();
      this.limpiarFormulario();
    });
  }

  eliminar(id: number) {
    if (!confirm("¿Eliminar usuario?")) return;

    this.auth.eliminarUsuario(id).subscribe(() => {
      this.getUsuarios();
    });
  }

  limpiarFormulario() {
    this.nombre = '';
    this.email = '';
    this.password = '';
    this.rol = 'user';

    this.modoEdicion = false;
    this.usuarioEditandoId = null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}