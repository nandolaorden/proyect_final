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
  show: boolean = false;
  configuration: any;
  image: any;

  ngOnInit() {
    this.initForm();
    this.getConfiguration();
  }

  checkValue(event: any, element: string) {
    const show = this.form.get(element);
    if (!event.srcElement.checked) {
      show.disable();
    } else {
      show.enable();
    }
  }

  initForm() {
    this.form = new FormGroup({
      image: new FormControl(null, [Validators.required]),
      information: new FormControl("superior", [Validators.required]),
      meteorology: new FormControl("izquierdo", [Validators.required]),
      video: new FormControl(false, [Validators.required]),
      alert: new FormControl(false, [Validators.required]),
      news: new FormControl(false, [Validators.required]),
      url_server: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      url_font: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      area_news: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
      text_alert: new FormControl({ value: null, disabled: true }, [
        Validators.required,
      ]),
    });
  }

  // Metodo para obtener todos los productos
  getConfiguration() {
    this.settingService.getSetting().subscribe(
      (setting: any) => {
        this.fillForm(setting);

        if (setting.setting.image != null) {
          this.image = setting.setting.image;
        }
      },
      (error) => {}
    );
  }

  fillForm(setting: any) {
    this.form.patchValue({
      information: setting.setting.position_information,
      meteorology: setting.setting.position_meteorology,
      video: setting.setting.main_block_video,
      alert: setting.setting.main_block_alert,
      news: setting.setting.main_block_news,
      url_server: setting.setting.url_server,
      url_font: setting.setting.banner_rss,
      area_news: setting.setting.banner_text,
      text_alert: setting.setting.alertText,
    });
  }

  setting() {
    console.log(this.form.value);
    this.settingService.editSetting(this.form.value).subscribe(
      (data: any) => {
        Swal.fire({
          icon: "success",
          title: "Se ha guardado correctamente.",
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
