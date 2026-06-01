# Incidencias Bello Campo

Frontend de registro de incidencias para Pan de Tata, basado visualmente en
`GESTION_TIENDA` y conectado a Google Sheets mediante Google Apps Script.

## Modulos actuales

- `ERROR EN SERVICIO (BARRA)`
- `CONSUMO INTERNO`
- `MALA MANIPULACION (COCINA)`
- `DESPERDICIO PERECEDERO (VEGETALES)`
- `MERMA DE PAN (COCINA)`

Los modulos originales capturan `FECHA`, `PRODUCTO`, `RESPONSABLE` y `TURNO`.
`CONSUMO INTERNO` tambien captura `OBSERVACIONES`.

## Archivos

- `index.html`, `styles.css`, `script.js`: interfaz web.
- `logopandetata.png`: logo mostrado en la esquina superior izquierda.
- `Code.gs`: backend para Google Apps Script.
- `appsscript.json`: manifiesto opcional de Apps Script.
- `config.js`: URL del Web App una vez desplegado.
- `api/apps-script.js`: proxy para desplegar el frontend en Vercel.

## Hojas esperadas

El backend escribe en pestañas del spreadsheet con estos nombres:

- `ERROR EN SERVICIO (BARRA)`
- `CONSUMO INTERNO`
- `MALA MANIPULACION (COCINA)`
- `DESPERDICIO PERECEDERO (VEG)`
- `MERMA DE PAN (COCINA)`

Cada hoja debe tener los encabezados en este orden:

```text
FECHA | PRODUCTO | RESPONSABLE | TURNO | PRECIO UNITARIO | COSTO PERDIDA
```

La hoja `CONSUMO INTERNO` debe tener estos encabezados:

```text
FECHA | PRODUCTO | RESPONSABLE | TURNO | OBSERVACIONES
```

El backend escribe estas cinco columnas. Este modulo no usa lista de
incidencias ni columnas de precio o costo perdido.

El tercer nombre esta abreviado porque el archivo Excel inicial limita los
nombres de pestañas a 31 caracteres. Si las pestanas en Google Sheets fueron
renombradas, actualiza `CONFIG.sheetNames` en `Code.gs`.


## Visualizacion en Google Sheets

`Code.gs` puede crear y mantener dos pestanas para revisar los registros:

- `VISUALIZACION REGISTROS`: consolida todos los modulos en una sola tabla.
- `RESUMEN REGISTROS`: muestra conteos por modulo, responsable, turno e incidencia.

Luego de desplegar Apps Script, abre la URL del Web App con esta accion para crear
las pestanas y encabezados:

```text
https://script.google.com/macros/s/.../exec?action=setupSheets
```

Tambien puedes refrescar la visualizacion manualmente con:

```text
https://script.google.com/macros/s/.../exec?action=refreshVisualization
```

Cada nuevo registro intenta actualizar automaticamente estas pestanas.

## Despliegue

1. Abre tu proyecto de Google Apps Script y reemplaza `Code.gs` con el archivo
   de este repositorio.
2. En `Code.gs`, reemplaza `REEMPLAZAR_CON_ID_DEL_GOOGLE_SHEET` por el ID del
   spreadsheet de incidencias.
3. Despliega Apps Script como aplicacion web ejecutada por ti, con acceso para
   cualquier persona con el enlace.
4. Copia la URL terminada en `/exec` y pegala en `config.js`:

```js
window.APPS_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
```

5. Publica este frontend en Vercel para habilitar el proxy `/api/apps-script`.

El endpoint `GET ?action=getCatalogs` retorna los responsables, turnos y
productos obtenidos del formulario original. El `POST` con la accion
`guardarIncidencia` valida esos catalogos y agrega una fila en la hoja del
modulo seleccionado.
