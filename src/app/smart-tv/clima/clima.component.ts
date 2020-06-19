import { Component, OnInit, Input } from "@angular/core";
import { ClimaService } from "src/app/services/clima.service";

@Component({
  selector: "app-clima",
  templateUrl: "./clima.component.html",
  styleUrls: ["./clima.component.scss"],
})
export class ClimaComponent implements OnInit {
  @Input() dia: any;

  constructor() {}

  ngOnInit() {}
}
