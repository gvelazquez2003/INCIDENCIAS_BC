const CONFIG = {
  // Replace this value with the ID from the Google Sheets URL before deploying.
  spreadsheetId: '1NUUJ0i9h1Y0pQFfVQyo8DEdaeZgsN-_PoMo-Fekt72E',
  timeZone: 'America/Caracas',
  headers: {
    default: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'PRECIO UNITARIO', 'COSTO PERDIDA'],
    servicio: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'LISTA DE INCIDENCIAS', 'OBSERVACIONES', 'PRECIO UNITARIO', 'COSTO PERDIDA'],
    manipulacion: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'LISTA DE INCIDENCIAS', 'OBSERVACIONES', 'PRECIO UNITARIO', 'COSTO PERDIDA'],
    merma_pan: ['FECHA', 'PRODUCTO', 'RESPONSABLE', 'TURNO', 'CANTIDAD', 'FECHA DE VENCIMIENTO DEL PAQUETE', 'PRECIO UNITARIO', 'COSTO PERDIDA'],
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
  priceSheetName: 'PRECIOS PRODUCTOS',
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
      productCatalog: 'productosDesperdicio',
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
  productosDesperdicio: [
    'MDMP0024 PAPA FRESCA KG',
    'MDMP0061 AJI DULCE KG',
    'MDMP0062 AJO PELADO KG',
    'MDMP0064 ALBAHACA KG',
    'MDMP0074 CEBOLLA BLANCA KG',
    'MDMP0075 CEBOLLIN KG',
    'MDMP0076 CHAMPINON KG',
    'MDMP0077 TOMATE PERITA KG',
    'MDMP0090 ENELDO KG',
    'MDMP0116 PEREJIL KG',
    'MDMP0117 PIMENTON KG',
    'MDMP0128 REPOLLO BLANCO KG',
    'MDMP0131 RUGULA KG',
    'MDMP0142 TOMATE MANZANO KG',
    'MDMP0152 REPOLLO MORADO KG',
    'MDMP0182 CELERY KG',
    'MDMP0227 ESTRAGON FRESCO KG',
    'MDMP0228 JENGIBRE KG',
    'MDMP0231 MORAS KG',
    'MDMP0232 ZANAHORIA KG',
    'MDMP0233 COL RIZADA KALE KG',
    'MDMP0237 CEBOLLA MORADA KG',
    'MDMP0284 PEPINILLOS KG',
    'MDMP0324 CILANTRO KG',
    'MDMP0379 LECHUGA RIZADA KG',
  ],  productos: [
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

const PRICE_CATALOG = [
  { producto: 'BAGEL INTEGRAL DE POLLO AHUMADO', precio: 9.05 },
  { producto: 'BAGEL DE PROSCIUTTO', precio: 13.10 },
  { producto: 'BAGEL DE SPREAD DE SALMON', precio: 9.22 },
  { producto: 'BAGEL ALASKA', precio: 12.76 },
  { producto: 'BAGEL DE QUESO CREMA', precio: 3.62 },
  { producto: 'BAGEL DE SALMON CLASICO', precio: 11.90 },
  { producto: 'BAGEL DE CARPACCIO', precio: 9.48 },
  { producto: 'BAGEL CAPRESA', precio: 9.91 },
  { producto: 'CROISSANT DE PAVO', precio: 3.45 },
  { producto: 'CRIOSSANT DE JAMON Y QUESO', precio: 6.21 },
  { producto: 'DONATELLA VERSACHEESE', precio: 5.60 },
  { producto: 'SANDUCHE DE MORTADELLA', precio: 10.17 },
  { producto: 'CROISSANT DE PROSCIUTTO Y QUESO MANCHEGO', precio: 9.40 },
  { producto: 'CROISSANT DE SALMON AHUMADO Y QUESO CREMA', precio: 9.31 },
  { producto: 'CROISSANT DE PAVO Y QUESO', precio: 5.17 },
  { producto: 'SANDUCHE DE PAVO CON QUESO', precio: 6.47 },
  { producto: 'SANDUCHE DE PROSCIUTTO', precio: 12.93 },
  { producto: 'SANDUCHE DE PERNIL', precio: 10.34 },
  { producto: 'SANDUCHE DE CAPRESA', precio: 9.31 },
  { producto: 'PAPAS FRITAS', precio: 2.16 },
  { producto: 'PAPAS CHIPS 1 KG', precio: 13.79 },
  { producto: 'PAPAS CHIPS', precio: 0.95 },
  { producto: 'AROS DE CEBOLLA', precio: 1.55 },
  { producto: 'COMBO PAPAS Y REFRESCO', precio: 3.45 },
  { producto: 'KALE Y POLLO', precio: 9.05 },
  { producto: 'CESAR CON POLLO Y TOCINETA', precio: 9.91 },
  { producto: 'QUESO CABRA Y CHIPS DE PROSCIUTTO', precio: 10.78 },
  { producto: 'RACION TOCINETA', precio: 1.72 },
  { producto: 'EXTRA PROVOLONE', precio: 1.72 },
  { producto: 'EXTRA QUESO AMERICANO', precio: 0.86 },
  { producto: 'HUEVOS FRITOS', precio: 1.29 },
  { producto: 'PAN TOSTADO', precio: 1.29 },
  { producto: 'HABIBI', precio: 6.90 },
  { producto: 'COMBO LECHERIA - DOM', precio: 17.07 },
  { producto: 'CACHORROS 2 UND', precio: 5.17 },
  { producto: 'RACION TEQUENOS 6 UND', precio: 5.52 },
  { producto: 'EXTRA DE POLLO CDH', precio: 1.72 },
  { producto: 'EXTRA DE CARNE HAMBURGUESITA', precio: 2.59 },
  { producto: 'LE FRANCHUTE DE SAINT LOUIS', precio: 8.53 },
  { producto: 'CUBANO DESPELUCADO', precio: 8.53 },
  { producto: 'PERRO DOS', precio: 3.02 },
  { producto: 'AMERICAN PATTY', precio: 8.53 },
  { producto: 'COMBO CHACAO - MIERCOLES', precio: 5.00 },
  { producto: 'COMBO SAN LUIS - MARTES', precio: 10.52 },
  { producto: 'THRILLY CHEESESTEAK', precio: 9.05 },
  { producto: 'PULLED PUNK', precio: 8.62 },
  { producto: 'PERRO UNO', precio: 3.02 },
  { producto: 'CDH POLLO', precio: 9.31 },
  { producto: 'CHICKEN TENDER', precio: 4.48 },
  { producto: 'EXTRA DE POLLO PATTY', precio: 2.59 },
  { producto: 'COMBO BELLO CAMPO - JUEVES', precio: 20.69 },
  { producto: 'COMBO LOS PALOS GRANDES - VIERNES', precio: 12.50 },
  { producto: 'COMBO LA CANDELARIA - LUNES', precio: 6.03 },
  { producto: 'CDH CARNE', precio: 9.31 },
  { producto: 'LA HAMBURGUESITA', precio: 4.14 },
  { producto: 'SMASH-MOUTH', precio: 7.93 },
  { producto: 'BABE BURGUER', precio: 7.93 },
  { producto: 'BLUE BACON', precio: 9.48 },
  { producto: 'BUFFALO SOULCHICK', precio: 8.45 },
  { producto: 'LA TUYA', precio: 8.79 },
  { producto: 'CHICKEN PATTY', precio: 7.67 },
  { producto: 'EXTRA DE POLLO PARA ENSALADA', precio: 1.72 },
  { producto: 'SALSA MAYO PESTO PAQ', precio: 3.88 },
  { producto: 'SALSA ALDALUZA MILD PAQ', precio: 3.88 },
  { producto: 'VINAGRETA ASIATICA PAQ', precio: 3.88 },
  { producto: 'MERMELADA DE JALAPENO PAQ', precio: 3.88 },
  { producto: 'SALSA CDH PAQ', precio: 3.88 },
  { producto: 'PEPINILLOS ENCURTIDOS PAQ', precio: 6.03 },
  { producto: 'SPREAD DE SALMON PAQ', precio: 8.19 },
  { producto: 'SPREAD DE TOMATES SECOS PAQ', precio: 8.19 },
  { producto: 'SPREAD ALASKA PAQ', precio: 8.19 },
  { producto: 'LECHE DE ALMENDRAS 340 ML', precio: 2.76 },
  { producto: 'LECHE DE MEREY 340 ML', precio: 2.76 },
  { producto: 'LECHUGA RIZADA KG', precio: 1.19 },
  { producto: 'HABIBI PAQ 2 UND', precio: 5.78 },
];
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
    if (action === 'setupprices') {
      const result = setupPrices_();
      return jsonResponse_(true, result, 'Precios configurados y registros actualizados.');
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
  const price = findProductPrice_(producto);
  const row = buildRow_(module, data, fecha, producto, responsable, turno, price);
  const headers = CONFIG.headers[module.id] || CONFIG.headers.default;

  ensureHeaders_(sheet, headers);
  const targetRow = sheet.getLastRow() + 1;
  sheet.getRange(targetRow, 1, 1, row.length).setValues([row]);
  try {
    sheet.getRange(targetRow, 1).setNumberFormat('dd/MM/yyyy');
    if (module.id === 'merma_pan') {
      sheet.getRange(targetRow, 6).setNumberFormat('dd/MM/yyyy');
    }
    formatPriceColumns_(sheet, headers);
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

function buildRow_(module, data, fecha, producto, responsable, turno, price) {
  if (module.id === 'servicio' || module.id === 'manipulacion') {
    validateRequired_(data, ['listaIncidencias']);
    const incidenciasCatalog = CATALOGS[module.incidenciasCatalog] || [];
    const listaIncidencias = requireCatalogValue_(data.listaIncidencias, incidenciasCatalog, 'listaIncidencias');
    const observaciones = String(data.observaciones || '').trim();
    return [fecha, producto, responsable, turno, listaIncidencias, observaciones, price, calculateLossCost_(price, 1)];
  }

  if (module.id === 'merma_pan') {
    validateRequired_(data, ['cantidad', 'fechaVencimiento']);
    const cantidad = parsePositiveInteger_(data.cantidad, 'cantidad');
    const fechaVencimiento = parseDate_(data.fechaVencimiento, 'fechaVencimiento');
    return [fecha, producto, responsable, turno, cantidad, fechaVencimiento, price, calculateLossCost_(price, cantidad)];
  }

  return [fecha, producto, responsable, turno, price, calculateLossCost_(price, 1)];
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

  const width = Math.max(sheet.getLastColumn(), expected.length);
  const current = sheet.getRange(1, 1, 1, width).getValues()[0].map(normalizeText_);
  const fullHeadersAreValid = expected.every(function (header, index) {
    return normalizeText_(header) === current[index];
  });
  const existingHeadersCanMigrate = current.slice(0, Math.min(current.length, expected.length)).every(function (header, index) {
    return !header || normalizeText_(expected[index]) === header;
  });

  if (fullHeadersAreValid) return;
  if (existingHeadersCanMigrate) {
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

  const prices = setupPriceSheet_();
  updateAllPriceColumns_();
  const visualization = refreshVisualization_();
  return {
    modules: modules,
    prices: prices,
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
    'PRECIO UNITARIO',
    'COSTO PERDIDA',
  ];

  rewriteSheet_(registrosSheet, registrosHeaders, registros);
  if (registros.length) {
    registrosSheet.getRange(2, 1, registros.length, 1).setNumberFormat('dd/MM/yyyy');
    registrosSheet.getRange(2, 9, registros.length, 1).setNumberFormat('dd/MM/yyyy');
    registrosSheet.getRange(2, 10, registros.length, 2).setNumberFormat('#,##0.00');
  }

  const resumenSheet = getSheet_(CONFIG.visualizationSheets.resumen);
  const resumen = buildSummaryRows_(registros);
  rewriteSheet_(resumenSheet, ['INDICADOR', 'VALOR', 'TOTAL', 'COSTO TOTAL'], resumen);
  if (resumen.length) {
    resumenSheet.getRange(2, 4, resumen.length, 1).setNumberFormat('#,##0.00');
  }

  return {
    registrosSheet: CONFIG.visualizationSheets.registros,
    resumenSheet: CONFIG.visualizationSheets.resumen,
    totalRegistros: registros.length,
    totalCostoPerdido: sumCost_(registros),
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
    return [row[0], module.label, row[1], row[2], row[3], row[4], row[5], '', '', row[6], row[7]];
  }

  if (module.id === 'merma_pan') {
    return [row[0], module.label, row[1], row[2], row[3], '', '', row[4], row[5], row[6], row[7]];
  }

  return [row[0], module.label, row[1], row[2], row[3], '', '', '', '', row[4], row[5]];
}

function buildSummaryRows_(registros) {
  const totalCosto = sumCost_(registros);
  const rows = [
    ['TOTAL COSTO PERDIDO', 'TODOS LOS MODULOS', '', totalCosto],
    ['TOTAL GENERAL', 'REGISTROS', registros.length, totalCosto],
  ];
  appendGroupedSummary_(rows, registros, 1, 'POR MODULO');
  appendGroupedSummary_(rows, registros, 3, 'POR RESPONSABLE');
  appendGroupedSummary_(rows, registros, 4, 'POR TURNO');
  appendGroupedSummary_(rows, registros, 5, 'POR INCIDENCIA');
  appendGroupedSummary_(rows, registros, 2, 'POR PRODUCTO');
  return rows;
}

function appendGroupedSummary_(rows, registros, columnIndex, title) {
  const counts = {};
  const costs = {};
  registros.forEach(function (row) {
    const value = String(row[columnIndex] || '').trim();
    if (!value) return;
    counts[value] = (counts[value] || 0) + 1;
    costs[value] = (costs[value] || 0) + Number(row[10] || 0);
  });

  Object.keys(counts).sort().forEach(function (value) {
    rows.push([title, value, counts[value], costs[value] || '']);
  });
}

function rewriteSheet_(sheet, headers, rows) {
  sheet.clear();
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  if (rows.length) {
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  }
  formatHeader_(sheet, headers.length);
  safeAutoResizeColumns_(sheet, headers.length);
}

function formatHeader_(sheet, columns) {
  sheet.getRange(1, 1, 1, columns)
    .setFontWeight('bold')
    .setBackground('#c06e32')
    .setFontColor('#ffffff');
  sheet.setFrozenRows(1);
}

function safeAutoResizeColumns_(sheet, columns) {
  try {
    for (let column = 1; column <= columns; column += 1) {
      sheet.autoResizeColumn(column);
    }
  } catch (error) {
    Logger.log('No se pudieron autoajustar columnas en ' + sheet.getName() + ': ' + error);
  }
}
function setupPrices_() {
  const priceSheet = setupPriceSheet_();
  const updatedRows = updateAllPriceColumns_();
  const visualization = refreshVisualization_();
  return {
    priceSheet: priceSheet,
    updatedRows: updatedRows,
    totalCostoPerdido: visualization.totalCostoPerdido,
    modulesUpdated: [
      CONFIG.sheetNames.servicio,
      CONFIG.sheetNames.manipulacion,
      CONFIG.sheetNames.desperdicio,
      CONFIG.sheetNames.merma_pan,
    ],
    visualization: visualization,
  };
}

function setupPriceSheet_() {
  const sheet = getSheet_(CONFIG.priceSheetName);
  const headers = ['PRODUCTO', 'PRECIO X UND/KG'];
  const existing = getPriceCatalogRows_(sheet);
  const existingByProduct = {};
  existing.forEach(function (row) {
    existingByProduct[normalizeProductKey_(row.producto)] = true;
  });

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  const missingRows = PRICE_CATALOG
    .filter(function (item) { return !existingByProduct[normalizeProductKey_(item.producto)]; })
    .map(function (item) { return [item.producto, item.precio]; });

  if (missingRows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, missingRows.length, headers.length).setValues(missingRows);
  }

  formatHeader_(sheet, headers.length);
  if (sheet.getLastRow() > 1) {
    sheet.getRange(2, 2, sheet.getLastRow() - 1, 1).setNumberFormat('#,##0.00');
  }
  safeAutoResizeColumns_(sheet, headers.length);
  return CONFIG.priceSheetName;
}

function updateAllPriceColumns_() {
  let updatedRows = 0;
  CATALOGS.modules.forEach(function (module) {
    const sheet = getSheet_(CONFIG.sheetNames[module.id]);
    const headers = CONFIG.headers[module.id] || CONFIG.headers.default;
    ensureHeaders_(sheet, headers);

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    const productColumn = 2;
    const quantityColumn = module.id === 'merma_pan' ? 5 : null;
    const priceColumn = headers.indexOf('PRECIO UNITARIO') + 1;
    const rowCount = lastRow - 1;
    const values = sheet.getRange(2, 1, rowCount, headers.length).getValues();
    const priceValues = values.map(function (row) {
      const price = findProductPrice_(row[productColumn - 1]);
      const quantity = quantityColumn ? Number(row[quantityColumn - 1] || 0) : 1;
      return [price, calculateLossCost_(price, quantity || 1)];
    });

    sheet.getRange(2, priceColumn, rowCount, 2).setValues(priceValues);
    formatPriceColumns_(sheet, headers);
    updatedRows += rowCount;
  });
  return updatedRows;
}

function findProductPrice_(producto) {
  if (getSheet_(CONFIG.priceSheetName).getLastRow() < 2) setupPriceSheet_();
  const rows = getPriceCatalogRows_();
  const keys = getProductLookupKeys_(producto);
  const match = rows.find(function (row) {
    const priceKey = normalizeProductKey_(row.producto);
    return keys.indexOf(priceKey) !== -1;
  });
  return match ? match.precio : '';
}

function getPriceCatalogRows_(sheet) {
  const priceSheet = sheet || getSheet_(CONFIG.priceSheetName);
  if (priceSheet.getLastRow() < 2) return [];

  const values = priceSheet.getRange(2, 1, priceSheet.getLastRow() - 1, 2).getValues();
  return values
    .map(function (row) {
      return {
        producto: String(row[0] || '').trim(),
        precio: parsePriceValue_(row[1]),
      };
    })
    .filter(function (row) { return row.producto && row.precio !== ''; });
}

function getProductLookupKeys_(producto) {
  const value = String(producto || '').trim();
  const withoutCode = value.replace(/^[A-Z]+\d+\s+/, '');
  const withoutUnit = withoutCode.replace(/\s+(KG|UND|ML|G)$/i, '').trim();
  return [value, withoutCode, withoutUnit]
    .map(normalizeProductKey_)
    .filter(function (item, index, values) { return item && values.indexOf(item) === index; });
}

function normalizeProductKey_(value) {
  return normalizeText_(value).replace(/\s+/g, ' ');
}

function parsePriceValue_(value) {
  if (value === '' || value === null || value === undefined) return '';
  const parsed = Number(String(value).replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : '';
}

function calculateLossCost_(price, quantity) {
  if (price === '' || price === null || price === undefined) return '';
  const qty = Number(quantity || 1);
  return Number(price) * (Number.isFinite(qty) && qty > 0 ? qty : 1);
}

function formatPriceColumns_(sheet, headers) {
  const priceColumn = headers.indexOf('PRECIO UNITARIO') + 1;
  const lastRow = sheet.getLastRow();
  if (lastRow < 2 || !priceColumn) return;
  sheet.getRange(2, priceColumn, lastRow - 1, 2).setNumberFormat('#,##0.00');
}

function sumCost_(rows) {
  return rows.reduce(function (total, row) {
    return total + Number(row[10] || 0);
  }, 0);
}
