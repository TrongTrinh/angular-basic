import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatVND',
  standalone: true,
})
export class FormatToVnd implements PipeTransform {
  transform(value: string): string {
    return `${value.toUpperCase()} VNĐ`;
  }
}
