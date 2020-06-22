import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class RssService {
  constructor(public http: HttpClient) {}

  // Metodo API REST para recoger nombres de los videos
  getRSS() {
    const url = "http://localhost:3000/rss";
    return this.http.get(url);
  }
}
