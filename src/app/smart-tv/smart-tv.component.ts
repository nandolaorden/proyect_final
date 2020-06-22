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
import { ClimaService } from "../services/clima.service";
import { VideoService } from "../services/video.service";
import { RssService } from "../services/rss.service";
import { Observable } from "rxjs";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

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
  video: any;
  array_url_video: any;
  src_video: any;
  first_video = false;
  left = false;
  right = false;
  top = false;
  bottom = false;
  climas: any = { prediccion: { dia: [] } };
  block_main = false;

  constructor(
    private settingService: SettingService,
    private climaService: ClimaService,
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private rssService: RssService
  ) {}

  ngOnInit() {
    this.getSetting();
    this.intervalo();
    this.getClima();
  }

  intervalo() {
    setInterval(() => {
      this.getSetting();
    }, 30000);
  }

  getVideo() {
    this.src_video = "http://localhost:3000/video/video2.mp4";
    this.videoService.getNameVideo().subscribe((video: any) => {
      video.files.splice(0, 1);
      this.video = video.files;

      // Genero una array con las direcciones de los videos.
      this.array_url_video = new Array();
      this.video.forEach((element) => {
        this.array_url_video.push("http://localhost:3000/video/" + element);
      });
      var elm = 0;
      var videoPlayer: any = document.getElementById("videoPlayer");
      videoPlayer.onended = () => {
        if (++elm < this.array_url_video.length) {
          videoPlayer.src = this.array_url_video[elm];
          return videoPlayer.play();
        } else {
          elm = 0;
          return (videoPlayer.src = this.array_url_video[elm]);
        }
      };
    });
  }

  getClima() {
    this.climaService.getClima().subscribe((data) => {
      this.climas = data;
    });
  }

  cleanURL(oldURL: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(oldURL);
  }

  // Metodo para obtener todos los productos
  getSetting() {
    this.settingService.getSetting().subscribe(
      (setting: any) => {
        this.configuration = setting.setting;

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

        // Bloque principal
        if (this.configuration.main_block_video == true) {
          this.block_main = true;
          if (this.configuration.main_block_video != this.first_video) {
            this.getVideo();
          }
          this.first_video = true;
        } else {
          this.first_video = false;
          this.block_main = false;
        }

        // Bloque informacion
        if (this.configuration.main_block_news == true) {
          if (this.configuration.banner_rss) {
            this.rssService.getRSS().subscribe((rss: any) => {
              console.log(rss.feed);
              this.text_new = rss.feed.title + "         " + rss.feed.feedUrl;
            });
          }
          if (this.configuration.banner_text) {
            this.text_new = this.configuration.banner_text;
          }
        }

        //Bloque alerta
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
