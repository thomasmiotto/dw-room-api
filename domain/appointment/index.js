class AppointmentDomain {
    constructor(storage) {
        this.storage = storage;
    }

    list() {
        const results = this.storage.getAll();
        const waitingRooms = {
            A: [],
            B: [],
            C: [],
            D: [],
        };
        for(let reference in results) {
            waitingRooms[reference.charAt(1)].push({reference, ...results[reference]});
        }
        return waitingRooms;
    }

    get(reference) {
        const result = this.storage.get(`#${reference}`);
        return {reference: `#${reference}`, ...result};
    }

    update(reference) {
        if (!this.storage.has(`#${reference}`)) {
            throw new Error(`La référence '${reference}' n'existe pas.`);
        }

        if (!newData.room || newData.security|| !newData.name || !newData.email) {
            throw new Error("Les données de mise à jour doivent inclure un nom et un email valides.");
        }

        const updatedData = {
            ...this.storage.get(`#${reference}`),
            ...newData,
        };

        this.storage.set(`#${reference}`, updatedData);
    
        const result = this.storage.get(`#${reference}`, updatedData);
        return {reference: `#${reference}`, ...result, ...updatedData};
    }

    create(data) {

        const list = data.split(',');
        const reference = list[0];
        const noSS = list[1];
        const nname =list[2];
        const email = list[3];
        const number = list[4];


        // Vérifiez que les données sont présentes
        if (!data || !nname || !email || !noSS || !number) {
           return null;
        }

        console.log(list);



        this.storage.create(data);
        return data;
    }
}

module.exports.AppointmentDomain = AppointmentDomain;