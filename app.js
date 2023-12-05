const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/process', (req, res) => {
  const inputFilePath = req.body.inputFilePath;
  const outputFilePath = req.body.outputFilePath;

  // Leer el contenido del archivo de entrada
  fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo de entrada:', err);
      res.send('Error al leer el archivo de entrada.');
      return;
    }

    // Reemplazar las ocurrencias y eliminar dos espacios en blanco después de los 4 números
    const modifiedData = data.replace(/CU/g, 'II')
      .replace(/30674464149/g, '074213')
      .replace(/66(\d{4})  /g, '66$1;')
      .replace(/  ;MN/g, ';MN')
      .replace(/ ;MN/g, ';MN')
      .replace(/  ;MP/g, ';MP')
      .replace(/ ;MP/g, ';MP')
      ;

    // Escribir el contenido modificado en el archivo de salida
    fs.writeFile(outputFilePath, modifiedData, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir el archivo de salida:', err);
        res.send('Error al escribir el archivo de salida.');
        return;
      }
      console.log('Proceso completado. Archivo de salida creado:', outputFilePath);
      res.send('Proceso completado. Archivo de salida creado: ' + outputFilePath);
    });
  });
});

app.listen(port, () => {
  console.log(`Aplicación web ejecutándose en http://localhost:${port}`);
});