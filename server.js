const { exec } = require('child_process');
const express = require('express');
const path = require('path');
const { stdout } = require('process');

const app = express();

app.use(express.static(path.join(__dirname, '/public')));

exec('ipconfig', (error, stdout, stderr) => {
    let ipconfigoutput = "";
    if (error) {
        console.error(`Error ejecutando ipconfig: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Error en la salida estándar: ${stderr}`);
        return;
    }
    ipconfigoutput=stdout;
    const ipv4Regex = /IPv4[^:]*: ([\d.]+)/; 
    const match = stdout.match(ipv4Regex); 
    if (match) { 
        const ipv4Address = match[1]; 
        console.log(`La dirección IPv4 es: ${ipv4Address}`);
        const server = app.listen(3000, function(){
            console.log(`El servidor esta corriendo en  http://${ipv4Address}:${server.address().port}`);
        }); 
    } else { 
        console.log('No se encontró una dirección IPv4 en la salida.'); 
    }
});




