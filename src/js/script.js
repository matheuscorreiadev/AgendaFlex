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

/* ==========================================================================
   INICIALIZAÇÃO DA PÁGINA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('filter-date').value = getTodayFormatted();
  document.getElementById('client-booking-date').value = getTodayFormatted();
  
  saveDataToStorage();
  refreshAllViews();
  
  if (window.lucide) {
    lucide.createIcons();
  }
});

function saveDataToStorage() {
  localStorage.setItem('af_services', JSON.stringify(services));
  localStorage.setItem('af_appointments', JSON.stringify(appointments));
  localStorage.setItem('af_settings', JSON.stringify(scheduleSettings));
}

function refreshAllViews() {
  renderAppointments();
  renderServices();
  renderClientServices();
  updateMetrics();
  if (window.lucide) lucide.createIcons();
}

/* ==========================================================================
   CONTROLE DE NAVEGAÇÃO E VIEWS (MODO ADMIN / MODO CLIENTE)
   ========================================================================== */
function switchView(view) {
  const adminView = document.getElementById('view-admin');
  const clientView = document.getElementById('view-client');
  const btnAdmin = document.getElementById('btn-mode-admin');
  const btnClient = document.getElementById('btn-mode-client');

  if (view === 'admin') {
    adminView.classList.remove('hidden');
    clientView.classList.add('hidden');
    btnAdmin.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition bg-indigo-600 text-white shadow-md";
    btnClient.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition text-slate-400 hover:text-white";
  } else {
    adminView.classList.add('hidden');
    clientView.classList.remove('hidden');
    btnClient.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition bg-indigo-600 text-white shadow-md";
    btnAdmin.className = "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-medium transition text-slate-400 hover:text-white";
  }
}

function switchAdminTab(tab) {
  const tabs = ['agenda', 'services', 'settings'];
  tabs.forEach(t => {
    const el = document.getElementById(`admin-tab-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (t === tab) {
      el.classList.remove('hidden');
      btn.className = "pb-3 border-b-2 border-indigo-500 text-indigo-400 flex items-center space-x-2";
    } else {
      el.classList.add('hidden');
      btn.className = "pb-3 border-b-2 border-transparent text-slate-400 hover:text-slate-200 flex items-center space-x-2";
    }
  });
}

function copyPublicLink() {
  navigator.clipboard.writeText('https://agendaflex.app/matheus-dev');
  alert('Link do seu perfil copiado para a área de transferência!');
}