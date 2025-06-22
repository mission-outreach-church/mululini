const express = require('express');
const { AppDataSource } = require('../config/app.db');

const router = express.Router();
const Event = require('../entities/Event');

// Get all events
router.get('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Event');
    const events = await repo.find();
    res.json(events);
});

// Get event by id
router.get('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Event');
    const event = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!event) return res.status(404).json({ message: 'Not found' });
    res.json(event);
});

// Create event
router.post('/', async (req, res) => {
    const repo = AppDataSource.getRepository('Event');
    const event = repo.create(req.body);
    await repo.save(event);
    res.status(201).json(event);
});

// Update event
router.put('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Event');
    let event = await repo.findOneBy({ id: parseInt(req.params.id) });
    if (!event) return res.status(404).json({ message: 'Not found' });
    repo.merge(event, req.body);
    await repo.save(event);
    res.json(event);
});

// Delete event
router.delete('/:id', async (req, res) => {
    const repo = AppDataSource.getRepository('Event');
    const result = await repo.delete({ id: parseInt(req.params.id) });
    if (result.affected === 0) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
});

module.exports = router;
