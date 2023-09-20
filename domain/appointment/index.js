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
    for (let reference in results) {
      waitingRooms[reference.charAt(1)].push({
        reference,
        ...results[reference],
      });
    }
    return waitingRooms;
  }

  get(reference) {
    const result = this.storage.get(`#${reference}`);
    return { reference: `#${reference}`, ...result };
  }

  update(reference) {
    const result = this.storage.get(`#${reference}`);
    return { reference: `#${reference}`, ...result };
  }
  create(data) {
console.log(data);
    const noSS = data.numero;
    const nname = data.nom + " " + data.prenom;
    const email = data.mail;
    const number = data.tel;

    // Vérifiez que les données sont présentes
    if (!data || !nname || !email || !noSS || !number) {
      return null;

    }


    this.storage.create(data);
    return data;
  }
}

module.exports.AppointmentDomain = AppointmentDomain;
