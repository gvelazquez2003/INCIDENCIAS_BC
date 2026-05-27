'use strict';

const APPS_SCRIPT_URL = String(window.APPS_SCRIPT_URL || '').trim();
const APPS_SCRIPT_PROXY_URL = '/api/apps-script';

const FALLBACK_CATALOGS = {
  modules: [
    {
      id: 'servicio',
      label: 'ERROR EN SERVICIO (BARRA)',
      description: 'Mala facturacion: cobro de mas o cambios mal anotados.',
    },
    {
      id: 'manipulacion',
      label: 'MALA MANIPULACION (COCINA)',
      description: 'Producto quemado, mal armado o error en cambios.',
    },
    {
      id: 'desperdicio',
      label: 'DESPERDICIO PERECEDERO (VEGETALES)',
      description: 'Vegetales marchitos o mayugados.',
    },
  ],
  responsables: [
    'SANTIAGO GUILLEN',
    'VANESSA HERNANDEZ',
    'YVIANIS BOLIVAR',
    'LICETH CARRASCAL',
    'KEIDER MORA',
  ],
  turnos: ['DIURNO', 'NOCTURNO'],
  productos: [
    'BAGEL INTEGRAL DE POLLO AHUMADO',
    'BAGEL DE PROSCIUTTO',
    'BAGEL DE SPREAD DE SALMON',
    'BAGEL ALASKA',
    'BAGEL DE QUESO CREMA',
    'BAGEL DE SALMON CLASICO',
    'BAGEL DE CARPACCIO',
    'BAGEL CAPRESA',
    'CROISSANT DE PAVO',
    'CRIOSSANT DE JAMON Y QUESO',
    'DONATELLA VERSACHEESE',
    'SANDUCHE DE MORTADELLA',
    'CROISSANT DE PROSCIUTTO Y QUESO MANCHEGO',
    'CROISSANT DE SALMON AHUMADO Y QUESO CREMA',
    'CROISSANT DE PAVO Y QUESO',
    'SANDUCHE DE PAVO CON QUESO',
    'SANDUCHE DE PROSCIUTTO',
    'SANDUCHE DE PERNIL',
    'SANDUCHE DE CAPRESA',
    'PAPAS FRITAS',
    'PAPAS CHIPS 1 KG',
    'PAPAS CHIPS',
    'AROS DE CEBOLLA',
    'COMBO PAPAS Y REFRESCO',
    'KALE Y POLLO',
    'CESAR CON POLLO Y TOCINETA',
    'QUESO CABRA Y CHIPS DE PROSCIUTTO',
    'RACION TOCINETA',
    'EXTRA PROVOLONE',
    'EXTRA QUESO AMERICANO',
    'HUEVOS FRITOS',
    'PAN TOSTADO',
    'HABIBI',
    'COMBO LECHERIA - DOM',
    'CACHORROS 2 UND',
    'RACION TEQUENOS 6 UND',
    'EXTRA DE POLLO CDH',
    'EXTRA DE CARNE HAMBURGUESITA',
    'LE FRANCHUTE DE SAINT LOUIS',
    'CUBANO DESPELUCADO',
    'PERRO DOS',
    'AMERICAN PATTY',
    'COMBO CHACAO - MIERCOLES',
    'COMBO SAN LUIS - MARTES',
    'THRILLY CHEESESTEAK',
    'PULLED PUNK',
    'PERRO UNO',
    'CDH POLLO',
    'CHICKEN TENDER',
    'EXTRA DE POLLO PATTY',
    'COMBO BELLO CAMPO - JUEVES',
    'COMBO LOS PALOS GRANDES - VIERNES',
    'COMBO LA CANDELARIA - LUNES',
    'CDH CARNE',
    'LA HAMBURGUESITA',
    'SMASH-MOUTH',
    'BABE BURGUER',
    'BLUE BACON',
    'BUFFALO SOULCHICK',
    'LA TUYA',
    'CHICKEN PATTY',
    'EXTRA DE POLLO PARA ENSALADA',
    'SALSA MAYO PESTO PAQ',
    'SALSA ALDALUZA MILD PAQ',
    'VINAGRETA ASIATICA PAQ',
    'MERMELADA DE JALAPENO PAQ',
    'SALSA CDH PAQ',
    'PEPINILLOS ENCURTIDOS PAQ',
    'SPREAD DE SALMON PAQ',
    'SPREAD DE TOMATES SECOS PAQ',
  ],
};

const state = {
  activeModule: '',
  catalogs: FALLBACK_CATALOGS,
};

const elements = {
  moduleButtons: Array.from(document.querySelectorAll('[data-module]')),
  entryPanel: document.getElementById('entry-panel'),
  moduleTitle: document.getElementById('module-title'),
  moduleDescription: document.getElementById('module-description'),
  changeModule: document.getElementById('change-module'),
  form: document.getElementById('incident-form'),
  fecha: document.getElementById('fecha'),
  responsable: document.getElementById('responsable'),
  turno: document.getElementById('turno'),
  producto: document.getElementById('producto'),
  productList: document.getElementById('product-list'),
  extraFields: document.getElementById('extra-fields'),
  envWarning: document.getElementById('env-warning'),
  submitButton: document.getElementById('submit-btn'),
  toast: document.getElementById('toast'),
  standbyOverlay: document.getElementById('standby-overlay'),
};

