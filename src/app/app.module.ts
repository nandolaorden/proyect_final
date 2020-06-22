import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { SettingComponent } from "./setting/setting.component";
import { LayoutComponent } from "./layout/layout.component";
import { LoginGuard } from "./guards/login.guard";
import { CalendarComponent } from "./calendar/calendar.component";
import { ProfileComponent } from "./profile/profile.component";
import { SmartTVComponent } from "./smart-tv/smart-tv.component";
import { ClimaComponent } from "./smart-tv/clima/clima.component";
import { DatePipe } from "./pipes/date.pipe";
import { DayPipe } from "./pipes/day.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SettingComponent,
    LayoutComponent,
    CalendarComponent,
    ProfileComponent,
    SmartTVComponent,
    ClimaComponent,
    DatePipe,
    DayPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [LoginGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
