const CONFIG = {
  // Replace this value with the ID from the Google Sheets URL before deploying.
  spreadsheetId: '1NUUJ0i9h1Y0pQFfVQyo8DEdaeZgsN-_PoMo-Fekt72E',
  timeZone: 'America/Caracas',
  headers: {
    default: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO'],
    servicio: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'LISTA DE INCIDENCIAS', 'OBSERVACIONES'],
    manipulacion: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'LISTA DE INCIDENCIAS', 'OBSERVACIONES'],
    merma_pan: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'CANTIDAD', 'FECHA DE VENCIMIENTO DEL PAQUETE'],
  },
  sheetNames: {
    servicio: 'ERROR EN SERVICIO (BARRA)',
    manipulacion: 'MALA MANIPULACION (COCINA)',
    desperdicio: 'DESPERDICIO PERECEDERO (VEG)',
    merma_pan: 'MERMA DE PAN (COCINA)',
  },
  visualizationSheets: {
    registros: 'VISUALIZACION REGISTROS',
    resumen: 'RESUMEN REGISTROS',
  },
};

const CATALOGS = {
  modules: [
    {
      id: 'servicio',
      label: 'ERROR EN SERVICIO (BARRA)',
      description: 'Mala facturacion: cobro de mas o cambios mal anotados.',
      incidenciasCatalog: 'incidenciasServicio',
      extraFields: [
        {
          name: 'listaIncidencias',
          label: 'Lista de Incidencias *',
          type: 'select',
          placeholder: 'Seleccione una incidencia...',
          optionsKey: 'incidenciasServicio',
          required: true,
        },
        {
          name: 'observaciones',
          label: 'Observaciones',
          type: 'textarea',
          placeholder: 'Breve expicacion',
          required: false,
        },
      ],
    },
    {
      id: 'manipulacion',
      label: 'MALA MANIPULACION (COCINA)',
      description: 'Producto quemado, mal armado o error en cambios.',
      incidenciasCatalog: 'incidenciasManipulacion',
      extraFields: [
        {
          name: 'listaIncidencias',
          label: 'Lista de Incidencias *',
          type: 'select',
          placeholder: 'Seleccione una incidencia...',
          optionsKey: 'incidenciasManipulacion',
          required: true,
        },
        {
          name: 'observaciones',
          label: 'Observaciones',
          type: 'textarea',
          placeholder: 'Breve expicacion',
          required: false,
        },
      ],
    },
    {
      id: 'desperdicio',
      label: 'DESPERDICIO PERECEDERO (VEGETALES)',
      description: 'Vegetales marchitos o mayugados.',
    },
    {
      id: 'merma_pan',
      label: 'MERMA DE PAN (COCINA)',
      description: 'Pan de cocina retirado por merma o vencimiento del paquete.',
      productCatalog: 'productosMermaPan',
      extraFields: [
        {
          name: 'cantidad',
          label: 'Cantidad *',
          type: 'number',
          placeholder: '0',
          min: '1',
          step: '1',
          required: true,
        },
        {
          name: 'fechaVencimiento',
          label: 'Fecha de vencimiento del paquete *',
          type: 'date',
          required: true,
        },
      ],
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
  incidenciasServicio: ['Comanda repetida, sin aviso', 'Producto equivocado, segun peticion del cliente', 'Pedido mal entregado, equivocacion de mesas o clientes', 'Cambios mal anotados', 'Se cayo al suelo'],
  incidenciasManipulacion: ['Pasada de coccion', 'Error en cambios', 'Producto demas / duplicado', 'Mala Manipulacion del pan', 'Se cayo al suelo', 'Proteina cruda', 'Cliente no satisfecho', 'Producto frio o mal emplatado'],
  productosMermaPan: [
    'PTEM0107 BAGEL EVERYTHING 105 GR 4 UND',
    'PTEM0108 BAGELS PLAIN 105 GR 4 UND',
    'PTEM0109 BAGEL AMAPOLA 105 G 4 UND',
    'PTEM0110 BAGELS AJONJOLI 105 GR 4 UND',
    'PTEM0111 BAGEL SPICY 105 GR 4 UND',
    'PTEM0134 BAGELS INTEGRAL CON TOOPING DE AVENA',
    'PTEM0060 PAN DE HAMBURGUESA ESPECIAL 55 GR 6 UND',
    'PTEM0043 PAN DE HAMBURGUESA ESPECIAL 85 GR 6 UND A24',
    'PTEM0086 PAN DE HAMBURGUESA TIPO BRIOCHE 95 GR 6 UND WAB',
    'PTEM0072 PAN DE PERRO MINI ESPECIAL 50 GR 12 UND',
    'PTEM0002 PAN DE PERRO',
    'PTEM0004 PAN TIPO DELI',
    'PTSU0046 CROISSANT SIMPLE 120 GR 1 UND',
    'STPC007 DEMI BAGUETTE CONGELADO 180G 1 UND',
  ],
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
    if (action === 'setupsheets') {
      const result = setupSheets_();
      return jsonResponse_(true, result, 'Sheets de registros y visualizacion creados.');
    }
    if (action === 'refreshvisualization') {
      const result = refreshVisualization_();
      return jsonResponse_(true, result, 'Visualizacion actualizada.');
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
  const productCatalog = CATALOGS[module.productCatalog || 'productos'];
  const producto = requireCatalogValue_(data.producto, productCatalog, 'producto');
  const responsable = requireCatalogValue_(data.responsable, CATALOGS.responsables, 'responsable');
  const turno = requireCatalogValue_(data.turno, CATALOGS.turnos, 'turno');
  const fecha = parseDate_(data.fecha, 'fecha');
  const sheet = getSheet_(module.sheetName);
  const row = buildRow_(module, data, fecha, producto, responsable, turno);
  const headers = CONFIG.headers[module.id] || CONFIG.headers.default;

  ensureHeaders_(sheet, headers);
  const targetRow = sheet.getLastRow() + 1;
  sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
  try {
    sheet.getRange(targetRow, 1).setNumberFormat('dd/MM/yyyy');
    if (module.id === 'merma_pan') {
      sheet.getRange(targetRow, 6).setNumberFormat('dd/MM/yyyy');
    }
  } catch (error) {
    Logger.log('No se pudo aplicar formato de fecha: ' + error);
  }

  try {
    refreshVisualization_();
  } catch (error) {
    Logger.log('No se pudo actualizar la visualizacion: ' + error);
  }

  return {
    sheet: module.sheetName,
    rowInserted: targetRow,
    tipoIncidencia: module.id,
  };
}

function buildRow_(module, data, fecha, producto, responsable, turno) {
  if (module.id === 'servicio' || module.id === 'manipulacion') {
    validateRequired_(data, ['listaIncidencias']);
    const incidenciasCatalog = CATALOGS[module.incidenciasCatalog] || [];
    const listaIncidencias = requireCatalogValue_(data.listaIncidencias, incidenciasCatalog, 'listaIncidencias');
    const observaciones = String(data.observaciones || '').trim();
    return [fecha, producto, responsable, turno, listaIncidencias, observaciones];
  }

  if (module.id === 'merma_pan') {
    validateRequired_(data, ['cantidad', 'fechaVencimiento']);
    const cantidad = parsePositiveInteger_(data.cantidad, 'cantidad');
    const fechaVencimiento = parseDate_(data.fechaVencimiento, 'fechaVencimiento');
    return [fecha, producto, responsable, turno, cantidad, fechaVencimiento];
  }

  return [fecha, producto, responsable, turno];
}

function resolveModule_(rawValue) {
  const id = String(rawValue || '').trim().toLowerCase();
  const module = CATALOGS.modules.find(function (item) {
    return item.id === id;
  });
  if (!module || !CONFIG.sheetNames[module.id]) {
    throw new Error('Tipo de incidencia no valido.');
  }
  return Object.assign({}, module, {
    sheetName: CONFIG.sheetNames[module.id],
  });
}

function getSheet_(sheetName) {
  const spreadsheet = getSpreadsheet_();
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
}

function getSpreadsheet_() {
  if (CONFIG.spreadsheetId === 'REEMPLAZAR_CON_ID_DEL_GOOGLE_SHEET') {
    throw new Error('Configura CONFIG.spreadsheetId en Code.gs antes de probar envios.');
  }
  return SpreadsheetApp.openById(CONFIG.spreadsheetId);
}

function ensureHeaders_(sheet, expected) {
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
    sheet.setFrozenRows(1);
    return;
  }

  const current = sheet.getRange(1, 1, 1, expected.length).getValues()[0].map(normalizeText_);
  const baseHeaders = CONFIG.headers.default;
  const currentBaseIsValid = baseHeaders.every(function (header, index) {
    return normalizeText_(header) === current[index];
  });
  const fullHeadersAreValid = expected.every(function (header, index) {
    return normalizeText_(header) === current[index];
  });

  if (fullHeadersAreValid) return;
  if (currentBaseIsValid) {
    sheet.getRange(1, 1, 1, expected.length).setValues([expected]);
    sheet.setFrozenRows(1);
    return;
  }

  throw new Error('La hoja "' + sheet.getName() + '" debe tener columnas: ' + expected.join(', ') + '.');
}

function parseDate_(rawValue, fieldName) {
  const value = String(rawValue || '').trim();
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    throw new Error('El campo ' + fieldName + ' debe tener formato YYYY-MM-DD.');
  }

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]), 12, 0, 0);
  const normalizedDate = Utilities.formatDate(date, CONFIG.timeZone, 'yyyy-MM-dd');
  if (normalizedDate !== value) {
    throw new Error('El campo ' + fieldName + ' no es valido.');
  }
  return date;
}

