const express = require('express');
const AppointmentDomain = require('../domain/appointment');

const router = express.Router();

const computeResponse = (req, resp, data) => {
    if(data === undefined) {
        return req.status(404).send(resp)
    }
    if(data === null) {
        return req.status(204).send(resp);
    }
    return req.status(200).send(resp);
}

router.get('/appointments/', (req, resp) => {
    const list = AppointmentDomain.list();
    return computeResponse(req, resp, list);
});

router.get('/appointments/:id', (req, resp) => {
    const id = req.params.id;
    const appointment = AppointmentDomain.get(id);
    return computeResponse(req, resp, appointment);
});

router.patch('/appointments/:id', (req, resp) => {
    const id = req.params.id;
    const appointment = AppointmentDomain.update(id);
    return computeResponse(req, resp, appointment.id === id ? null : undefined);
});

const routers = (app) => {
    app.use('/api/v1', router);
};

module.exports = routers;