import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  constructor(public http: HttpClient) {}

  // Metodo API REST para recoger nombres de los videos
  getNameVideo() {
    const url = "http://localhost:3000/video";
    return this.http.get(url);
  }
}
