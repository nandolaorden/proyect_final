import { Component, OnInit, ɵConsole } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  form: FormGroup;
  title = "proyecto";

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  login() {
    this.userService.login(this.form.value).subscribe(
      (data: any) => {
        Swal.fire({
          icon: "success",
          title: "Sesión inciada correctamente",
        });
        localStorage.setItem("id", data.id);
        localStorage.setItem("token", data.token);
        this.router.navigateByUrl("");
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El email o la contraseña no son válidos",
        });
      }
    );
  }
}
