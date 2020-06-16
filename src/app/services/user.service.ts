import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(public http: HttpClient) {}

  // Metodo API REST para logearte
  login(user) {
    const url = "http://localhost:3000/login";
    return this.http.post(url, user);
  }

  // Metodo API REST para mostrar el usuario indicado
  getUser() {
    const idUser = localStorage.getItem("id");
    const url = "http://localhost:3000/user/" + idUser;
    return this.http.get(url);
  }

  // Para crear el token en localStorage
  estaLogueado(): boolean {
    const token = localStorage.getItem("token");
    if (token) {
      return true;
    } else {
      return false;
    }
  }
}
