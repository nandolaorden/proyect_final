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

  ngOnInit() {
    this.getUser();
    this.form = new FormGroup({
      password_old: new FormControl(null, [Validators.required]),
      password_new: new FormControl(null, Validators.required),
    });
  }

  // Metodo para obtener todos los productos
  getUser() {
    this.userService.getUser().subscribe(
      (user) => {
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
    console.log(this.form.value);
  }
}
