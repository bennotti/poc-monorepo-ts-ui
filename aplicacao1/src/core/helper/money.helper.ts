export class MoneyHelper {
  static format(valor: number, locale = 'pt-BR'): string {
    const ptBr = Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    });
    return ptBr.format(valor);
  }
}
