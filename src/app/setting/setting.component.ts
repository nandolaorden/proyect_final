import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { SettingService } from "../services/setting.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-setting",
  templateUrl: "./setting.component.html",
  styleUrls: ["./setting.component.scss"],
})
export class SettingComponent implements OnInit {
  constructor(private settingService: SettingService) {}

  form: FormGroup;

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      information: new FormControl("superior", [Validators.required]),
      meteorology: new FormControl("izquierdo", [Validators.required]),
      video: new FormControl(false, [Validators.required]),
      alert: new FormControl(false, [Validators.required]),
      news: new FormControl(false, [Validators.required]),
      url_server: new FormControl(null, [Validators.required]),
      text_alert: new FormControl(null, [Validators.required]),
      area_news: new FormControl(null, [Validators.required]),
      url_font: new FormControl(null, [Validators.required]),
      font_rss: new FormControl(false, [Validators.required]),
      text_news: new FormControl(null, [Validators.required]),
    });
  }

  setting() {
    this.settingService.editSetting(this.form.value).subscribe(
      (data: any) => {
        Swal.fire({
          icon: "success",
          title: "Se ha guardado perfectamente.",
        });
      },
      (error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se ha podido guardar la configuración",
        });
      }
    );
  }
}