function parsePositiveInteger_(rawValue, fieldName) {
  const value = Number(rawValue);
  if (!Number.isInteger(value) || value <= 0) {
    throw new Error('El campo ' + fieldName + ' debe ser un numero entero mayor a cero.');
  }
  return value;
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
function setupSheets_() {
  const modules = CATALOGS.modules.map(function (module) {
    const sheet = getSheet_(CONFIG.sheetNames[module.id]);
    const headers = CONFIG.headers[module.id] || CONFIG.headers.default;
    ensureHeaders_(sheet, headers);
    formatHeader_(sheet, headers.length);
    return CONFIG.sheetNames[module.id];
  });

  const visualization = refreshVisualization_();
  return {
    modules: modules,
    visualization: visualization,
  };
}

function refreshVisualization_() {
  const registros = collectVisualizationRows_();
  const registrosSheet = getSheet_(CONFIG.visualizationSheets.registros);
  const registrosHeaders = [
    'FECHA',
    'MODULO',
    'PRODUCTO',
    'RESPONSABLE',
    'TURNO',
    'LISTA DE INCIDENCIAS',
    'OBSERVACIONES',
    'CANTIDAD',
    'FECHA VENCIMIENTO',
  ];

  rewriteSheet_(registrosSheet, registrosHeaders, registros);
  if (registros.length) {
    registrosSheet.getRange(2, 1, registros.length, 1).setNumberFormat('dd/MM/yyyy');
    registrosSheet.getRange(2, 9, registros.length, 1).setNumberFormat('dd/MM/yyyy');
  }

  const resumenSheet = getSheet_(CONFIG.visualizationSheets.resumen);
  const resumen = buildSummaryRows_(registros);
  rewriteSheet_(resumenSheet, ['INDICADOR', 'VALOR', 'TOTAL'], resumen);

  return {
    registrosSheet: CONFIG.visualizationSheets.registros,
    resumenSheet: CONFIG.visualizationSheets.resumen,
    totalRegistros: registros.length,
  };
}

function collectVisualizationRows_() {
  const rows = [];
  CATALOGS.modules.forEach(function (module) {
    const sheetName = CONFIG.sheetNames[module.id];
    const sheet = getSheet_(sheetName);
    const headers = CONFIG.headers[module.id] || CONFIG.headers.default;
    ensureHeaders_(sheet, headers);

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const values = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();
    values.forEach(function (row) {
      if (row.every(function (cell) { return cell === ''; })) return;
      rows.push(normalizeVisualizationRow_(module, row));
    });
  });

  rows.sort(function (a, b) {
    const dateA = a[0] instanceof Date ? a[0].getTime() : 0;
    const dateB = b[0] instanceof Date ? b[0].getTime() : 0;
    return dateB - dateA;
  });
  return rows;
}

function normalizeVisualizationRow_(module, row) {
  if (module.id === 'servicio' || module.id === 'manipulacion') {
    return [row[0], module.label, row[1], row[2], row[3], row[4], row[5], '', ''];
  }

  if (module.id === 'merma_pan') {
    return [row[0], module.label, row[1], row[2], row[3], '', '', row[4], row[5]];
  }

  return [row[0], module.label, row[1], row[2], row[3], '', '', '', ''];
}

function buildSummaryRows_(registros) {
  const rows = [['TOTAL GENERAL', 'REGISTROS', registros.length]];
  appendGroupedSummary_(rows, registros, 1, 'POR MODULO');
  appendGroupedSummary_(rows, registros, 3, 'POR RESPONSABLE');
  appendGroupedSummary_(rows, registros, 4, 'POR TURNO');
  appendGroupedSummary_(rows, registros, 5, 'POR INCIDENCIA');
  return rows;
}

function appendGroupedSummary_(rows, registros, columnIndex, title) {
  const counts = {};
  registros.forEach(function (row) {
    const value = String(row[columnIndex] || '').trim();
    if (!value) return;
    counts[value] = (counts[value] || 0) + 1;
  });

  Object.keys(counts).sort().forEach(function (value) {
    rows.push([title, value, counts[value]]);
  });
}

function rewriteSheet_(sheet, headers, rows) {
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  formatHeader_(sheet, headers.length);
  sheet.autoResizeColumns(1, headers.length);
}

function formatHeader_(sheet, columns) {
  sheet.getRange(1, 1, 1, columns)
    .setFontWeight('bold')
    .setBackground('#c06e32')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}
