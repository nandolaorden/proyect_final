import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ClimaService {
  constructor(public http: HttpClient) {}

  getClima() {
    const url =
      "https://www.el-tiempo.net/api/json/v1/provincias/46/municipios/46250/weather";
    return this.http.get(url);
  }
}
