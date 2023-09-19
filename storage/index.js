const fs = require('fs');
const readline = require('readline');

const DATABASE = new Map();

const AppointmentStorage = {
    getAll : () => {
        const results = {};
        DATABASE.forEach((value, key) => {
            results[key] = {...value};
        });
        return results;
    },
    get : (id) => {
        return DATABASE.get(id);
    },
    update : (id) => {
        return DATABASE.get(id);
    },
    create: (data) => {
       
        // Ajoutez le rendez-vous à la base de données
        fs.appendFile('./data.csv', data+"\r\n", 'utf8', (err) => {
            if (err) {
                console.error('Une erreur s\'est produite lors de l\'ajout de la ligne au fichier CSV :', err);
            } else {
                console.log('Ligne ajoutée avec succès au fichier CSV.');
            }
        });

        // Renvoyez l'identifiant du rendez-vous créé
        
    },

    // ... Vos autres méthodes existantes ...
};


const initStorage = (storage) => {
    const stream = fs.createReadStream('./data.csv');
    const rl = readline.createInterface({ input: stream });
    const today = new Date();
    rl.on('line', (row) => {
        const data = row.split(',');
        storage.set(data[0], {
            date: today.toLocaleDateString('fr'),
            noSS: data[1],
            name: data[2],
        });
    });
    rl.on('close', () => {
        console.log(`Initialization successfull with ${storage.size} appointments.`);
    });
};

initStorage(DATABASE);

module.exports = AppointmentStorage;