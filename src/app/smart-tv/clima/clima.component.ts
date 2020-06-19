import { Component, OnInit, Input } from "@angular/core";
import { ClimaService } from "src/app/services/clima.service";
import { platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

@Component({
  selector: "app-clima",
  templateUrl: "./clima.component.html",
  styleUrls: ["./clima.component.scss"],
})
export class ClimaComponent implements OnInit {
  @Input() dia: any;
  date: any;
  img: any;

  constructor() {}

  ngOnInit() {
    this.parseDate();
    this.getImage();
  }

  parseDate() {
    this.date = this.dia["@attributes"].fecha.split("-").reverse().join("/");
  }

  getImage() {
    if (this.dia.estado_cielo[2] == 11) {
      this.img = "../../assets/climas/soleado.png";
    }
    if (this.dia.estado_cielo[2] == 12 || this.dia.estado_cielo[2] == 13) {
      this.img = "../../assets/climas/nublado-soleado.png";
    }
    if (this.dia.estado_cielo[2] == 14) {
      this.img = "../../assets/climas/nublado-poco-lluvieso.png";
    }
    if (
      this.dia.estado_cielo[2] == 44 ||
      this.dia.estado_cielo[2] == 45 ||
      this.dia.estado_cielo[2] == 26
    ) {
      this.img = "../../assets/climas/nublado-lluvieso.png";
    }
    if (this.dia.estado_cielo == 11) {
      this.img = "../../assets/climas/soleado.png";
    }
    if (this.dia.estado_cielo == 12 || this.dia.estado_cielo == 13) {
      this.img = "../../assets/climas/nublado-soleado.png";
    }
    if (this.dia.estado_cielo == 14) {
      this.img = "../../assets/climas/nublado-poco-lluvieso.png";
    }
    if (
      this.dia.estado_cielo == 44 ||
      this.dia.estado_cielo == 45 ||
      this.dia.estado_cielo == 26
    ) {
      this.img = "../../assets/climas/nublado-lluvieso.png";
    }

    console.log(this.dia.estado_cielo);
  }
}
