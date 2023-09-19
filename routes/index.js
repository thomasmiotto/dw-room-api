const express = require('express');
const storage = require('../storage');

const appointmentDomain = new (require('../domain/appointment').AppointmentDomain)(storage);
const waitingRoomDomain = new (require('../domain/waitingRoom').WaitingRoomDomain)(storage);
const router = express.Router();

const computeResponse = (resp, data) => {
    if(data === undefined) {
        return resp.status(404).send(undefined)
    }
    if(data === null) {
        return resp.status(204).send('{}');
    }
    return resp.status(200).send(data);
}

router.get('/waiting-rooms/', (req, resp) => {
    const list = waitingRoomDomain.list();
    return computeResponse(resp, list);
});

router.get('/waiting-rooms/:id', (req, resp) => {
    const id = req.params.id;
    const waitingRoom = waitingRoomDomain.get(id);
    return computeResponse(resp, waitingRoom);
});

router.get('/appointments/:id', (req, resp) => {
    const id = req.params.id;
    const appointment = appointmentDomain.get(id);
    return computeResponse(resp, appointment);
});

router.patch('/appointments/:id', (req, resp) => {
    const id = req.params.id;
    const appointment = appointmentDomain.update(id);
    return computeResponse(resp, appointment.id === id ? null : undefined);
});

router.post('/appointments/', (req, resp) => {
    const appointment = appointmentDomain.create(req.body);
    console.log("here")
    return computeResponse(resp, appointment);
});

const routers = (app) => {
    app.use('/api/v1', router);
};



test = "#C311,2 95 10 75 414 149,Jazmine Black, 287387937892789, mail@mail"
appointmentDomain.create(test);

module.exports = routers;