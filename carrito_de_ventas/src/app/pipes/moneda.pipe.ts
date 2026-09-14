import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'moneda',
  standalone: true
})
export class MonedaPipe implements PipeTransform {
  // Formatea un número a moneda de forma clara y estándar
  transform(valor: number | null | undefined): string {
    const monto = Number(valor) || 0;
    return '$' + monto.toLocaleString('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
