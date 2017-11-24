const path =            require('path');
const express =         require('express');
const bodyParser =      require('body-parser');
const DATABASE_URL =    process.env.DATABASE_URL ||
                        global.DATABASE_URL || 
                        'mongodb://sim:test123@ds145800.mlab.com:45800/gillstore';
const mongoose =        require('mongoose');
const app =             express();


























app.use(bodyParser.json())
let server;
function runServer(port=3001) {
    return new Promise((resolve, reject) => {


         mongoose.connect(DATABASE_URL, err => {
            if(err) {
              return reject(err);
        }
            console.log('Db connected');
            server = app.listen(port, () => {
                resolve();
            }).on('error', reject);
        });
    });
}

function closeServer() {
    return new Promise((resolve, reject) => {
        server.close(err => {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}

if (require.main === module) {
    runServer();
}

module.exports = {
    app, runServer, closeServer
};