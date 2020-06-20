import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  // Variables
  user: any;
  option: false;
  form: FormGroup;

  constructor(private userService: UserService) {}

  comparePassword(field1: string, field2: string) {
    return (group: FormGroup) => {
      let pass1 = group.controls[field1].value;
      let pass2 = group.controls[field2].value;
      if (pass1 === pass2) {
        return null;
      }

      return {
        comparePassword: true,
      };
    };
  }

  ngOnInit() {
    this.getUser();
    this.form = new FormGroup(
      {
        password: new FormControl(null, [Validators.required]),
        password_new: new FormControl(null, Validators.required),
      },
      { validators: this.comparePassword("password", "password_new") }
    );
  }

  // Metodo para obtener todos los productos
  getUser() {
    this.userService.getUser().subscribe(
      (user: any) => {
        this.user = user.user;
      },
      (error) => {
        if (!error.ok) {
          Swal.fire({
            icon: "error",
            title: "Ha habido un error, intentelo más tarde",
          });
        }
      }
    );
  }

  setting() {
    if (this.form.valid == false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Las contraseñas no coinciden",
      });
    } else {
      this.userService.changePassword(this.form.value).subscribe(
        (user: any) => {
          Swal.fire({
            icon: "success",
            title: "Cambio de contraseña correctamente",
          });
          this.option = false;
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se ha podido cambiar la contraseña, espere unos minutos.",
          });
        }
      );
    }
  }
}
