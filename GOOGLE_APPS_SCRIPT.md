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

La pestana `CONSUMO INTERNO` debe existir con estos encabezados:

```text
FECHA | PRODUCTO | RESPONSABLE | TURNO | OBSERVACIONES | PRECIO UNITARIO | COSTO PERDIDA
```

El envio completa las siete columnas. `Code.gs` calcula `PRECIO UNITARIO` y
`COSTO PERDIDA` con el catalogo de precios configurado.

Si las pestanas no mantienen los nombres de la plantilla, modifica
`CONFIG.sheetNames` en `Code.gs` para que coincida exactamente con el Google
Sheet.
