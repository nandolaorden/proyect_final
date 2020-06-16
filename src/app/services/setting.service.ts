import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class SettingService {
  private settingURL = "http://localhost:3000/setting";

  constructor(public http: HttpClient) {}

  // Metodo API REST para recoger la configuración
  getSetting() {
    const url = "http://localhost:3000/setting/5ee293b615a208970aa0b36e";
    return this.http.get(url);
  }

  // Metodo API REST para modificar setting
  editSetting(setting) {
    const url = this.settingURL + "/5ee293b615a208970aa0b36e";
    return this.http.put(url, setting);
  }
}
