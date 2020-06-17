import {
  Component,
  OnInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
} from "@angular/core";
import { SettingService } from "../services/setting.service";
import Swal from "sweetalert2";
import { IfStmt } from "@angular/compiler";

@Component({
  selector: "app-smart-tv",
  templateUrl: "./smart-tv.component.html",
  styleUrls: ["./smart-tv.component.scss"],
})
export class SmartTVComponent implements OnInit {
  // Variables
  configuration: any;
  text_new: any;
  alert_text: any;
  left = false;
  right = false;
  top = false;
  bottom = false;

  constructor(private settingService: SettingService) {}

  ngOnInit() {
    this.getSetting();
    this.intervalo();

    //setInterval("this.getSetting", 5000);
  }

  intervalo() {
    setInterval(() => {
      this.getSetting();
    }, 30000);
  }

  // Metodo para obtener todos los productos
  getSetting() {
    this.settingService.getSetting().subscribe(
      (setting: any) => {
        this.configuration = setting.setting;
        console.log(this.configuration);

        // Configuration position
        if (
          this.configuration.position_information == "superior" &&
          this.configuration.position_meteorology == "izquierdo"
        ) {
          this.top = true;
          this.bottom = false;
          this.left = true;
          this.right = false;
        }
        if (
          this.configuration.position_information == "superior" &&
          this.configuration.position_meteorology == "derecho"
        ) {
          this.top = true;
          this.bottom = false;
          this.left = false;
          this.right = true;
        }
        if (
          this.configuration.position_information == "inferior" &&
          this.configuration.position_meteorology == "izquierdo"
        ) {
          this.top = false;
          this.bottom = true;
          this.left = true;
          this.right = false;
        }
        if (
          this.configuration.position_information == "inferior" &&
          this.configuration.position_meteorology == "derecho"
        ) {
          this.top = false;
          this.bottom = true;
          this.left = false;
          this.right = true;
        }

        // Datos
        if (this.configuration.main_block_news == true) {
          if (this.configuration.banner_text) {
            this.text_new = this.configuration.banner_text;
          }
        }

        if (this.configuration.main_block_alert == true) {
          if (this.configuration.alertText) {
            if (!this.alert_text) {
              this.alert_text = this.configuration.alertText;
              Swal.fire({
                position: "center",
                title: this.alert_text,
                width: "90rem",
                heightAuto: false,
                customClass: {
                  title: "swal-height",
                  header: "content-class",
                },
                showConfirmButton: false,
                timer: 5000,
              });
            }
            if (this.alert_text != this.configuration.alertText) {
              this.alert_text = this.configuration.alertText;
              Swal.fire({
                position: "center",
                title: this.alert_text,
                width: "90rem",
                heightAuto: false,
                customClass: {
                  title: "swal-height",
                  header: "content-class",
                },
                showConfirmButton: false,
                timer: 5000,
              });
            }
          }
        }
      },
      (error) => {}
    );
  }
}
