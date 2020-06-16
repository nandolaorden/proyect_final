import {
  Component,
  OnInit,
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
} from "@angular/core";
import { SettingService } from "../services/setting.service";

@Component({
  selector: "app-smart-tv",
  templateUrl: "./smart-tv.component.html",
  styleUrls: ["./smart-tv.component.scss"],
})
export class SmartTVComponent implements OnInit {
  // Variables
  configuration: any;
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
    setTimeout(() => {
      setInterval(console.log("hola"), 2000);
    }, 1000);
  }
  // Metodo para obtener todos los productos
  getSetting() {
    this.settingService.getSetting().subscribe(
      (setting) => {
        if (!this.configuration) {
          this.configuration = setting.setting;
        }
        console.log(this.configuration);
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
      },
      (error) => {}
    );
  }
}
