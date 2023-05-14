const app = require('./app');

app.listen(8080);
console.log('API running on http://localhost:8080');

app.on('error', () => {
    console.error('Internal server error');
});