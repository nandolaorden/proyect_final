import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginGuard } from "./guards/login.guard";
import { SmartTVComponent } from "./smart-tv/smart-tv.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    canActivate: [LoginGuard],
  },
  { path: "login", component: LoginComponent },
  { path: "setting", component: LayoutComponent },
  { path: "smartTV", component: SmartTVComponent },
  { path: "**", component: LayoutComponent, redirectTo: "" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
