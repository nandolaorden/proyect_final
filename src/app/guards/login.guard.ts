import { UserService } from "../services/user.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(public userService: UserService, public router: Router) {}

  canActivate(): boolean {
    if (this.userService.estaLogueado() === true) {
      return true;
    } else {
      this.router.navigate(["/login"]);
      return false;
    }
  }
}