init();

function init() {
  elements.envWarning.classList.toggle('hidden', Boolean(APPS_SCRIPT_URL));
  setToday();
  renderCatalogs();
  setupModuleSelection();
  setupForm();
  loadRemoteCatalogs();
}

function setupModuleSelection() {
  elements.moduleButtons.forEach((button) => {
    button.addEventListener('click', () => openModule(String(button.dataset.module || '')));
  });

  elements.changeModule.addEventListener('click', () => {
    state.activeModule = '';
    elements.moduleButtons.forEach((button) => button.classList.remove('active'));
    elements.entryPanel.classList.add('hidden');
    elements.form.reset();
    setToday();
  });
}

function openModule(moduleId) {
  const module = state.catalogs.modules.find((item) => item.id === moduleId);
  if (!module) return;

  state.activeModule = moduleId;
  elements.moduleButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.module === moduleId);
  });
  elements.moduleTitle.textContent = module.label;
  elements.moduleDescription.textContent = module.description;
  elements.entryPanel.classList.remove('hidden');
  elements.form.reset();
  setToday();
  renderExtraFields(module);
  elements.entryPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function renderExtraFields(module) {
  // This is ready for additional per-module controls when the sheet gains new columns.
  const fields = Array.isArray(module.extraFields) ? module.extraFields : [];
  elements.extraFields.innerHTML = '';
  elements.extraFields.classList.toggle('hidden', fields.length === 0);
}

function renderCatalogs() {
  renderSelect(elements.responsable, state.catalogs.responsables, 'Seleccione un responsable...');
  renderSelect(elements.turno, state.catalogs.turnos, 'Seleccione un turno...');
  elements.productList.innerHTML = state.catalogs.productos
    .map((producto) => `<option value="${escapeHtml(producto)}"></option>`)
    .join('');
}

function renderSelect(select, values, placeholder) {
  const selected = select.value;
  const options = [`<option value="">${escapeHtml(placeholder)}</option>`];
  values.forEach((value) => {
    options.push(`<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`);
  });
  select.innerHTML = options.join('');
  if (values.includes(selected)) select.value = selected;
}

function setupForm() {
  elements.form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!state.activeModule) {
      showToast('Selecciona un modulo antes de guardar.', 'error');
      return;
    }

    const formData = new FormData(elements.form);
    const payload = {
      tipoIncidencia: state.activeModule,
      fecha: String(formData.get('fecha') || '').trim(),
      producto: String(formData.get('producto') || '').trim(),
      responsable: String(formData.get('responsable') || '').trim(),
      turno: String(formData.get('turno') || '').trim(),
    };

    if (!payload.fecha || !payload.producto || !payload.responsable || !payload.turno) {
      showToast('Completa todos los campos obligatorios.', 'error');
      return;
    }

    if (!hasCatalogValue(state.catalogs.productos, payload.producto)) {
      showToast('Selecciona un producto valido de la lista.', 'error');
      return;
    }

    if (!APPS_SCRIPT_URL) {
      showToast('Configura la URL del Apps Script para enviar el registro.', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await saveIncident(payload);
      if (!response.success) throw new Error(response.message || 'No se pudo guardar el registro.');
      showToast('Incidencia guardada correctamente.', 'success');
      elements.form.reset();
      setToday();
    } catch (error) {
      showToast(error.message || 'No se pudo guardar el registro.', 'error');
    } finally {
      setLoading(false);
    }
  });
}

async function loadRemoteCatalogs() {
  if (!APPS_SCRIPT_URL) return;

  try {
    const url = `${APPS_SCRIPT_PROXY_URL}?target=${encodeURIComponent(APPS_SCRIPT_URL)}&action=getCatalogs`;
    const response = await fetch(url, { cache: 'no-store' });
    const result = await parseResponse(response);
    if (!result.success || !result.data) return;
    state.catalogs = {
      ...FALLBACK_CATALOGS,
      ...result.data,
    };
    renderCatalogs();
  } catch (error) {
    showToast('Se usara el catalogo local mientras se conecta Apps Script.', 'error');
  }
}

async function saveIncident(payload) {
  const response = await fetch(`${APPS_SCRIPT_PROXY_URL}?target=${encodeURIComponent(APPS_SCRIPT_URL)}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'guardarIncidencia', payload }),
  });
  return parseResponse(response);
}

async function parseResponse(response) {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch (error) {
    throw new Error('Apps Script devolvio una respuesta no valida.');
  }
}

function setToday() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  elements.fecha.value = `${year}-${month}-${day}`;
}

function setLoading(loading) {
  elements.submitButton.disabled = loading;
  elements.submitButton.textContent = loading ? 'Guardando...' : 'Guardar Registro';
  elements.standbyOverlay.classList.toggle('hidden', !loading);
}

function hasCatalogValue(values, rawValue) {
  const value = normalizeText(rawValue);
  return values.some((item) => normalizeText(item) === value);
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function showToast(message, type) {
  elements.toast.textContent = message;
  elements.toast.className = `toast toast--show toast--${type || 'info'}`;
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    elements.toast.className = 'toast';
  }, 3500);
}

function escapeHtml(value) {
  return String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}
