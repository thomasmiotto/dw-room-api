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
    const noSS = data.numero;
    const nom = data.nom + " " + data.prenom;
    const email = data.mail;
    const number = data.tel;

    // Vérifiez que les données sont présentes
    if (!data || !nom || !email || !noSS || !number) {
      return null;
    }
    if (
      !/^[A-Za-zÀ-ÿ\s-]{2,20}$/.test(data.nom) ||
      !/^[A-Za-zÀ-ÿ\s-]{2,20}$/.test(data.prenom) ||
      !/^[12][0-9]{2}(0[1-9]|1[0-2])(2[AB]|[0-9]{2})[0-9]{3}[0-9]{3}$/.test(
        noSS
      ) ||
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ||
      !/^[0-9]{10}$/.test(number)
    ) {
      return null;
    }
    this.storage.create(data);
    return data;
  }
}

module.exports.AppointmentDomain = AppointmentDomain;
