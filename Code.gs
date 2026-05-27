const CONFIG = {
  // Replace this value with the ID from the Google Sheets URL before deploying.
  spreadsheetId: 'REEMPLAZAR_CON_ID_DEL_GOOGLE_SHEET',
  timeZone: 'America/Caracas',
  headers: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO'],
  sheetNames: {
    servicio: 'ERROR EN SERVICIO (BARRA)',
    manipulacion: 'MALA MANIPULACION (COCINA)',
    desperdicio: 'DESPERDICIO PERECEDERO (VEG)',
  },
};

const CATALOGS = {
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

function doGet(e) {
  try {
    const action = String((e && e.parameter && e.parameter.action) || 'ping').toLowerCase();
    if (action === 'getcatalogs') {
      return jsonResponse_(true, CATALOGS, 'Catalogos sincronizados.');
    }
    if (action === 'ping') {
      return jsonResponse_(true, { ok: true }, 'Servicio disponible.');
    }
    return jsonResponse_(false, null, 'Accion GET no soportada.');
  } catch (error) {
    return jsonResponse_(false, null, normalizeError_(error));
  }
}

function doPost(e) {
  try {
    const body = parseBody_(e);
    const action = String(body.action || '').toLowerCase();
    if (action && action !== 'guardarincidencia') {
      return jsonResponse_(false, null, 'Accion POST no soportada.');
    }
    const saved = guardarIncidencia_(body.payload || body);
    return jsonResponse_(true, saved, 'Incidencia guardada correctamente.');
  } catch (error) {
    return jsonResponse_(false, null, normalizeError_(error));
  }
}

function guardarIncidencia_(payload) {
  const data = payload || {};
  validateRequired_(data, ['tipoIncidencia', 'fecha', 'producto', 'responsable', 'turno']);

  const module = resolveModule_(data.tipoIncidencia);
  const producto = requireCatalogValue_(data.producto, CATALOGS.productos, 'producto');
  const responsable = requireCatalogValue_(data.responsable, CATALOGS.responsables, 'responsable');
  const turno = requireCatalogValue_(data.turno, CATALOGS.turnos, 'turno');
  const fecha = parseDate_(data.fecha);
  const sheet = getSheet_(module.sheetName);

  ensureHeaders_(sheet);
  const row = [fecha, producto, responsable, turno];
  const targetRow = sheet.getLastRow() + 1;
  sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
  try {
    sheet.getRange(targetRow, 1).setNumberFormat('dd/MM/yyyy');
  } catch (error) {
    Logger.log('No se pudo aplicar formato de fecha: ' + error);
  }

  return {
    sheet: module.sheetName,
    rowInserted: targetRow,
    tipoIncidencia: module.id,
  };
}

function resolveModule_(rawValue) {
  const id = String(rawValue || '').trim().toLowerCase();
  const module = CATALOGS.modules.find(function (item) {
    return item.id === id;
  });
  if (!module || !CONFIG.sheetNames[module.id]) {
    throw new Error('Tipo de incidencia no valido.');
  }
  return {
    id: module.id,
    sheetName: CONFIG.sheetNames[module.id],
  };
}

function getSheet_(sheetName) {
  if (CONFIG.spreadsheetId === 'REEMPLAZAR_CON_ID_DEL_GOOGLE_SHEET') {
    throw new Error('Configura CONFIG.spreadsheetId en Code.gs antes de probar envios.');
  }

  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('No se encontro la hoja "' + sheetName + '". Revisa CONFIG.sheetNames.');
  }
  return sheet;
}

function ensureHeaders_(sheet) {
  const expected = CONFIG.headers;
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
    sheet.setFrozenRows(1);
    return;
  }

  const current = sheet.getRange(1, 1, 1, expected.length).getValues()[0].map(normalizeText_);
  const valid = expected.every(function (header, index) {
    return normalizeText_(header) === current[index];
  });
  if (!valid) {
    throw new Error('La hoja "' + sheet.getName() + '" debe tener columnas: ' + expected.join(', ') + '.');
  }
}

function parseDate_(rawValue) {
  const value = String(rawValue || '').trim();
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error('La fecha debe tener formato YYYY-MM-DD.');
  }

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0);
  const normalizedDate = Utilities.formatDate(date, CONFIG.timeZone, 'yyyy-MM-dd');
  if (normalizedDate !== value) {
    throw new Error('La fecha indicada no es valida.');
  }
  return date;
}

function requireCatalogValue_(rawValue, catalog, fieldName) {
  const value = String(rawValue || '').trim();
  const normalized = normalizeText_(value);
  const validValue = catalog.find(function (item) {
    return normalizeText_(item) === normalized;
  });
  if (!validValue) {
    throw new Error('El campo ' + fieldName + ' no coincide con el catalogo permitido.');
  }
  return validValue;
}

function validateRequired_(data, fields) {
  fields.forEach(function (field) {
    if (data[field] === undefined || data[field] === null || String(data[field]).trim() === '') {
      throw new Error('El campo ' + field + ' es obligatorio.');
    }
  });
}

function parseBody_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error('Cuerpo POST vacio.');
  }
  return JSON.parse(String(e.postData.contents));
}

function jsonResponse_(success, data, message) {
  return ContentService
    .createTextOutput(JSON.stringify({ success: success, data: data, message: message }))
    .setMimeType(ContentService.MimeType.JSON);
}

function normalizeText_(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toUpperCase();
}

function normalizeError_(error) {
  return String(error && error.message ? error.message : error || 'Error interno de Apps Script.');
}
