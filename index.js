const app = require('./app');

app.listen(8080);
console.log('Running on http://localhost:8080');

app.on('error', err => {
    console.error(err);
});