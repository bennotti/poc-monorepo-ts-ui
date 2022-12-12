export class CnpjHelper {
  static validar(cnpj: string): boolean {
    try{
      if (!cnpj || cnpj === '') return false;

      const cnpjNormalizado = cnpj.replace('.', '').replace('.', '').replace('/', '').replace('-', '').replace('_', '');

      if (cnpjNormalizado === '00000000000000' || cnpjNormalizado === '11111111111111' || cnpjNormalizado === '22222222222222' || cnpjNormalizado === '33333333333333' ||
      cnpjNormalizado === '44444444444444' || cnpjNormalizado === '55555555555555' || cnpjNormalizado === '66666666666666' || cnpjNormalizado === '77777777777777' ||
      cnpjNormalizado === '88888888888888' || cnpjNormalizado === '99999999999999' || cnpjNormalizado.length !== 14) {
        return false;
      }

      let tamanho = cnpjNormalizado.length - 2;
      let numeros = cnpjNormalizado.substring(0, tamanho);
      const digitos = cnpjNormalizado.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }

      var resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != parseInt(digitos.charAt(0))) {
        return false;
      }

      tamanho = tamanho + 1;
      numeros = cnpjNormalizado.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let k = tamanho; k >= 1; k--) {
        soma += parseInt(numeros.charAt(tamanho - k)) * pos--;
        if (pos < 2) {
          pos = 9;
        }
      }

      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
      if (resultado != parseInt(digitos.charAt(1))) {
        return false;
      }

      return true;
    }catch (e) {
      console.log(e);
      return false;
    }
  }
}
