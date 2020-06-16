import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  optionMenu = "Setting";

  constructor() {}

  option = false;
  ngOnInit() {}

  changeOption(text) {
    this.optionMenu = text;
    this.option = false;
  }
}
