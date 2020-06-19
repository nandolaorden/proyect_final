import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "diaClima",
})
export class DiaClimaPipe implements PipeTransform {
  transform(value: string): any {
    const re = /\//gi;
    const dateParts: any = value.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

    return dateObject.getDate();
  }
}
