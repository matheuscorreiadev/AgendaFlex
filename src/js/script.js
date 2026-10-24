/* ==========================================================================
   ESTADO DA APLICAÇÃO E DADOS INICIAIS (LOCALSTORAGE PERSISTENCE)
   ========================================================================== */

const INITIAL_SERVICES = [
  { id: 's1', title: 'Consultoria Web / Landing Page', price: 250, duration: 60, desc: 'Análise de projeto, definição de stack e arquitetura de software.' },
  { id: 's2', title: 'Mentoria Individual de Carreira Tech', price: 120, duration: 45, desc: 'Revisão de portfólio, código, currículo e preparação para entrevistas.' },
  { id: 's3', title: 'Suporte Técnico & Code Review', price: 90, duration: 30, desc: 'Resolução de bugs pontuais em React, Next.js ou Node.js.' }
];

const INITIAL_APPOINTMENTS = [
  {
    id: 'a1',
    clientName: 'Lucas Andrade',
    phone: '71999887766',
    serviceId: 's1',
    serviceTitle: 'Consultoria Web / Landing Page',
    price: 250,
    date: getTodayFormatted(),
    time: '09:00',
    status: 'Confirmado'
  },
  {
    id: 'a2',
    clientName: 'Camila Santos',
    phone: '71988776655',
    serviceId: 's2',
    serviceTitle: 'Mentoria Individual de Carreira Tech',
    price: 120,
    date: getTodayFormatted(),
    time: '14:00',
    status: 'Concluído'
  }
];

let services = JSON.parse(localStorage.getItem('af_services')) || INITIAL_SERVICES;
let appointments = JSON.parse(localStorage.getItem('af_appointments')) || INITIAL_APPOINTMENTS;
let scheduleSettings = JSON.parse(localStorage.getItem('af_settings')) || {
  start: '08:00',
  end: '18:00',
  breakStart: '12:00',
  breakEnd: '13:00'
};

// Estado temporário do Wizard de Agendamento do Cliente
let clientBookingState = {
  service: null,
  date: '',
  time: '',
  clientName: '',
  phone: '',
  notes: ''
};

// Helper para obter a data de hoje formatada em YYYY-MM-DD
function getTodayFormatted() {
  const today = new Date();
  return today.toISOString().split('T')[0];
}