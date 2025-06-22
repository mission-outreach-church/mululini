const express = require('express');
const { AppDataSource } = require('../config/app.db');

const router = express.Router();
const Service = require('../entities/Service');

// Get all services
router.get('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Service');
    const services = await repo.find();
    res.json(services);
});

// Get service by id
router.get('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Service');
    const service = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!service) return res.status(404).json({ message: 'Not found' });
    res.json(service);
});

// Create service
router.post('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Service');
    const service = repo.create(req.body);
    await repo.save(service);
    res.status(201).json(service);
});

// Update service
router.put('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Service');
    let service = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!service) return res.status(404).json({ message: 'Not found' });
    repo.merge(service, req.body);
    await repo.save(service);
    res.json(service);
});

// Delete service
router.delete('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Service');
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
});

module.exports = router;
