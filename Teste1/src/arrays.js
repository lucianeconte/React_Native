const arrOriginal = [
  {
    id: 1,
    horario: '08:00',
    id_prest: 1,
  },
  {
    id: 2,
    horario: '08:30',
    id_prest: 1,
  },
  {
    id: 3,
    horario: '09:00',
    id_prest: 1,
  },
  {
    id: 4,
    horario: '09:30',
    id_prest: 1,
  },
];

const arr = 
  {
    horarios: [
      "08:00:00",
      "08:30:00",
      "09:00:00"
      // '09:30:00',
      // '10:00:00',
      // '10:30:00',
      // '11:00:00',
      // '11:30:00',
      // '12:00:00',
      // '13:30:00',
      // '14:00:00',
      // '14:30:00',
      // '15:00:00',
      // '15:30:00',
      // '16:00:00',
      // '16:30:00',
      // '17:00:00',
      // '17:30:00',
      // '18:00:00'
    ],
    disponiveis: [
      "08:15:00",
      "08:30:00",
      "15:00:00",
      "18:00:00"
    ],
  };      


listaHorarios = arr.horarios;

console.log(listaHorarios)

let horarioNovo = [];
horarioNovo = '[';
listaHorarios.forEach(function(horario, indice) {
   horarioNovo = horarioNovo + '{id:' + indice + ', horario:' + `'` + horario + `'` + ',},'
})
horarioNovo = horarioNovo + ']';

console.log(horarioNovo)


const horarioObjeto = json => JSON.parse(json)

resultado = horarioNovo.map(horarioObjeto)


