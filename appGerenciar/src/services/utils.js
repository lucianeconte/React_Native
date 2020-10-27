// import moment from 'moment';

export default {
  convertFloat: function(valor, decimais = 2) {
    if (valor === '') {
      return 0;
    }

    valor = valor.replace('.', '');
    valor = valor.replace(',', '.');
    valor = parseFloat(valor).toFixed(decimais);
    return valor;
  },

  numberToReal: function(numero, casas = 2) {
    var positivo = true;

    if (numero) {
      if (numero < 0) {
        positivo = false;
        numero = numero * -1;
      }

      var numero = parseFloat(numero);
      numero = numero.toFixed(casas).split('.');
      numero[0] = numero[0].split(/(?=(?:...)*$)/).join('.');

      if (positivo == false) {
        return '-' + numero.join(',');
      }

      return numero.join(',');
    }
    return '0,00';
  },
};
