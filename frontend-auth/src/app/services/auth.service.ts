import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  login(data: any) {
    return this.http.post(`${this.API}/auth/login`, data);
    }
    getUsuarios() {
     return this.http.get(`${this.API}/usuarios`);
  
     //LOGOUT
  }
  logout(){
    if(typeof window !== 'undefined'){
      localStorage.removeItem('token');
    }
  }

  // CREATE
crearUsuario(data: any) {
return this.http.post(`${this.API}/usuarios`, data);
}

// UPDATE
actualizarUsuario(id: number, data: any){
  return this.http.put(`${this.API}/usuarios/${id}`, data);
}

// DELETE
eliminarUsuario(id: number){
  return this.http.delete(`${this.API}/usuarios/${id}`)
}
}

  

