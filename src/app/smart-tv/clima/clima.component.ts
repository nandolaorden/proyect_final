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

  constructor() {}

  ngOnInit() {
    this.parseDate();
    console.log(this.dia);
  }

  parseDate() {
    this.date = this.dia["@attributes"].fecha.split("-").reverse().join("/");
  }
}
