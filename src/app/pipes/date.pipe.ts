import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "date",
})
export class DatePipe implements PipeTransform {
  transform(value: string): any {
    const dias = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];
    const re = /\//gi;
    const dateParts: any = value.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    return dias[dateObject.getDay()];
  }
}
