import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quetzal',
  standalone: true
})
export class QuetzalCurrencyPipe implements PipeTransform {
  /**
   * Formatea un valor numérico al formato de moneda en Quetzales (Q).
   * Ejemplo: 1250 -> "Q 1,250.00"
   */
  transform(value: number | null | undefined, prefix: string = 'Q'): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return `${prefix} 0.00`;
    }

    const num = Number(value);
    const formatted = num.toLocaleString('es-GT', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return `${prefix} ${formatted}`;
  }
}
