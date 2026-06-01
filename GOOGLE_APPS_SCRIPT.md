# Preparacion de Google Apps Script

## Configuracion requerida

En `Code.gs`, cambia esta linea por el ID real de tu Google Sheet:

```js
spreadsheetId: 'REEMPLAZAR_CON_ID_DEL_GOOGLE_SHEET',
```

El ID es el texto ubicado entre `/d/` y `/edit` en el enlace del spreadsheet.

## Prueba de envio

1. Crea el despliegue web de Apps Script y selecciona acceso mediante enlace.
2. Coloca la URL `/exec` del despliegue en `config.js`.
3. Despliega el frontend en Vercel.
4. Registra una incidencia desde cada modulo.
5. Comprueba que cada fila aparece en la pestana que corresponde.

Cada cambio de `Code.gs` requiere crear una nueva version del despliegue web en
Apps Script. Reemplaza `Code.gs` y actualiza el despliegue antes de probar
nuevamente.

La pestana `CONSUMO INTERNO` debe existir con estos encabezados:

```text
FECHA | PRODUCTO | RESPONSABLE | TURNO | OBSERVACIONES | PRECIO UNITARIO | COSTO PERDIDA
```

El formulario envia las primeras cinco columnas y no usa lista de incidencias.
`Code.gs` completa `PRECIO UNITARIO` desde `PRECIOS PRODUCTOS` y calcula
`COSTO PERDIDA` automaticamente.

La pestana `DESPERDICIO PERECEDERO (VEG)` debe incluir cantidad:

```text
FECHA | PRODUCTO | CANTIDAD | RESPONSABLE | TURNO | OBSERVACIONES | PRECIO UNITARIO | COSTO PERDIDA
```

El costo perdido se calcula multiplicando el precio unitario por la cantidad.

Las pestanas `ERROR EN SERVICIO (BARRA)` y `MALA MANIPULACION (COCINA)` deben
ubicar `CANTIDAD` a la derecha de `PRODUCTO`:

```text
FECHA | PRODUCTO | CANTIDAD | RESPONSABLE | TURNO | LISTA DE INCIDENCIAS | OBSERVACIONES | PRECIO UNITARIO | COSTO PERDIDA
```

La pestana `CONSUMO INTERNO` tambien debe ubicar `CANTIDAD` a la derecha de
`PRODUCTO`:

```text
FECHA | PRODUCTO | CANTIDAD | RESPONSABLE | TURNO | OBSERVACIONES | PRECIO UNITARIO | COSTO PERDIDA
```

Si las pestanas no mantienen los nombres de la plantilla, modifica
`CONFIG.sheetNames` en `Code.gs` para que coincida exactamente con el Google
Sheet.
